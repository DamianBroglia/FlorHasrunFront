import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground } from 'react-native';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllViewServi } from '../Redux/actions/serviceActions';
import { getAllUserAction } from '../Redux/actions/userActions';
import { style } from './Styles';

const Home = ({ navigation }) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)

    useEffect(() => {
        dispatch(getAllViewServi());
        dispatch(getAllUserAction());
    }, []);

    return (
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../assets/Fondo.png")} />
            <ScrollView >

                <View style={{ alignItems: "center" }}>

                    <Image resizeMode="contain" style={{ marginVertical: 15 }} source={require("../assets/LogoFlor.png")} />

                    <Text style={style.text}>La estética juega un papel fundamental en nuestras vidas, ya que tiene el poder de influir en nuestro estado de ánimo,
                        en nuestra percepción del entorno y en la forma en que nos relacionamos con el mundo que nos rodea. Aunque a menudo se
                        la considera superficial o innecesaria, la estética es mucho más que la simple apariencia externa; es una manifestación del
                        arte y la belleza que nos rodea.</Text>
                    <View style={style.cardUsers}>
                        <Text style={style.titleHome}>Sobre Florencia</Text>
                        <Image style={style.imageHome} source={require("../assets/Flor.jpg")} />
                        <Text style={style.text}> Florencia , reconocida como una eminencia en el campo de la estética, es una apasionada del arte y la belleza desde una edad temprana.
                            Nacida en una pequeña ciudad, Florencia descubrió su pasión por el diseño y la estética mientras crecía rodeada de naturaleza y colores vibrantes.
                            Desde su adolescencia, Florencia demostró un talento innato para la creatividad y la expresión visual. Su amor por el arte la llevó a estudiar Bellas Artes en una
                            prestigiosa universidad, donde perfeccionó sus habilidades en el dibujo, la pintura y la escultura. Sin embargo, fue en el mundo de la estética donde realmente
                            encontró su vocación.
                            Florencia se sumergió en el estudio de la estética en todas sus formas: desde la moda y el diseño de interiores hasta la arquitectura y el maquillaje. Su mente inquisitiva
                            la llevó a investigar las últimas tendencias y técnicas, pero también a explorar la historia y la teoría del arte y la belleza.</Text>

                        {!user.id &&
                            <View>
                                <TouchableOpacity style={style.button} onPress={() => { navigation.navigate("Entrar") }}>

                                    <Text style={style.buttonText}> Entrar </Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={style.button} onPress={() => { navigation.navigate("Registrarse") }}>

                                    <Text style={style.buttonText}> Registrarse </Text>

                                </TouchableOpacity>
                            </View>
                        }

                        <TouchableOpacity style={style.button} onPress={() => { navigation.navigate("Servicios") }}>

                            <Text style={style.buttonText}> Ver Servicios </Text>

                        </TouchableOpacity>
                        {!user.id && <Text style={style.msj}> Puedes navegar sin registrarte, pero no podrás guardar un turno</Text>}
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

// const style = StyleSheet.create({
//     text: {
//         textAlign: "center",
//         fontSize: 16,
//         marginTop: 2,
//         marginBottom: 15,
//         color: "dimgrey",
//         marginHorizontal: 7
//     },
//     backgroundImage: {
//         position: "absolute",
//         height: 595,
//         width: 360,
//         objectFit: "cover",
//     },

//     imageHome: {
//         height: 330,
//         width: 240,
//         objectFit: "cover",
//         marginHorizontal: 4,
//         borderRadius: 3
//     },
//     title: {
//         fontSize: 24,
//         color: "dimgrey"
//     },

//     button: {
//         backgroundColor: "peachpuff",
//         paddingHorizontal: 10,
//         marginVertical: 10,
//         height: 30,
//         paddingVertical: 5,
//         borderRadius: 5
//     },
//     msj: {
//         textAlign: "center",
//         fontSize: 12,
//         color: "firebrick",
//         marginHorizontal: 12,
//         marginBottom: 20
//     }
// })

export default Home;