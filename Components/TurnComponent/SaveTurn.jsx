import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { getTurnByDayAction } from '../../Redux/actions/turnActions';
import { getServiceId } from '../../Redux/actions/serviceActions';
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
import { style } from '../Styles';
import { ModalSaveTurns } from './ModalSaveTurn';
import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

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

    // useEffect(() => {
    //     setSave(false)
    // }, [])
    const hideAlert = () => {
        setSave(false)
    }

    return (
        <View>
            {user.id ?
                <View >
                    <View style={style.cardUsers}>
                        <Image style={style.imageIcons} source={require("../../assets/CheckList.png")} />
                        <TouchableOpacity style={style.button} onPress={() => goMyTurnsHandler(user.id)}>
                            <Text style={style.buttonText}>Mis Turnos</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.cardUsers}>

                        {user.name === "Flor" && user.lastname === "Hasrun" ?
                            <View style={{alignItems:"center"}}>
                                <Image style={style.imageIcons} source={require("../../assets/Candado.png")} />
                                <TouchableOpacity style={style.button} onPress={() => calendarHandler("PostBlock")}>
                                    <Text style={style.buttonText}>Bloquear Turno</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{alignItems:"center"}}>
                                <Image style={style.imageIcons} source={require("../../assets/Bien.png")} />
                                <TouchableOpacity style={style.button} onPress={() => setSave(true)}>
                                    <Text style={style.buttonText}>Guardar Turno</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {save && user.id
                            ?
                            <View style={style.container}>
                                <Text style={{ textAlign: "center" }}> Elija un servicio </Text>
                                <FlatList
                                    data={services}
                                    numColumns={4}
                                    renderItem={({ item }) =>
                                    item.name !== "Turno Bloqueado" &&
                                        <TouchableOpacity style={style.buttonServ} onPress={() => calendarHandler(item.id)}>
                                            <Text style={style.buttonTextServ}>{item.name}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                            :
                            null
                        }

                        {/* <ModalSaveTurns
                            isVisible={save}
                            onClose={() => hideAlert()}
                            services={services}
                            navigation={navigation}
                        /> */}

                    </View>
                </View> :
                <View style={{ alignItems: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 20, marginHorizontal: 20 }}>Registrate o ingresa para guardar un turno!</Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Registrarse")}>
                            <Text style={style.buttonText}>Registrarse</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Entrar")}>
                            <Text style={style.buttonText}>Ingresar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {/* {save && user.id
                ?
                <View style={style.container}>
                    <Text style={{ textAlign: "center", fontWeight: "700" }}> Elija el servicio para el que quiere guardar un turno </Text>
                    <FlatList
                        data={services}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={style.button} onPress={() => calendarHandler(item.id)}>
                                <Text style={style.buttonText}>{item.name}</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
                :
                null
            } */}
        </View>
    );
};


export default SaveTurn;