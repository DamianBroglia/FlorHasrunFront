import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { style } from '../Styles';


const MyTurns = () => {

    const myTurn = useSelector((state) => state.turns.viewTurns)

    return (
        <FlatList
            data={myTurn}
            renderItem={({ item }) =>
                <View style={style.cardUsers}>
                    <View style={{alignItems:"center"}}>
                        <Text style={style.titleDateTurn}>{item.dateInit}</Text>
                        <Text style={style.textInfo}>{item.hourInit} hs</Text>
                        <Text style={style.titleServ}>{item.product.name}</Text>
                        <Text style={style.priceServTurns}>Resto a pagar: ${item.product.price / 2}</Text>
                    </View>
                    <TouchableOpacity style={style.button}>
                        <Text style={style.buttonText}> Cancelar Turno </Text>
                    </TouchableOpacity>
                </View>
            }
        />
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