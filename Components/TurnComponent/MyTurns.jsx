import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { style } from '../Styles';
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
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
            if (init.isAfter(tomarrow) || cancelAnyWay) {
                const canceledTurn = await axios.put(`${API_URL}turns`, { turnId, cancel: true })
                if (canceledTurn.data) {
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

    const cancelTurnAnyWay = () => {
        setViewModal(false);
        cancelTurn(dataToCancel.turnId, dataToCancel.dateInit, true)
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
                            <Text style={style.priceServTurns}>Resto a pagar: ${item.product.price / 2}</Text>
                        </View>
                        {item.cancel ?
                            <View style={style.buttonNoSelect}>
                                <Text style={style.buttonText}> Cancelado </Text>
                            </View>
                            :
                            <TouchableOpacity style={style.button} onPress={() => setViewCancelTurn(item.id)}>
                                <Text style={style.buttonText}> Cancelar Turno </Text>
                            </TouchableOpacity>
                        }
                        {
                            viewCancelTurn === item.id &&
                            <View>
                                <Text style={style.textInfo}>Seguro que desea cancelar el turno?</Text>
                                <TouchableOpacity style={style.button} onPress={() => setViewCancelTurn(null)}>
                                    <Text style={style.buttonText}>Volver</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.button} onPress={() => cancelTurn(item.id, item.dateInit, false)}>
                                    <Text style={style.buttonText}>Cancelar Turno</Text>
                                </TouchableOpacity>
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
                message="Debido a que faltan menos de 48 hs para el turno, no se devolvera la seña al cancelarse, desea cancelar de todos modos?"
            />
            <ModalAlert
                isVisible={viewModalAlert}
                onClose={() => hideAlert()}
                title="Cancelado!"
                message="Se ha cancelado el turno con exito!"
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