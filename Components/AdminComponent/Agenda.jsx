import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { getTurnByDayAction } from '../../Redux/actions/turnActions';
import { getAllUserAction } from '../../Redux/actions/userActions';
import { Calendar } from 'react-native-calendars';
import axios from "axios"
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

moment.locale('es');



const Agenda = () => {
    const dispatch = useDispatch()
    const turnsOfTheDay = useSelector((state) => state.turns.viewTurns)
    const [viewCalendar, setViewCalendar] = useState(false)
    const date = new Date()
    const dateSpanish = moment(date).format('dddd D [de] MMMM [de] YYYY');
    const [selecDate, setSelectdate] = useState(dateSpanish)
    const [turnState, setTurnState] = useState({})
    const [areYouShure, setAreYouShore] = useState(null)
    const [isAlert, setIsAlert] = useState(false)
    const [userCredits, setUserCredits] = useState(false)


    useEffect(() => {
        dispatch(getTurnByDayAction(dateSpanish))
    }, [dateSpanish])

    const viewCalenarHandler = () => {
        if (viewCalendar) {
            setViewCalendar(false)
        } else {
            setViewCalendar(true)
        }
    }


    const pressDayHandler = (day) => {
        if (moment(day.dateString).format("dddd") === "domingo" || moment(day.dateString).format("dddd") === "lunes") {
            return
        }
        const dateStringSpanish = moment(day.dateString).format('dddd D [de] MMMM [de] YYYY');
        dispatch(getTurnByDayAction(dateStringSpanish))
        setViewCalendar(false)
        setSelectdate(dateStringSpanish)
    }

    const setStateTurn = (userId, credist, id, stringState) => {
        setTurnState({ turnId: id, state: stringState })
        setUserCredits({userId, credist})
        setAreYouShore(id)

    }
    const putTurn = async () => {
        try {
            const changedTurn = await axios.put(`${API_URL}turns`, turnState)
            if (changedTurn.data) {
                if(turnState.state === "takedIt"){
                    const setUser = await axios.put(`${API_URL}users`, { userId: userCredits.userId, credits: String(Number(userCredits.credist) + 2)})
                    if(setUser){
                        dispatch(getAllUserAction())
                    }
                }
                setAreYouShore(null)
                dispatch(getTurnByDayAction(changedTurn.data.dateInit))
                // Alert.alert("Información guardada con exito")
                setIsAlert(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const hideAlert = () => {
        setIsAlert(false);
    };


    return (
        <View>
            {viewCalendar
                ?
                <Calendar onDayPress={pressDayHandler} />
                :
                <FlatList
                    data={turnsOfTheDay}
                    ListHeaderComponent={
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={style.button} onPress={viewCalenarHandler}>
                                <Text style={style.buttonText}>Seleccionar fecha</Text>
                            </TouchableOpacity>
                            <Text style={style.titleInfo}>{selecDate}</Text>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <View style={style.cardUsers}>
                            <Text style={style.textInfo}>{item.hourInit} | {item.product.name}</Text>
                            <Text style={style.titleInfo}>{item.user.name} {item.user.lastname}</Text>
                            {item.cancel ? //    <-------------------------------AQUI-------------------------------
                                <View style={style.buttonNoSelect}>
                                    <Text style={style.buttonText}>Cancelado</Text>
                                </View>
                                :
                                <View>
                                    {
                                        item.state === "toTake" ?
                                            <View style={{ flexDirection: "row" }}>
                                                <TouchableOpacity style={style.button} onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "takedIt")}>
                                                    <Text style={style.buttonText}>Asistió</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.button} onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "failed")}>
                                                    <Text style={style.buttonText}>Falló</Text>
                                                </TouchableOpacity>
                                            </View> :
                                            <View>
                                                {item.state === "takedIt" ?
                                                    <Text style={style.textInfo}>Asistió</Text>
                                                    :
                                                    <Text style={style.textInfo}> No Asistió</Text>
                                                }
                                            </View>
                                    }
                                </View>
                            }


                            {areYouShure === item.id ?
                                <View style={{ alignItems: "center" }}>
                                    <Text style={style.textInfo}>Confirmar?</Text>
                                    <TouchableOpacity style={style.button} onPress={putTurn}>
                                        {turnState.state === "takedIt" ?
                                            <Text style={style.buttonText}>Presente</Text> :
                                            <Text style={style.buttonText}>Ausente</Text>
                                        }
                                    </TouchableOpacity>
                                </View> :
                                null
                            }
                        </View>
                    }
                />
            }
            <ModalAlert
                isVisible={isAlert}
                onClose={hideAlert}
                title="Informacion guardada!"
                message="Se han modificado el estado del turno y los creditos del cliente"
                type="ok"
            />
        </View>
    );
};


export default Agenda;