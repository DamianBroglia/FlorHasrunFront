import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground, Linking } from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllViewServi } from '../Redux/actions/serviceActions';
import { getAllUserAction } from '../Redux/actions/userActions';
import { style } from './Styles';
/////
import { Video } from 'expo-av'
import { AboutFlorModal } from './AboutFlorModal';


const Home = ({ navigation }) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)

    const [videoPlayed, setVideoPlayed] = useState(false)
    const [seeMore, setSeeMore] = useState(false)

    useEffect(() => {
        dispatch(getAllViewServi());
        dispatch(getAllUserAction());
    }, []);

    const handleVideoPlay = (status) => {
        if (status.didJustFinish) {
            setVideoPlayed(true); // El video ha terminado de reproducirse
        }
    };

    const hideAlert = () => {
        setSeeMore(false)
    }

    // const openFacebook = () => {
    //     const username = 'Flor-Hasrun-Estética-Integral'; // Reemplaza con el nombre de usuario de Facebook que deseas abrir
    //     Linking.openURL(`fb://profile/people/${username}`)
    //       .catch(() => {
    //         // En caso de que Facebook no esté instalado, puedes abrir la página web en su lugar.
    //         Linking.openURL(`https://www.facebook.com/people/${username}`);
    //       });
    //   };


    const openInstagram = () => {
        const username = 'florhasrun_estetica_integral'; // Reemplaza con el nombre de usuario de Instagram que deseas abrir
        Linking.openURL(`instagram://user?username=${username}`)
            .catch(() => {
                // En caso de que Instagram no esté instalado, puedes abrir la página web en su lugar.
                Linking.openURL(`https://www.instagram.com/${username}`);
            });
    };

    const openWhatsApp = () => {
        const phoneNumber = '3465509013'; // Reemplaza con el número de teléfono al que deseas enviar un mensaje de WhatsApp
        Linking.openURL(`whatsapp://send?phone=${phoneNumber}`)
            .catch(() => {
                // En caso de que WhatsApp no esté instalado, puedes abrir la página web en su lugar.
                Linking.openURL(`https://wa.me/${phoneNumber}`);
            });
    };

    return (
        // <View>
        //     <ImageBackground style={style.backgroundImage} source={require("../assets/Fondo.png")} />
        //     <ScrollView >

        //         <View style={{ alignItems: "center" }}>

        //             <Image resizeMode="contain" style={{ marginVertical: 15 }} source={require("../assets/LogoFlor.png")} />

        //             <Text style={style.text}>La estética juega un papel fundamental en nuestras vidas, ya que tiene el poder de influir en nuestro estado de ánimo,
        //                 en nuestra percepción del entorno y en la forma en que nos relacionamos con el mundo que nos rodea. Aunque a menudo se
        //                 la considera superficial o innecesaria, la estética es mucho más que la simple apariencia externa; es una manifestación del
        //                 arte y la belleza que nos rodea.</Text>
        //             <View style={style.cardUsers}>
        //                 <Text style={style.titleHome}>Sobre Florencia</Text>
        //                 <Image style={style.imageHome} source={require("../assets/Flor.jpg")} />
        //                 <Text style={style.text}> Florencia , reconocida como una eminencia en el campo de la estética, es una apasionada del arte y la belleza desde una edad temprana.
        //                     Nacida en una pequeña ciudad, Florencia descubrió su pasión por el diseño y la estética mientras crecía rodeada de naturaleza y colores vibrantes.
        //                     Desde su adolescencia, Florencia demostró un talento innato para la creatividad y la expresión visual. Su amor por el arte la llevó a estudiar Bellas Artes en una
        //                     prestigiosa universidad, donde perfeccionó sus habilidades en el dibujo, la pintura y la escultura. Sin embargo, fue en el mundo de la estética donde realmente
        //                     encontró su vocación.
        //                     Florencia se sumergió en el estudio de la estética en todas sus formas: desde la moda y el diseño de interiores hasta la arquitectura y el maquillaje. Su mente inquisitiva
        //                     la llevó a investigar las últimas tendencias y técnicas, pero también a explorar la historia y la teoría del arte y la belleza.</Text>

        //                 {!user.id &&
        //                     <View>
        //                         <TouchableOpacity style={style.button} onPress={() => { navigation.navigate("Entrar") }}>

        //                             <Text style={style.buttonText}> Entrar </Text>

        //                         </TouchableOpacity>
        //                         <TouchableOpacity style={style.button} onPress={() => { navigation.navigate("Registrarse") }}>

        //                             <Text style={style.buttonText}> Registrarse </Text>

        //                         </TouchableOpacity>
        //                     </View>
        //                 }

        //                 <TouchableOpacity style={style.button} onPress={() => { navigation.navigate("Servicios") }}>

        //                     <Text style={style.buttonText}> Ver Servicios </Text>

        //                 </TouchableOpacity>
        //                 {!user.id && <Text style={{textAlign:"center"}}> Puedes navegar sin registrarte, pero no podrás guardar un turno</Text>}
        //             </View>

        //         </View>
        //     </ScrollView>
        // </View>
        <View style={style.containerHomeVideo}>
                <Video
                    source={require('../assets/VideoLogo2.mp4')} 
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping={false}
                    style={style.video}
                    onPlaybackStatusUpdate={handleVideoPlay}
                />
            {videoPlayed &&
                <View style={{marginTop:-310}}>
                    <Image style={style.imageHomeLogo} source={require("../assets/LogoFlor.png")} />
                    {!user.id &&
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={style.buttonHome} onPress={() => { navigation.navigate("Entrar") }}>
                                <Text style={style.buttonText}> Entrar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.buttonHome} onPress={() => { navigation.navigate("Registrarse") }}>
                                <Text style={style.buttonText}> Registrarse </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={style.buttonHome} onPress={() => { navigation.navigate("Servicios") }}>
                            <Text style={style.buttonText}> Ver Servicios </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.buttonHome} onPress={() => setSeeMore(true)}>
                            <Text style={style.buttonText}> Sobre Florencia </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity style={style.buttonFacebook} onPress={() => openFacebook()}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Image style={style.imageSocial} source={require("../assets/Facebook.png")} />
                        <Text style={style.buttonText}> /FlorHasrun </Text>
                        </View>
                    </TouchableOpacity> */}
                    <View style={{ flexDirection: "row" }}>

                        <TouchableOpacity style={style.buttonInstagram} onPress={() => openInstagram()}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={style.imageSocial} source={require("../assets/InstagramLogo.png")} />
                                <Text style={style.buttonText}>Instagram</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.buttonWhatsapp} onPress={() => openWhatsApp()}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={style.imageSocial} source={require("../assets/whatsapp_logo.png")} />
                                <Text style={style.buttonText}>Whatsapp</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> 
            }

            <AboutFlorModal
                isVisible={seeMore}
                onClose={() => hideAlert()}
            />

        </View>
    );
};


export default Home;