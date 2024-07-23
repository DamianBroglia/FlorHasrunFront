import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
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
const API_URL = Constants.expoConfig.extra.API_URL;

moment.locale('es');

const Agenda = () => {
    const dispatch = useDispatch()
    const turnsOfTheDay = useSelector((state) => state.turns.viewTurns)
    const allUsers = useSelector((state) => state.users.allUsers)
    const [viewCalendar, setViewCalendar] = useState(true)
    // const date = new Date()
    // const dateSpanish = moment(date).format('dddd D [de] MMMM [de] YYYY');
    const [selecDate, setSelectdate] = useState("")
    const [turnState, setTurnState] = useState({})
    const [areYouShure, setAreYouShore] = useState(null)
    const [isAlert, setIsAlert] = useState(false)
    const [userCredits, setUserCredits] = useState(false)
    const [turnInfo, setTurnInfo] = useState({})
    const [collectedDay, setColectedDay] = useState(0)
    const [workedHours, setWorkedHours] = useState(0)
    const [loseForFaild, setLoseForFaild] = useState(0)
    const [futureCollect, setFutureCollect] = useState(0)
    const [cancelTurn, setCancelTurn] = useState(0)


    // useEffect(() => {
    //     dispatch(getTurnByDayAction(dateSpanish))
    // }, [dateSpanish])

    useEffect(() => {
        infoDay(turnsOfTheDay)
    }, [turnsOfTheDay])

    const infoDay = (turns) => {
        let collected = 0
        let worked = 0
        let lose = 0
        let future = 0
        let cancel = 0
        turns.forEach((el) => {
            if (el.state === "takedIt") {
                collected = collected + el.price
                worked = worked + (Number(el.product.duration) / 60)
            }
            if (el.state === "failed") {
                lose = lose + el.price
            }
            if (el.state === "toTake") {
                future = future + el.price
            }
            if (el.state === "cancelByAdmin" || el.state === "cancelByUser") {
                cancel = cancel + 1
            }
        })
        setColectedDay(collected)
        setWorkedHours(worked)
        setLoseForFaild(lose)
        setFutureCollect(future)
        setCancelTurn(cancel)
    }

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
                        <View>
                            <View style={{ alignItems: "center" }}>
                                <TouchableOpacity style={style.button} onPress={viewCalenarHandler}>
                                    <Text style={style.buttonText}>Seleccionar fecha</Text>
                                </TouchableOpacity>
                                <View style={style.cardModalUserTurns2}>
                                    <Text style={style.titleDateTurn2}>{selecDate}</Text>
                                </View>
                            </View>

                            {turnsOfTheDay.length && turnsOfTheDay[0].product.name === "Dia Bloqueado" ?
                                <View style={style.cardModalUserTurns}>
                                    <Image style={style.bigImage} source={require("../../assets/Candado.png")} />
                                    <Text style={style.titleBig}>Dia Bloqueado!</Text>
                                    <Text style={style.text}>Has bloqueado este día para que ningun cliente pueda guardar un turno</Text>
                                </View>
                                :
                                <View style={style.cardModalUserTurns}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10, width: 310, marginTop: 12 }}>

                                        <View style={{ alignItems: "center" }}>
                                            <View style={style.propertyUserSmall}>
                                                <Text style={style.propertyTextLittleLimit}>${collectedDay}</Text>
                                            </View>
                                            <Text style={style.littleMediumMsj}>Ganancia</Text>
                                            <Text style={style.littleMediumMsj}>del día</Text>
                                        </View>

                                        <View style={{ alignItems: "center" }}>
                                            <View style={style.propertyUserSmall}>
                                                <Text style={style.propertyTextLittleLimit2}>{workedHours}</Text>
                                            </View>
                                            <Text style={style.littleMediumMsj}>Horas</Text>
                                            <Text style={style.littleMediumMsj}>trabajadas</Text>
                                        </View>

                                        <View style={{ alignItems: "center" }}>
                                            <View style={style.propertyUserSmall}>
                                                {collectedDay > 0 ?
                                                    <Text style={style.propertyTextLittleLimit}>${Math.round(collectedDay / workedHours)}</Text>
                                                    :
                                                    <Text style={style.propertyTextLittleLimit}>$0</Text>
                                                }
                                            </View>
                                            <Text style={style.littleMediumMsj}>Promedio</Text>
                                            <Text style={style.littleMediumMsj}>por hora</Text>
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10, width: 310 }}>

                                        <View style={{ alignItems: "center" }}>
                                            <View style={style.propertyUserSmall}>
                                                <Text style={style.propertyTextLittleLimit}>${loseForFaild}</Text>
                                            </View>
                                            <Text style={style.littleMediumMsj}>Perdida</Text>
                                            <Text style={style.littleMediumMsj}>por falta</Text>
                                        </View>

                                        <View style={{ alignItems: "center" }}>
                                            <View style={style.propertyUserSmall}>
                                                <Text style={style.propertyTextLittleLimit2}>{cancelTurn}</Text>
                                            </View>
                                            <Text style={style.littleMediumMsj}>Turnos</Text>
                                            <Text style={style.littleMediumMsj}>cancelados</Text>
                                        </View>

                                        <View style={{ alignItems: "center" }}>
                                            <View style={style.propertyUserSmall}>
                                                <Text style={style.propertyTextLittleLimit}>${futureCollect}</Text>
                                            </View>
                                            <Text style={style.littleMediumMsj}>Ganancia</Text>
                                            <Text style={style.littleMediumMsj}>Futura</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                    renderItem={({ item }) =>
                        item.state !== "cancelByUser" && item.state !== "cancelByAdmin" && item.product.name !== "Dia Bloqueado" &&
                        <View style={style.cardAgenda}>
                            <Text style={style.mediumText}>{item.hourInit} | {item.product.name}</Text>
                            <Text style={style.titleTurnUser2}>{item.user.name} {item.user.lastname}</Text>

                            <View style={{ flexDirection: "row", marginTop: -12, alignItems: "center" }}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={style.propertyUserSmall}>
                                        <Text style={style.propertyTextLittleLimit3}>${item.price}</Text>
                                    </View>
                                    <Text style={style.littleMsj}>Precio</Text>
                                </View>
                                <View style={{ alignItems: "center", marginLeft: 8, marginRight: 70 }}>
                                    <View style={style.propertyUserSmall}>
                                        <Text style={style.propertyTextLittleLimit3}>{item.product.duration} min</Text>
                                    </View>
                                    <Text style={style.littleMsj}>Duración</Text>
                                </View>
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
                                {item.state === "toTake" && item.product.name !== "Turno Bloqueado" &&
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ alignItems: "center", marginRight: 8 }}>
                                            <TouchableOpacity onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "takedIt", item.price, item.product.duration, item.user.vip)}>
                                                <Image style={style.imageUserListOpac} source={require("../../assets/Bien.png")} />
                                            </TouchableOpacity>
                                            <Text style={style.littleMsj}>Asistió</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <TouchableOpacity onPress={() => setStateTurn(item.user.id, item.user.credits, item.id, "failed", item.price, item.product.duration)}>
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