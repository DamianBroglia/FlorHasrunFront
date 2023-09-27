import React from 'react';
import { TouchableOpacity, View, Image, Text, Linking } from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllViewServi } from '../Redux/actions/serviceActions';
import { getAllUserAction } from '../Redux/actions/userActions';
import { style } from './Styles';
import { Video } from 'expo-av'
import { AboutFlorModal } from './AboutFlorModal';
import moment from 'moment';
import 'moment/locale/es';


const Home = ({ navigation }) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    const [videoPlayed, setVideoPlayed] = useState(false)
    const [seeMore, setSeeMore] = useState(false)
    const [notification, setNotification] = useState(null)
    const [notificationHours, setNotificationHours] = useState(null)
    const [readMore, setReadMore] = useState(false)
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
        const username = 'florhasrun_estetica_integral';
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
                <View style={{ marginTop: -310 }}>
                    <Image style={style.imageHomeLogo} source={require("../assets/LogoFlor.png")} />
                    <View style={{ marginTop: -25 }}>
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

                    <View style={{ alignItems: "center", width: 310, marginTop: 6 }}>
                        {user.id &&
                            <View style={{ alignItems: "center" }}>
                                <Text style={style.titleDateTurn}>Hola {user.name}!</Text>
                                {user.name === "Flor" && user.lastname === "Hasrun" ?
                                    <View>
                                        <Text style={style.mediumText}>Bienvenida a tu app!</Text>
                                        <Text style={style.mediumHome}>Puedes ver los turnos que guardaron tus usuarios,
                                            crear, modificar o eliminar servicios, obtener estadisticas sobre tus usuarios, las ganancias generadas,
                                            los servicios mas solicitados y mas!
                                        </Text>
                                    </View>
                                    :
                                    <View>
                                        {user.verified ?
                                            <View>
                                                <Text style={style.mediumText}>Ya puedes guardar tus turnos!</Text>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={style.mediumHome}>Recuerda que si no cumples con un turno</Text>
                                                    {!readMore &&
                                                        <TouchableOpacity onPress={() => setReadMore(true)}>
                                                            <Text style={style.mediumBlue}>...mas</Text>
                                                        </TouchableOpacity>}
                                                </View>
                                                {readMore &&
                                                    <Text style={style.mediumHome}> no se te devolverán los creditos que usaste para guardarlo.
                                                        Procura no quedarte sin creditos, cumple con tu compromiso y podrás seguir guardando turnos, en caso contrario
                                                        deverás solicitar creditos a Florencia y ella pactará la forma de intercambio de dichos creditos.
                                                        <TouchableOpacity onPress={() => setReadMore(false)}>
                                                            <Text style={style.mediumBlue}>menos</Text>
                                                        </TouchableOpacity>
                                                    </Text>
                                                }
                                            </View> :
                                            <View>
                                                <Text style={style.mediumText}>Tu identidad aún no ha sido verificada</Text>
                                                <Text style={style.mediumMsj2}>Una vez que Flor Hasrun verifique tu identidad, recibirás 4 creditos, con los que podrás guardar turnos</Text>
                                            </View>
                                        }
                                    </View>
                                }
                            </View>
                        }
                        {notificationHours &&
                            <View style={style.cardModalUserTurns3}>
                                <Text style={style.mediumMsj}>Tienes un turno para hoy a las {notificationHours.hourInit} horas</Text>
                                <TouchableOpacity style={style.buttonFino} onPress={() => navigation.navigate("Turnos")}>
                                    <Text style={style.buttonText}>Ver Turno</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {notification &&
                            <View style={style.cardModalUserTurns3}>
                                <Text style={style.mediumText}>Tienes un turno para mañana a las {notification.hourInit} horas</Text>
                                <TouchableOpacity style={style.buttonFino} onPress={() => navigation.navigate("Turnos")}>
                                    <Text style={style.buttonText}>Ver Turno</Text>
                                </TouchableOpacity>
                            </View>
                        }
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