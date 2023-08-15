
import React, {useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';



const Pay = () => {


    return (
        <View style={style.container}>
            <Text> Para guardar el turno debes abonar una seña del 50% precio del servicio </Text>
            <Text> Formas de pago: </Text>
                <TouchableOpacity>
                    <Text style={style.button}>Mercado Pago</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={style.button}>Transferencia</Text>
                </TouchableOpacity>     
                <TouchableOpacity>
                    <Text style={style.button}>Home Banking</Text>
                </TouchableOpacity>         
            <Text> Si cancelas el turno con 24 horas de anticipacion se devolverá la seña </Text>
            <Text> En caso de no asistir al turno o avisar con menos de 24 horas de anticipacion, se tomara la seña como compensacion </Text>
            <Text> La seña se descontará del valor total del producto una vez terminado el turno  </Text>
            <Text> Si eres un@ cliente antigu@ y de confianza puedes solicitar ser vip   </Text>
            <Text> Ser vip te permitirá guardar turnos sin señarlos </Text>
            <TouchableOpacity>
                    <Text style={style.button}>Solicitar VIP</Text>
                </TouchableOpacity>

        </View>
    );
};

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "seashell"
    },

    button: {
        backgroundColor: "peachpuff",
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        height: 40,
        paddingVertical: 9,
        borderRadius: 5
    },

})
export default Pay;