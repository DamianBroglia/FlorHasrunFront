import React from 'react';
import { TouchableOpacity, View, Image, Text, Linking, ImageBackground } from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllViewServi } from '../Redux/actions/serviceActions';
import { getAllUserAction } from '../Redux/actions/userActions';
import { style } from './Styles';
import { Video } from 'expo-av'
import { AboutFlorModal } from './AboutFlorModal';
import moment from 'moment';
import 'moment/locale/es';
import * as Animatable from 'react-native-animatable';



const Home = ({ navigation }) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    // const [videoPlayed, setVideoPlayed] = useState(false)
    const [videoPlayed, setVideoPlayed] = useState(true)
    const [seeMore, setSeeMore] = useState(false)
    const [notification, setNotification] = useState(null)
    const [notificationHours, setNotificationHours] = useState(null)
    const [readMore, setReadMore] = useState(false)
    const [showMsj, setShowMsj] = useState(false)
    const [showNotificaton, setShowNotification] = useState(false)
    const date = new Date()
    const dateSpanish = moment(date)
    const tomarrow = dateSpanish.add(1, "days").format('dddd D [de] MMMM [de] YYYY');
    const today = moment(date).format('dddd D [de] MMMM [de] YYYY');

    useEffect(() => {
        dispatch(getAllViewServi());
        dispatch(getAllUserAction());
    }, []);

    useEffect(() => {
        if (user.id && user.turns.length > 0) {
            turnFilter = user.turns.filter(e => e.state === "toTake")
            if (user.spamDay) {
                const turnTomarrow = turnFilter.find(e => e.dateInit === tomarrow)
                if (turnTomarrow) {
                    setNotification(turnTomarrow)
                } else {
                    setNotification(null)
                }
            } else {
                setNotification(null)
            }
            if (user.spamHour) {
                const turnToday = turnFilter.find(e => e.dateInit === today)
                if (turnToday) {
                    setNotificationHours(turnToday)
                } else {
                    setNotificationHours(null)
                }
            } else {
                setNotificationHours(null)
            }
        } else {
            setNotification(null)
            setNotificationHours(null)
        }
    }, [user]);

    const handleVideoPlay = (status) => {
        if (status.didJustFinish) {
            setVideoPlayed(true);
        }
    };

    const hideAlert = () => {
        setSeeMore(false)
    }

    const openInstagram = () => {
        const username = 'florhasrun_estetica_bienestar';
        Linking.openURL(`instagram://user?username=${username}`)
            .catch(() => {
                Linking.openURL(`https://www.instagram.com/${username}`);
            });
    };

    const openWhatsApp = () => {
        const phoneNumber = '3465509013';
        Linking.openURL(`whatsapp://send?phone=${phoneNumber}`)
            .catch(() => {
                Linking.openURL(`https://wa.me/${phoneNumber}`);
            });
    };

    return (

        <View>
            {videoPlayed ?
                <View style={style.baseContainer}>
                    <ImageBackground style={style.backgroundImage} source={require("../assets/FondoGris.png")} />
                    {videoPlayed && <Animatable.Image
                        animation="zoomIn"
                        duration={2000}
                        delay={800}
                        style={style.imageHomeLogo}
                        source={require("../assets/LogoFlor.png")} />}
                    {/* <Image style={style.imageHomeLogo} source={require("../assets/LogoFlor.png")} /> */}
                    <View style={style.containerButtonsHome}>

                        {user.id &&
                            <TouchableOpacity style={style.bigButton} onPress={() => { setShowMsj(true) }}>
                                <Text style={style.buttonText}>Hola {user.name}!</Text>
                            </TouchableOpacity>
                        }

                        {!user.id &&
                            <Animatable.View
                                animation="zoomIn"
                                duration={2000}
                                delay={1000} >
                                <TouchableOpacity style={style.bigButton} onPress={() => { navigation.navigate("Entrar") }}>
                                    <Text style={style.buttonText}> Entrar </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        }

                        {!user.id &&
                            <Animatable.View
                                animation="zoomIn"
                                duration={2000}
                                delay={1100} >
                                <TouchableOpacity style={style.bigButton} onPress={() => { navigation.navigate("Registrarse") }}>
                                    <Text style={style.buttonText}> Registrarse </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        }
                        <Animatable.View
                            animation="zoomIn"
                            duration={2000}
                            delay={1200} >
                            <TouchableOpacity style={style.bigButton} onPress={() => { navigation.navigate("Servicios") }}>
                                <Text style={style.buttonText}> Ver Servicios </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View
                            animation="zoomIn"
                            duration={2000}
                            delay={1300} >
                            <TouchableOpacity style={style.bigButton} onPress={() => setSeeMore(true)}>
                                <Text style={style.buttonText}> Sobre Florencia </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        {user.id &&
                            <View>
                                {notification || notificationHours ?
                                    <Animatable.View
                                        animation="rubberBand"
                                        duration={2000}>
                                        <TouchableOpacity style={style.bigButton} onPress={() => { setShowNotification(true) }}>
                                            <Text style={style.buttonText}> Turnos </Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    :
                                    <TouchableOpacity style={style.bigButton} onPress={() => { navigation.navigate("Turnos") }}>
                                        <Text style={style.buttonText}> Turnos </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }

                        {user.id &&
                            <View>
                                {user.name !== "Flor" && user.lastname !== "Hasrun" ?
                                    <TouchableOpacity style={style.bigButton} onPress={() => { navigation.navigate("Usuario") }}>
                                        <Text style={style.buttonText}> Usuario </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={style.bigButton} onPress={() => { navigation.navigate("Administrador") }}>
                                        <Text style={style.buttonText}> Administrar </Text>
                                    </TouchableOpacity>
                                }

                            </View>
                        }

                        {/* <TouchableOpacity style={style.bigButton} onPress={() => openInstagram()}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={style.imageSocial} source={require("../assets/InstagramLogo.png")} />
                                <Text style={style.buttonText}>Instagram</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.bigButton} onPress={() => openWhatsApp()}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={style.imageSocial} source={require("../assets/whatsapp_logo.png")} />
                                <Text style={style.buttonText}>Whatsapp</Text>
                            </View>
                        </TouchableOpacity> */}
                        <Animatable.View
                            animation="zoomIn"
                            duration={2000}
                            delay={1400} >
                            <TouchableOpacity style={style.bigButton} onPress={() => openInstagram()}>
                                <Text style={style.buttonText}>Instagram</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View
                            animation="zoomIn"
                            duration={2000}
                            delay={1500} >
                            <TouchableOpacity style={style.bigButton} onPress={() => openWhatsApp()}>
                                <Text style={style.buttonText}>Whatsapp</Text>
                            </TouchableOpacity>
                        </Animatable.View>

                        {/* {user.id &&
                            <TouchableOpacity style={style.bigButton} onPress={() => { setShowNotification(true) }}>
                                <Text style={style.buttonText}> Mensajes </Text>
                            </TouchableOpacity>
                        } */}
                    </View>

                    {showMsj &&
                        <View style={style.block}>
                            <View style={style.modalCard}>
                                <Text style={style.title}>Hola {user.name}!</Text>
                                {user.name === "Flor" && user.lastname === "Hasrun" ?
                                    <View>
                                        <Text style={style.mediumText}>Bienvenida a tu app!</Text>
                                        <Text style={style.smallText}>Puedes ver los turnos que guardaron tus usuarios,
                                            crear, modificar o eliminar servicios, obtener estadisticas sobre tus usuarios, las ganancias generadas,
                                            los servicios mas solicitados y mas!
                                        </Text>
                                    </View>
                                    :
                                    <View style={{ width: "90%" }}>
                                        {user.verified ?
                                            <View>
                                                <Text style={style.mediumText}>Ya puedes guardar tus turnos!</Text>
                                                <Text style={style.smallText}>Recuerda que si no cumples con un turno no se te devolverán los creditos que usaste para guardarlo.
                                                    Procura no quedarte sin creditos, cumple con tu compromiso y podrás seguir guardando turnos, en caso contrario
                                                    deverás solicitar creditos a Florencia y ella pactará la forma de intercambio de dichos creditos.</Text>
                                            </View>
                                            :
                                            <View>
                                                <Text style={style.mediumText}>Tu identidad aún no ha sido verificada</Text>
                                                <Text style={style.mediumMsj2}>Una vez que Flor Hasrun verifique tu identidad, recibirás 4 creditos, con los que podrás guardar turnos</Text>
                                            </View>
                                        }
                                    </View>
                                }
                                <TouchableOpacity style={style.bigButton} onPress={() => setShowMsj(false)}>
                                    <Text style={style.buttonText}>Volver</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                    {showNotificaton &&
                        <View style={style.block}>
                            {notificationHours &&
                                <View style={style.modalCard}>
                                    <Image style={style.bigImage} source={require("../assets/WarningGolden.png")} />
                                    <Text style={style.mediumMsj}>Tienes un turno para hoy a las {notificationHours.hourInit} horas</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity style={style.smallButton} onPress={() => navigation.navigate("Turnos")}>
                                            <Text style={style.buttonText}>Ver Turno</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.smallButton} onPress={() => setShowNotification(false)}>
                                            <Text style={style.buttonText}>Volver</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            {notification &&
                                <View style={style.modalCard}>
                                    <Image style={style.bigImage} source={require("../assets/WarningGolden.png")} />
                                    <Text style={style.mediumText}>Tienes un turno para mañana a las {notification.hourInit} horas</Text>
                                    <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-around" }}>
                                        <TouchableOpacity style={style.smallButton} onPress={() => navigation.navigate("Turnos")}>
                                            <Text style={style.buttonText}>Ver Turno</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.smallButton} onPress={() => setShowNotification(false)}>
                                            <Text style={style.buttonText}>Volver</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    }


                </View>
                :
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
            }

            <AboutFlorModal
                isVisible={seeMore}
                onClose={() => hideAlert()}
            />

        </View>
    );
};


export default Home;