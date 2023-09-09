import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Alert } from 'react-native';
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
    const [viewFilter, setViewFilter] = useState(false)
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
        setViewFilter(false)
    };

    const showFilter = () => {
        if (viewFilter) {
            setViewFilter(false)
        } else {
            setViewFilter(true)
        }
    }

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
                let cancel = myTurn.filter((e) => e.state === "cancelByUser" || e.state === "cancelByAmin")
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

    }

    useEffect(() => {
        setViewTurns(myTurn)
    }, [myTurn])

    return (
        <View>
            <FlatList
                data={viewTurns}
                ListHeaderComponent={
                    <View>
                        <TouchableOpacity style={style.buttonFilterTurn} onPress={showFilter}>
                            <Text style={style.buttonText}> Filtrar </Text>
                        </TouchableOpacity>
                        {viewFilter &&
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Todos")}>
                                        <Text style={style.buttonText}> Todos </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Cancel")}>
                                        <Text style={style.buttonText}> Cancelados </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Future")}>
                                        <Text style={style.buttonText}> Futuros </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Pasado")}>
                                        <Text style={style.buttonText}> pasados </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Cumplidos")}>
                                        <Text style={style.buttonText}> Cumplidos </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.buttonFilterTurn} onPress={() => filterTurns("Fallados")}>
                                        <Text style={style.buttonText}> Fallados </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                }
                renderItem={({ item }) =>
                    <View style={style.cardUsers}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.titleDateTurn}>{item.dateInit}</Text>
                            <Text style={style.textInfo}>{item.hourInit} hs</Text>
                            <Text style={style.titleServ}>{item.product.name}</Text>
                            {item.state === "toTake" && <Text style={style.priceServTurns}>A pagar: ${item.product.price}</Text>}
                        </View>
                        {item.state === "toTake" &&
                            <TouchableOpacity style={style.button} onPress={() => setViewCancelTurn(item.id)}>
                                <Text style={style.buttonText}> Cancelar Turno </Text>
                            </TouchableOpacity>
                        }
                        {item.state === "takedIt" && <Text style={style.titleDate}> Tomaste este turno </Text>}
                        {item.state === "failed" && <Text style={style.titleDate}> No cumpliste con este turno </Text>}
                        {item.state === "cancelByUser" && <Text style={style.titleDate}> Cancelaste este turno </Text>}
                        {item.state === "cancelByAdmin" && <Text style={style.titleDate}> Cancelado por administrador </Text>}
                        {
                            viewCancelTurn === item.id &&
                            <View>
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