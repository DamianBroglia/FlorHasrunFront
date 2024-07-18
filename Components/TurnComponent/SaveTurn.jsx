import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceId } from '../../Redux/actions/serviceActions';
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
import { style } from '../Styles';
import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

const SaveTurn = ({ navigation }) => {
    const dispatch = useDispatch()
    const services = useSelector((state) => state.services.viewService)
    const user = useSelector((state) => state.users.user)
    const [save, setSave] = useState(false)

    const calendarHandler = async (id) => {
        try {
            if (id === "PostBlock" || id === "PostBlockDay") {
                if (id === "PostBlock") {
                    const blocking = services.find(e => e.name === "Turno Bloqueado")
                    if (blocking) {
                        dispatch(getServiceId(blocking.id))
                    } else {
                        const BlockingTurn = await axios.post(`${API_URL}products`, {
                            name: "Turno Bloqueado",
                            image: [1, 2, 3],
                            minimalDescription: "Bloqueador",
                            description: "Bloqueador",
                            duration: "30",
                            price: 0
                        })
                        if (BlockingTurn.data) {
                            dispatch(getServiceId(BlockingTurn.data.id))
                        }
                    }
                } else {
                    const blockingDay = services.find(e => e.name === "Dia Bloqueado")
                    if (blockingDay) {
                        dispatch(getServiceId(blockingDay.id))
                    } else {
                        const BlockingAllDay = await axios.post(`${API_URL}products`, {
                            name: "Dia Bloqueado",
                            image: [1, 2, 3],
                            minimalDescription: "Bloqueador",
                            description: "Bloqueador",
                            duration: "30",
                            price: 0
                        })
                        if (BlockingAllDay.data) {
                            dispatch(getServiceId(BlockingAllDay.data.id))
                        }
                    }
                }
            } else {
                setSave(false)
                dispatch(getServiceId(id))
            }
            navigation.navigate("Elija una fecha")
        } catch (error) {
            console.log(error);
        }
    }

    const goMyTurnsHandler = (id) => {
        dispatch(getTurnsByUserIdAction(id))
        setSave(false)
        navigation.navigate("Mis Turnos")
    }


    return (
        <View>
            {user.id ?
                <View>
                    <View style={{ flexDirection: "row" }}>
                        {user.name === "Flor" && user.lastname === "Hasrun" ?

                            <View style={style.cardUserTurns}>
                                <Image style={style.imageIcons} source={require("../../assets/Calendario.png")} />
                                <TouchableOpacity style={style.button} onPress={() => calendarHandler("PostBlockDay")}>
                                    <Text style={style.buttonText}>Bloquear Dia</Text>
                                </TouchableOpacity>
                            </View> :
                            <View style={style.cardUserTurns}>
                                <Image style={style.imageIcons} source={require("../../assets/CheckList.png")} />
                                <TouchableOpacity style={style.button} onPress={() => goMyTurnsHandler(user.id)}>
                                    <Text style={style.buttonText}>Mis Turnos</Text>
                                </TouchableOpacity>
                            </View>
                        }


                        {user.name === "Flor" && user.lastname === "Hasrun" ?
                            <View style={style.cardUserTurns}>
                                <Image style={style.imageIcons} source={require("../../assets/Candado.png")} />
                                <TouchableOpacity style={style.button} onPress={() => calendarHandler("PostBlock")}>
                                    <Text style={style.buttonText}>Bloquear</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={style.cardUserTurns}>
                                <Image style={style.imageIcons} source={require("../../assets/Bien.png")} />
                                <TouchableOpacity style={style.button} onPress={() => setSave(true)}>
                                    <Text style={style.buttonText}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    {save && user.id
                        ?
                        <View style={style.container}>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={style.text}> Elija el servicio para el cual quiere guardar turno </Text>
                            </View>
                            <FlatList
                                data={services}
                                horizontal
                                renderItem={({ item }) =>
                                    item.name !== "Turno Bloqueado" && item.name !== "Dia Bloqueado" &&
                                    <TouchableOpacity onPress={() => calendarHandler(item.id)}>
                                        <Image style={style.imageServ} source={{ uri: item.image[0] }} />
                                        <View style={{ marginTop: -43 }}>
                                            <View style={style.buttonServ} >
                                                <Text style={style.buttonText}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                        :
                        null
                    }



                </View> :
                <View style={{ alignItems: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 22, marginTop: 15, fontWeight: "800" }}>No puedes guardar un turno!</Text>
                    <Image style={style.imageBlockPag} source={require("../../assets/Candado.png")} />
                    <Text style={{ textAlign: "center", fontSize: 18, marginHorizontal: 18 }}>Registrate o ingresa para guardar un turno!</Text>
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <TouchableOpacity style={style.buttonFilterTurn} onPress={() => navigation.navigate("Registrarse")}>
                            <Text style={style.buttonText}>Registrarse</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.buttonFilterTurn} onPress={() => navigation.navigate("Entrar")}>
                            <Text style={style.buttonText}>Ingresar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

        </View>
    );
};


export default SaveTurn;