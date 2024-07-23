import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
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
        <View>
            <View style={style.cardUsers}>
                <Image style={style.bigImage} source={require("../../assets/Subir.png")} />
                <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Crear Servicio")}>
                    <Text style={style.buttonText}>Crear Servicio</Text>
                </TouchableOpacity>
            </View>
            <View style={style.cardUsers}>
                <Image style={style.bigImage} source={require("../../assets/Vip.png")} />
                <TouchableOpacity style={style.button} onPress={seeAllService}>
                    <Text style={style.buttonText}>Ver todos los servicios</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ServiceControl;