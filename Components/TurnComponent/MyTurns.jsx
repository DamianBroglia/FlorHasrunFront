import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { style } from '../Styles';
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
import { getUserByIdAction } from '../../Redux/actions/userActions';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { CancelModal } from './CancelModal';
import { ModalAlert } from '../ModalAlert';
const API_URL = Constants.manifest.extra.API_URL;

moment.locale('es');

const MyTurns = () => {

    const myTurn = useSelector((state) => state.turns.viewTurns)
    const user = useSelector((state) => state.users.user)
    const [viewTurns, setViewTurns] = useState(myTurn)
    const [viewModal, setViewModal] = useState(false)
    const [viewModalAlert, setViewModalAlert] = useState(false)
    const [dataToCancel, setDataToCancel] = useState({})
    const [viewCancelTurn, setViewCancelTurn] = useState(false)
    const [buttonSelect, setButtonSelect] = useState("Future")
    const dispatch = useDispatch()
    const date = new Date()
    const today = moment(date)
    const tomarrow = today.add(1, "days")

    const cancelTurn = async (turnId, dateInit, cancelAnyWay) => {
        let init = moment(dateInit, 'dddd D [de] MMMM [de] YYYY')
        try {
            if (init.isAfter(tomarrow) || cancelAnyWay || user.vip) {
                const canceledTurn = await axios.put(`${API_URL}turns`, { turnId, state: "cancelByUser" })
                if (canceledTurn.data) {
                    if (!cancelAnyWay && !user.vip) {
                        const setUser = await axios.put(`${API_URL}users`, { userId: user.id, credits: String(Number(user.credits) + 2) })
                        if (setUser.data) {
                            const setInfoUser = await axios.put(`${API_URL}infoUser`, { id: setUser.data.id, turnsCancel: Number(setUser.data.infoUser.turnsCancel) + 1 })
                            if (setInfoUser.data) {
                                dispatch(getUserByIdAction(user.id))
                            }
                        }
                    }
                    dispatch(getTurnsByUserIdAction(user.id))
                    setViewModalAlert(true)
                    setViewCancelTurn(null)
                }
            } else {
                setViewModal(true)
                setDataToCancel({ turnId, dateInit })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const hideAlert = () => {
        setViewModal(false);
        setViewModalAlert(false)
    };

    const cancelTurnAnyWay = async () => {
        try {
            setViewModal(false);
            cancelTurn(dataToCancel.turnId, dataToCancel.dateInit, true)
            const setUser = await axios.put(`${API_URL}users`, { userId: user.id, credits: String(Number(user.credits) + 1) })
            if (setUser.data) {
                const setInfoUser = await axios.put(`${API_URL}infoUser`, { id: setUser.data.id, turnsCancel: Number(setUser.data.infoUser.turnsCancel) + 1 })
                if (setInfoUser.data) {
                    dispatch(getUserByIdAction(user.id))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const filterTurns = (type) => {
        if (type === "Todos") {
            setViewTurns([...myTurn])
        } else {
            if (type === "Cancel") {
                let cancel = myTurn.filter((e) => e.state === "cancelByUser" || e.state === "cancelByAdmin")
                setViewTurns(cancel)
            }
            if (type === "Pasado") {
                let pas = myTurn.filter((e) => e.state === "takedIt" || e.state === "failed")
                setViewTurns(pas)
            }
            if (type === "Future") {
                let futu = myTurn.filter((e) => e.state === "toTake")
                setViewTurns(futu)
            }
            if (type === "Cumplidos") {
                let cum = myTurn.filter((e) => e.state === "takedIt")
                setViewTurns(cum)
            }
            if (type === "Fallados") {
                let fail = myTurn.filter((e) => e.state === "failed")
                setViewTurns(fail)
            }
        }
        setButtonSelect(type)
    }

    useEffect(() => {
        const futureTurns = myTurn.filter(e => e.state === "toTake")
        setViewTurns(futureTurns)
        setButtonSelect("Future")
    }, [myTurn])

    return (
        <View>
            <FlatList
                data={viewTurns}
                ListHeaderComponent={
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                {buttonSelect === "Todos" ?
                                    <View style={style.buttonFilterTurnSelect}>
                                        <Text style={style.buttonText}> Todos </Text>
                                    </View>
                                    :
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Todos")}>
                                        <Text style={style.buttonText}> Todos </Text>
                                    </TouchableOpacity>
                                }
                                {buttonSelect === "Cancel" ?
                                    <View style={style.buttonFilterTurnSelect}>
                                        <Text style={style.buttonText}> Cancelados </Text>
                                    </View> :
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Cancel")}>
                                        <Text style={style.buttonText}> Cancelados </Text>
                                    </TouchableOpacity>
                                }

                            </View>
                            <View>
                                {buttonSelect === "Future" ?
                                    <View style={style.buttonFilterTurnSelect}>
                                        <Text style={style.buttonText}> Futuros </Text>
                                    </View> :
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Future")}>
                                        <Text style={style.buttonText}> Futuros </Text>
                                    </TouchableOpacity>
                                }
                                {buttonSelect === "Pasado" ?
                                    <View style={style.buttonFilterTurnSelect}>
                                        <Text style={style.buttonText}> Pasados </Text>
                                    </View> :
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Pasado")}>
                                        <Text style={style.buttonText}> Pasados </Text>
                                    </TouchableOpacity>
                                }

                            </View>
                            <View>
                                {buttonSelect === "Cumplidos" ?
                                    <View style={style.buttonFilterTurnSelect}>
                                        <Text style={style.buttonText}> Cumplidos </Text>
                                    </View> :
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Cumplidos")}>
                                        <Text style={style.buttonText}> Cumplidos </Text>
                                    </TouchableOpacity>
                                }
                                {buttonSelect === "Fallados" ?
                                    <View style={style.buttonFilterTurnSelect}>
                                        <Text style={style.buttonText}> Fallados </Text>
                                    </View> :
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Fallados")}>
                                        <Text style={style.buttonText}> Fallados </Text>
                                    </TouchableOpacity>
                                }

                            </View>
                        </View>

                    </View>
                }
                renderItem={({ item }) =>
                    <View style={style.cardAgenda}>
                        <View style={{ alignItems: "flex-start" }}>
                            <Text style={style.titleTurnUser3}>{item.dateInit}</Text>
                            <Text style={style.mediumText}>{item.hourInit} | {item.product.name}</Text>
                            <View style={{ flexDirection: "row", marginTop: 6 }}>
                                <View style={{ alignItems: "center", marginRight: 2 }}>
                                    <View style={style.propertyUserSmall}>
                                        <Text style={style.propertyTextLittle}>${item.price}</Text>
                                    </View>
                                    <Text style={style.littleMsj}> Precio </Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <View style={style.propertyUserSmall}>
                                        <Text style={style.propertyTextLittle}>{item.product.duration} min</Text>
                                    </View>
                                    <Text style={style.littleMsj}> Duración </Text>
                                </View>
                                {item.state === "toTake" &&
                                    <View style={{ marginTop: -6 }}>
                                        <TouchableOpacity style={style.button} onPress={() => setViewCancelTurn(item.id)}>
                                            <Text style={style.buttonText}>Cancelar Turno</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                {item.state === "takedIt" &&
                                    <View style={{ marginLeft: 100, alignItems: "center" }}>
                                        <Image style={style.imageUserList} source={require("../../assets/OkGreen.png")} />
                                        <Text style={style.littleMsj}>Asistido</Text>
                                    </View>
                                }
                                {item.state === "failed" &&
                                    <View style={{ marginLeft: 100, alignItems: "center" }}>
                                        <Image style={style.imageUserList} source={require("../../assets/MalRed.png")} />
                                        <Text style={style.littleMsj}>Fallado</Text>
                                    </View>
                                }
                                {item.state === "cancelByUser" &&
                                    <View style={{ marginLeft: 94, alignItems: "center" }}>
                                        <Image style={style.imageUserList} source={require("../../assets/Candado.png")} />
                                        <Text style={style.littleMsj}>Cancel por ti</Text>
                                    </View>
                                }
                                {item.state === "cancelByAdmin" &&
                                    <View style={{ marginLeft: 85, alignItems: "center" }}>
                                        <Image style={style.imageUserList} source={require("../../assets/Candado.png")} />
                                        <Text style={style.littleMsj}>Cancel por admin</Text>
                                    </View>
                                }
                            </View>
                        </View>



                        {
                            viewCancelTurn === item.id &&
                            <View style={{alignItems:"center", alignSelf:"center"}}>
                                <Text style={style.textInfo}>Seguro que desea cancelar el turno?</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={style.button} onPress={() => setViewCancelTurn(null)}>
                                        <Text style={style.buttonText}>Volver</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.button} onPress={() => cancelTurn(item.id, item.dateInit, false)}>
                                        <Text style={style.buttonText}>Cancelar Turno</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                }
            />
            <CancelModal
                isVisible={viewModal}
                onClose={() => hideAlert()}
                cancelAny={() => cancelTurnAnyWay()}
                title="Atención!"
                message="Debido a que el turno se cancelará el dia antes del dia del turno, solo se le devolverá un credito de los dos que usó para guardar el turno, desea cancela de todos modos?"
                buttonText="Cancelar Igual"
            />
            <ModalAlert
                isVisible={viewModalAlert}
                onClose={() => hideAlert()}
                title="Cancelado!"
                message="Se ha cancelado el turno con exito!"
                type="ok"
            />
        </View>
    );
};


export default MyTurns;