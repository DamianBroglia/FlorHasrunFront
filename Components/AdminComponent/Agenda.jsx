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
    const allUsers = useSelector((state) => state.users.allUsers)
    const [viewCalendar, setViewCalendar] = useState(false)
    const date = new Date()
    const dateSpanish = moment(date).format('dddd D [de] MMMM [de] YYYY');
    const [selecDate, setSelectdate] = useState(dateSpanish)
    const [turnState, setTurnState] = useState({})
    const [areYouShure, setAreYouShore] = useState(null)
    const [isAlert, setIsAlert] = useState(false)
    const [userCredits, setUserCredits] = useState(false)
    const [turnInfo, setTurnInfo] = useState({})


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

    const setStateTurn = (userId, credist, id, stringState, price, duration, vip) => {
        setTurnState({ turnId: id, state: stringState })
        setUserCredits({ userId, credist, vip })
        setAreYouShore(id)
        setTurnInfo({ price, duration })

    }
    const putTurn = async () => {
        try {
            const changedTurn = await axios.put(`${API_URL}turns`, turnState)
            if (changedTurn.data) {
                if (turnState.state === "takedIt") {
                    let number = 0
                    if (!userCredits.vip) {
                        number = 2
                    }
                    const setUser = await axios.put(`${API_URL}users`, { userId: userCredits.userId, credits: String(Number(userCredits.credist) + number) })
                    if (setUser.data) {
                        const infoUser = await axios.put(`${API_URL}infoUser`, {
                            id: setUser.data.id,
                            turnsTakedIt: setUser.data.infoUser.turnsTakedIt + 1,
                            totalPay: setUser.data.infoUser.totalPay + turnInfo.price,
                            totalTime: setUser.data.infoUser.totalTime + Number(turnInfo.duration) 
                        })
                        if (infoUser.data) {
                            dispatch(getAllUserAction())
                        }
                    }
                } else {
                    const modifUser = allUsers.find(e => e.id === userCredits.userId)
                    const infoUser = await axios.put(`${API_URL}infoUser`, {
                        id: modifUser.id,
                        turnsFailed: modifUser.infoUser.turnsFailed + 1,
                        loseForFail: modifUser.infoUser.loseForFail + turnInfo.price,
                        loseTime: (modifUser.infoUser.loseTime + Number(turnInfo.duration)) 
                    })
                    if (infoUser.data) {
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
                            {item.state === "cancelByUser" && <Text style={style.textInfo}>El usuario cancelo este turno</Text>}
                            {item.state === "cancelByAdmin" && <Text style={style.textInfo}>Cancelaste este turno</Text>}
                            {item.state === "toTake" &&
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={style.button} onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "takedIt", item.price, item.product.duration, item.user.vip)}>
                                        <Text style={style.buttonText}>Asistió</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.button} onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "failed", item.price, item.product.duration)}>
                                        <Text style={style.buttonText}>Falló</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {item.state === "takedIt" && <Text style={style.textInfo}>Asistió</Text>}
                            {item.state === "failed" && <Text style={style.textInfo}>No Asistió</Text>}


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