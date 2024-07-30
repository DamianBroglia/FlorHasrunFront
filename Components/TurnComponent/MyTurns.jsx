import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
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
const API_URL = Constants.expoConfig.extra.API_URL;

moment.locale('es');

const MyTurns = () => {

    const myTurn = useSelector((state) => state.turns.viewTurns)
    const user = useSelector((state) => state.users.user)
    const [viewTurns, setViewTurns] = useState(myTurn)
    const [viewModal, setViewModal] = useState(false)
    const [viewModalAlert, setViewModalAlert] = useState(false)
    const [dataToCancel, setDataToCancel] = useState({})
    const [viewCancelTurn, setViewCancelTurn] = useState(false)
    const [viewNoCancelTurn, setViewNoCancelTurn] = useState(false)
    const [buttonSelect, setButtonSelect] = useState("Future")
    const dispatch = useDispatch()
    const date = new Date()
    const today = moment(date)
    const tomarrow = today.add(1, "days")

    const cancelTurn = async (turnId, dateInit, cancelAnyWay) => {
        let init = moment(dateInit, 'dddd D [de] MMMM [de] YYYY')
        try {
            if (init.isBefore(today)) {
                setViewNoCancelTurn(true)
                return
            }
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
        setViewNoCancelTurn(false)
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
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <FlatList
                data={viewTurns}
                style={{ width: "100%" }}
                ListHeaderComponent={
                    <View style={{ width: "100%" }}>
                        <View style={{ ...style.fullWidthCard, flexDirection: "row", justifyContent: "space-around" }}>
                            <View>
                                {buttonSelect === "Todos" ?
                                    <View style={style.mediumSmallButtonX}>
                                        <Text style={style.buttonTextX}>Todos</Text>
                                    </View>
                                    :
                                    <TouchableOpacity style={style.mediumSmallButton} onPress={() => filterTurns("Todos")}>
                                        <Text style={style.buttonText}>Todos</Text>
                                    </TouchableOpacity>
                                }
                                {buttonSelect === "Cancel" ?
                                    <View style={style.mediumSmallButtonX}>
                                        <Text style={style.buttonTextX}>Cancelados</Text>
                                    </View> :
                                    <TouchableOpacity style={style.mediumSmallButton} onPress={() => filterTurns("Cancel")}>
                                        <Text style={style.buttonText}>Cancelados</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                            <View>
                                {buttonSelect === "Future" ?
                                    <View style={style.mediumSmallButtonX}>
                                        <Text style={style.buttonTextX}>Futuros</Text>
                                    </View> :
                                    <TouchableOpacity style={style.mediumSmallButton} onPress={() => filterTurns("Future")}>
                                        <Text style={style.buttonText}>Futuros</Text>
                                    </TouchableOpacity>
                                }
                                {buttonSelect === "Pasado" ?
                                    <View style={style.mediumSmallButtonX}>
                                        <Text style={style.buttonTextX}>Pasados</Text>
                                    </View> :
                                    <TouchableOpacity style={style.mediumSmallButton} onPress={() => filterTurns("Pasado")}>
                                        <Text style={style.buttonText}>Pasados</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                            <View>
                                {buttonSelect === "Cumplidos" ?
                                    <View style={style.mediumSmallButtonX}>
                                        <Text style={style.buttonTextX}>Cumplidos</Text>
                                    </View> :
                                    <TouchableOpacity style={style.mediumSmallButton} onPress={() => filterTurns("Cumplidos")}>
                                        <Text style={style.buttonText}>Cumplidos</Text>
                                    </TouchableOpacity>
                                }
                                {buttonSelect === "Fallados" ?
                                    <View style={style.mediumSmallButtonX}>
                                        <Text style={style.buttonTextX}>Fallados</Text>
                                    </View> :
                                    <TouchableOpacity style={style.mediumSmallButton} onPress={() => filterTurns("Fallados")}>
                                        <Text style={style.buttonText}>Fallados</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                        </View>

                    </View>
                }
                renderItem={({ item }) =>
                    <View style={{ width: "100%" }}>
                        <View style={style.fullWidthCard}>
                            <View style={{ alignItems: "flex-start", width: "90%" }}>
                                <Text style={style.VerybigText}>{item.dateInit}</Text>
                                <Text style={style.bigText}>{item.hourInit} | {item.product.name}</Text>
                                <View style={{ flexDirection: "row", marginTop: 6, alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", width: "60%", justifyContent: "space-around" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 6 }}>
                                            <Text style={style.bigText}>${item.price}</Text>
                                            <Text style={style.smallText}> Precio </Text>
                                        </View>
                                        <View style={{ ...style.litleCard, paddingVertical: 6 }}>
                                            <Text style={style.bigText}>{item.product.duration} min</Text>
                                            <Text style={style.smallText}> Duración </Text>
                                        </View>
                                    </View>
                                    {item.state === "toTake" &&
                                        <View style={{ alignItems: "center", width: "45%" }}>
                                            <TouchableOpacity style={style.smallButton} onPress={() => setViewCancelTurn(item.id)}>
                                                <Text style={style.buttonText}>Cancelar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    {item.state === "takedIt" &&
                                        <View style={{ alignItems: "center", width: "45%" }}>
                                            <Image style={style.mediumImage} source={require("../../assets/OkGreen.png")} />
                                            <Text style={style.smallText}>Asistido</Text>
                                        </View>
                                    }
                                    {item.state === "failed" &&
                                        <View style={{ alignItems: "center", width: "45%" }}>
                                            <Image style={style.mediumImage} source={require("../../assets/MalRed.png")} />
                                            <Text style={style.smallText}>Fallado</Text>
                                        </View>
                                    }
                                    {item.state === "cancelByUser" &&
                                        <View style={{ alignItems: "center", width: "45%" }}>
                                            <Image style={style.mediumImage} source={require("../../assets/Candado.png")} />
                                            <Text style={style.smallText}>Cancel por ti</Text>
                                        </View>
                                    }
                                    {item.state === "cancelByAdmin" &&
                                        <View style={{ alignItems: "center", width: "45%" }}>
                                            <Image style={style.mediumImage} source={require("../../assets/Candado.png")} />
                                            <Text style={style.smallText}>Cancel por admin</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                        {
                            viewCancelTurn === item.id &&
                            <View style={style.block}>
                                <View style={{...style.modalCard, height:140, top:0}}>
                                    <Text style={style.bigText}>Seguro que desea cancelar el turno?</Text>
                                    <View style={{ flexDirection: "row", width:"83%", justifyContent:"space-around" }}>
                                        <TouchableOpacity style={style.smallButton} onPress={() => setViewCancelTurn(null)}>
                                            <Text style={style.buttonText}>Volver</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.smallButton} onPress={() => cancelTurn(item.id, item.dateInit, false)}>
                                            <Text style={style.buttonText}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
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
            <ModalAlert
                isVisible={viewNoCancelTurn}
                onClose={() => hideAlert()}
                title="No se puede cancelar!"
                message="Solo puedes cancelar con 24 horas de anticipacion!"
            />
        </View>
    );
};


export default MyTurns;