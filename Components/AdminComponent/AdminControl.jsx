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
        <View >
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <ScrollView>
                <View style={style.cardUsers}>
                    <Image style={style.imageIcons} source={require("../../assets/Agenda.png")} />
                    <TouchableOpacity style={style.button} onPress={getTurnsDay}>
                        <Text style={style.buttonText}> Agenda </Text>
                    </TouchableOpacity>
                </View>

                <View style={style.cardUsers}>
                    <Image style={style.imageIcons} source={require("../../assets/Usuarios.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Usuarios")}>
                        <Text style={style.buttonText}> Usuarios </Text>
                    </TouchableOpacity>
                </View>


                <View style={style.cardUsers}>
                    <Image style={style.imageIcons} source={require("../../assets/Grafico.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Estadisticas")}>
                        <Text style={style.buttonText}> Estadisticas </Text>
                    </TouchableOpacity>
                </View>

                <View style={style.cardUsers}>
                    <Image style={style.imageIcons} source={require("../../assets/Vip.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Administrar Servicios")}>
                        <Text style={style.buttonText}>Servicios</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.cardUsers}>
                    <Image style={style.imageIcons} source={require("../../assets/FlechaIzquierda.png")} />
                    <TouchableOpacity style={style.button} onPress={() => logOut()}>
                        <Text style={style.buttonText}>Salir</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default AdminControl;