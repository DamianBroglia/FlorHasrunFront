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
import { useState } from 'react';
import { CancelModal } from './CancelModal';
import { ModalAlert } from '../ModalAlert';
const API_URL = Constants.manifest.extra.API_URL;

moment.locale('es');


const MyTurns = () => {

    const myTurn = useSelector((state) => state.turns.viewTurns)
    const user = useSelector((state) => state.users.user)
    const [viewModal, setViewModal] = useState(false)
    const [viewModalAlert, setViewModalAlert] = useState(false)
    const [dataToCancel, setDataToCancel] = useState({})
    const [viewCancelTurn, setViewCancelTurn] = useState(false)
    const dispatch = useDispatch()
    const date = new Date()
    const today = moment(date)
    const tomarrow = today.add(1, "days")

    const cancelTurn = async (turnId, dateInit, cancelAnyWay) => {
        let init = moment(dateInit, 'dddd D [de] MMMM [de] YYYY')
        try {
            if (init.isAfter(tomarrow) || cancelAnyWay || user.vip) {
                const canceledTurn = await axios.put(`${API_URL}turns`, { turnId, cancel: true })
                if (canceledTurn.data) {
                    if (!cancelAnyWay && !user.vip) {
                        const setUser = await axios.put(`${API_URL}users`, { userId: user.id, credits: String(Number(user.credits) + 2) })
                        if (setUser.data) {
                            dispatch(getUserByIdAction(user.id))
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
                dispatch(getUserByIdAction(user.id))
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View>
            <FlatList
                data={myTurn}
                renderItem={({ item }) =>
                    <View style={style.cardUsers}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.titleDateTurn}>{item.dateInit}</Text>
                            <Text style={style.textInfo}>{item.hourInit} hs</Text>
                            <Text style={style.titleServ}>{item.product.name}</Text>
                            {item.state === "toTake" && !item.cancel ? <Text style={style.priceServTurns}>Resto a pagar: ${item.product.price / 2}</Text> : null}
                        </View>
                        {item.state === "toTake" &&
                            <View>
                                {item.cancel ?
                                    <Text style={style.titleDate}> Turno Cancelado </Text>
                                    :
                                    <TouchableOpacity style={style.button} onPress={() => setViewCancelTurn(item.id)}>
                                        <Text style={style.buttonText}> Cancelar Turno </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }
                        {item.state === "takedIt" && <Text style={style.titleDate}> Tomaste este turno </Text>}
                        {item.state === "failed" && <Text style={style.titleDate}> No cumpliste con este turno </Text>}
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

// const style = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "seashell",
//         marginTop: 20,
//         marginHorizontal: 20,
//         padding: 15,
//         borderRadius: 10,
//         justifyContent: "space-around"
//     },

//     button: {
//         backgroundColor: "peachpuff",
//         paddingHorizontal: 7,
//         height: 40,
//         paddingVertical: 9,
//         borderRadius: 5,
//     },

// })

export default MyTurns;