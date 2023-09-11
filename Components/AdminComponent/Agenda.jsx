import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
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
                            <Text style={style.titleDateTurn}>{selecDate}</Text>
                        </View>
                    }
                    renderItem={({ item }) =>
                        item.state !== "cancelByUser" && item.state !== "cancelByAdmin" &&
                        <View style={style.cardAgenda}>
                            <Text style={style.mediumText}>{item.hourInit} | {item.product.name}</Text>
                            <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: -17, marginBottom: -15 }}>
                                <Text style={style.titleTurnUser2}>{item.user.name} {item.user.lastname}</Text>
                                {item.state === "takedIt" &&
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ alignItems: "center", marginRight: 8 }}>
                                            <Image style={style.imageUserList} source={require("../../assets/OkGreen.png")} />
                                            <Text style={style.littleMsj}>Asistió</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <Image style={style.imageUserListOpac} source={require("../../assets/Mal.png")} />
                                            <Text style={style.littleMsj}>No asistió</Text>
                                        </View>
                                    </View>
                                }
                                {item.state === "failed" &&
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ alignItems: "center", marginRight: 8 }}>
                                            <Image style={style.imageUserListOpac} source={require("../../assets/Bien.png")} />
                                            <Text style={style.littleMsj}>Asistió</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <Image style={style.imageUserList} source={require("../../assets/MalRed.png")} />
                                            <Text style={style.littleMsj}>No asistió</Text>
                                        </View>
                                    </View>
                                }
                                {item.state === "toTake" &&
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ alignItems: "center", marginRight:8 }}>
                                            <TouchableOpacity onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "takedIt", item.price, item.product.duration, item.user.vip)}>
                                                <Image style={style.imageUserListOpac} source={require("../../assets/Bien.png")} />
                                            </TouchableOpacity>
                                            <Text style={style.littleMsj}>Asistió</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <TouchableOpacity  onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "failed", item.price, item.product.duration)}>
                                                <Image style={style.imageUserListOpac} source={require("../../assets/Mal.png")} />
                                            </TouchableOpacity>
                                            <Text style={style.littleMsj}>Falló</Text>
                                        </View>
                                    </View>
                                }
                            </View>


                            {areYouShure === item.id ?
                                <View style={{ alignItems: "center" }}>
                                    <Text style={style.mediumText}>Confirmar?</Text>
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