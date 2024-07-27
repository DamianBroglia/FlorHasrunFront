import React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { getAllServi } from '../../Redux/actions/serviceActions';

import { style } from '../Styles';

const ServiceControl = ({ navigation }) => {
    const dispatch = useDispatch()

    const seeAllService = () => {
        dispatch(getAllServi())
        navigation.navigate("Todos los servicios")
    }

    return (
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <View style={{...style.baseContainer, justifyContent: "space-around"}}>
                <View style={style.mediumCard}>
                    <Image style={style.bigImage} source={require("../../assets/Subir.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={() => navigation.navigate("Crear Servicio")}>
                        <Text style={style.buttonText}>Crear Servicio</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.mediumCard}>
                    <Image style={style.bigImage} source={require("../../assets/Vip.png")} />
                    <TouchableOpacity style={style.mediumButton} onPress={seeAllService}>
                        <Text style={style.buttonText}>Ver todos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ServiceControl;