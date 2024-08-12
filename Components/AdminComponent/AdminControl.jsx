import React from 'react';
import { useState } from "react";
import { Text, View, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { getTurnByDayAction } from '../../Redux/actions/turnActions';
import { clearUser } from '../../Redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/es';
import { style } from '../Styles';

moment.locale('es');

const AdminControl = ({ navigation }) => {
    const date = new Date()
    const TodaySpanish = moment(date).format('dddd D [de] MMMM [de] YYYY');
    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState(false)

    const getTurnsDay = () => {
        dispatch(getTurnByDayAction(TodaySpanish))
        navigation.navigate("Agenda")
    }

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('@user_data');
        } catch (e) {
            console.error('Error clearing user data', e);
        }
        dispatch(clearUser())
        navigation.navigate("Home")
    }

    return (
        <View style={style.baseContainer} >
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <ScrollView style={{ width: "100%" }}>
                <View style={style.fullWidthCard}>
                    <Image style={{ ...style.bigImage, marginTop: "1%" }} source={require("../../assets/Agenda.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={getTurnsDay}>
                        <Text style={style.buttonText}> Agenda </Text>
                    </TouchableOpacity>
                </View>

                <View style={style.fullWidthCard}>
                    <Image style={{ ...style.bigImage, marginTop: "1%" }} source={require("../../assets/Usuarios.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => navigation.navigate("Usuarios")}>
                        <Text style={style.buttonText}> Usuarios </Text>
                    </TouchableOpacity>
                </View>


                <View style={style.fullWidthCard}>
                    <Image style={{ ...style.bigImage, marginTop: "1%" }} source={require("../../assets/Grafico.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => navigation.navigate("Estadisticas")}>
                        <Text style={style.buttonText}> Estadisticas </Text>
                    </TouchableOpacity>
                </View>

                <View style={style.fullWidthCard}>
                    <Image style={{ ...style.bigImage, marginTop: "1%" }} source={require("../../assets/Vip.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => navigation.navigate("Administrar Servicios")}>
                        <Text style={style.buttonText}>Servicios</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.fullWidthCard}>
                    <Image style={{ ...style.bigImage, marginTop: "1%" }} source={require("../../assets/FlechaIzquierda.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => setShowAlert(true)}>
                        <Text style={style.buttonText}>Salir</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {showAlert &&
                <View style={style.block}>
                    <View style={style.modalCard}>
                        <Image style={style.bigImage} source={require("../../assets/WarningGolden.png")} />
                        <Text style={style.bigText}>Seguro que deseas salir?</Text>
                        <View style={style.buttonsHorizontalContainer}>
                            <TouchableOpacity style={style.smallButton} onPress={() => logOut()}>
                                <Text style={style.buttonText}>Salir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.smallButton} onPress={() => setShowAlert(false)}>
                                <Text style={style.buttonText}>Volver</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }

        </View>
    );
};

export default AdminControl;