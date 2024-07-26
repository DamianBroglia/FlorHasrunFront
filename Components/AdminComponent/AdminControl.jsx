import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { getTurnByDayAction } from '../../Redux/actions/turnActions';
import { clearUser } from '../../Redux/actions/userActions';
import moment from 'moment';
import 'moment/locale/es';
import { style } from '../Styles';

moment.locale('es');

const AdminControl = ({ navigation }) => {
    const date = new Date()
    const TodaySpanish = moment(date).format('dddd D [de] MMMM [de] YYYY');
    const dispatch = useDispatch()

    const getTurnsDay = () => {
        dispatch(getTurnByDayAction(TodaySpanish))
        navigation.navigate("Agenda")
    }

    const logOut = () => {
        dispatch(clearUser())
        navigation.navigate("Home")
    }

    return (
        <View style={style.baseContainer} >
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <ScrollView style={{width:"100%"}}>
                <View style={style.fullWidthCard}>
                    <Image style={{...style.bigImage, marginTop:"1%"}} source={require("../../assets/Agenda.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={getTurnsDay}>
                        <Text style={style.buttonText}> Agenda </Text>
                    </TouchableOpacity>
                </View>

                <View style={style.fullWidthCard}>
                    <Image style={{...style.bigImage, marginTop:"1%"}} source={require("../../assets/Usuarios.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => navigation.navigate("Usuarios")}>
                        <Text style={style.buttonText}> Usuarios </Text>
                    </TouchableOpacity>
                </View>


                <View style={style.fullWidthCard}>
                    <Image style={{...style.bigImage, marginTop:"1%"}} source={require("../../assets/Grafico.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => navigation.navigate("Estadisticas")}>
                        <Text style={style.buttonText}> Estadisticas </Text>
                    </TouchableOpacity>
                </View>

                <View style={style.fullWidthCard}>
                    <Image style={{...style.bigImage, marginTop:"1%"}} source={require("../../assets/Vip.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => navigation.navigate("Administrar Servicios")}>
                        <Text style={style.buttonText}>Servicios</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.fullWidthCard}>
                    <Image style={{...style.bigImage, marginTop:"1%"}} source={require("../../assets/FlechaIzquierda.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => logOut()}>
                        <Text style={style.buttonText}>Salir</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default AdminControl;