import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { clearUser } from '../../Redux/actions/userActions';
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdAction } from '../../Redux/actions/userActions';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import { ModalCreditsState } from './ModalCreditsState';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;



const User = ({ navigation }) => {
    const dispatch = useDispatch()
    const [areYouSure, setAreYouSure] = useState(false)
    const [alertCredits, setAlertCredits] = useState(false)
    const user = useSelector((state) => state.users.user)
    const turnsUser = useSelector((state => state.turns.viewTurns))
    const [futureTurns, setFutureTurns] = useState([])
    const [modalGetCredits, setModalgetCredits] = useState(false)
    const [modalGetCreditsOne, setModalgetCreditsOne] = useState(false)
    const [modalViewCredits, setModalViewCredits] = useState(false)
    const [modalViewRequest, setModalViewRequest] = useState(false)
    const [modalHaveFutureTurns, setModalHaveFutureTurns] = useState(false)
    const [modalNoVerified, setModalNoVerified] = useState(false)
    const [modalVip, setModalVip] = useState(false)

    useEffect(() => {
        dispatch(getTurnsByUserIdAction(user.id))
    }, [])

    useEffect(() => {
        const futureTurnsUser = user.turns.filter((e) => e.state === "toTake")
        setFutureTurns(futureTurnsUser)
    }, [turnsUser])

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('@user_data');
        } catch (e) {
            console.error('Error clearing user data', e);
        }
        dispatch(clearUser())
        navigation.navigate("Home")
    }

    const goMyTurns = () => {
        dispatch(getTurnsByUserIdAction(user.id))
        navigation.navigate("Mis Turnos")
    }

    const getCredits = async (credits) => {

        try {
            const setUser = await axios.put(`${API_URL}users`, { userId: user.id, credits })
            if (setUser.data) {
                setAlertCredits(true)
                dispatch(getUserByIdAction(user.id))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setModals = () => {
        if (user.credits > 1) {
            setModalViewCredits(true)
        }
        if (user.credits === "0") {
            if (user.verified) {
                if (futureTurns.length === 0) {
                    setModalgetCredits(true)
                } else {
                    setModalHaveFutureTurns(true)
                }
            } else {
                setModalNoVerified(true)
            }
        }
        if (user.credits === "1") {
            if (futureTurns.length === 0) {
                setModalgetCreditsOne(true)
            } else {
                setModalHaveFutureTurns(true)
            }
        }
    }

    const hideAlert = () => {
        setAlertCredits(false)
        setModalViewCredits(false)
        setModalViewRequest(false)
        setModalgetCredits(false)
        setModalgetCreditsOne(false)
        setModalHaveFutureTurns(false)
        setModalNoVerified(false)
        setModalVip(false)
    }


    return (
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <View style={{ ...style.fullWidthCard, marginVertical: 5 }}>
                <Text style={style.title}>{user.name} {user.lastname}</Text>
            </View>

            <View style={{ ...style.fullWidthCard, flexDirection: "row", justifyContent: "space-around", marginVertical: 5 }}>
                <View style={style.veryLitleCard}>
                    <Text style={{ ...style.mediumText, marginBottom: 5 }}>Celular </Text>
                    <Text style={style.bigText}>{user.celNumber}</Text>
                </View>

                <View style={style.veryLitleCard}>
                    <Text style={style.mediumText}>Estado </Text>
                    {user.verified ?
                        <Image style={style.smallImage} source={require("../../assets/OkGreen.png")} />
                        :
                        <Image style={style.smallImage} source={require("../../assets/Response.png")} />
                    }
                </View>

                {user.vip ?
                    <View style={style.veryLitleCard}>
                        <Text style={style.mediumText}>Creditos </Text>
                        <TouchableOpacity onPress={() => setModalVip(true)}>
                            <Image style={style.smallImage} source={require("../../assets/Vip.png")} />
                            <Text style={style.mediumText}>VIP</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={style.veryLitleCard}>
                        {user.credits !== "getCredit" && user.credits !== "getCredit+1" ?
                            <TouchableOpacity onPress={() => setModals()}>
                                <Text style={style.mediumText}>Creditos </Text>
                                <Text style={{ ...style.VerybigText, marginTop: "4%" }}>{user.credits}</Text>
                                <Image style={{ ...style.smallImage, position: "absolute", alignSelf: "center", top: "40%" }} source={require("../../assets/Credit.png")} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setModalViewRequest(true)}>
                                <Text style={style.mediumText}>Creditos  </Text>
                                <Text style={{ ...style.VerybigText, marginTop: "4%" }}>?</Text>
                                <Image style={{ ...style.smallImage, position: "absolute", alignSelf: "center", top: "40%" }} source={require("../../assets/Credit.png")} />
                            </TouchableOpacity>
                        }
                        {user.credits < 2 && user.verified && futureTurns.length === 0 ?
                            <Text style={style.redPoint}>🔴</Text> : null
                        }
                    </View>
                }


            </View>


            <View style={{ ...style.fullWidthCard, marginVertical: 5 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", marginBottom: "3%" }}>
                    <View style={style.SmallMediumCard}>
                        <Image style={style.bigImage} source={require("../../assets/Usuario.png")} />
                        <TouchableOpacity style={style.smallButton} onPress={() => navigation.navigate("Modificar Usuario")}>
                            <Text style={style.buttonText}>Modificar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.SmallMediumCard}>
                        <Image style={style.bigImage} source={require("../../assets/Calendario.png")} />
                        <TouchableOpacity style={style.smallButton} onPress={() => goMyTurns()}>
                            <Text style={style.buttonText}>Mis Turnos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
                    <View style={style.SmallMediumCard}>
                        <Image style={style.bigImage} source={require("../../assets/Configuraciones.png")} />
                        <TouchableOpacity style={style.smallButton} onPress={() => navigation.navigate("Opciones")}>
                            <Text style={style.buttonText}>Opciones</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.SmallMediumCard}>
                        <Image style={style.bigImage} source={require("../../assets/FlechaIzquierda.png")} />
                        <TouchableOpacity style={style.smallButton} onPress={() => { setAreYouSure(true) }}>
                            <Text style={style.buttonText}>Salir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {areYouSure &&
                <View style={style.block}>
                    <View style={style.modalCard}>
                        <Text style={style.title}> Seguro que desea salir?</Text>
                        <View style={style.buttonsHorizontalContainer}>
                            <TouchableOpacity style={style.smallButton} onPress={logOut}>
                                <Text style={style.buttonText}>Si</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.smallButton} onPress={() => { setAreYouSure(false) }}>
                                <Text style={style.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
            <ModalAlert
                isVisible={alertCredits}
                onClose={() => hideAlert()}
                title="Creditos solicitados!"
                message="El administrador se contactará contigo para acordar cantidad y forma de cambio de los creditos"
                type="ok"
            />

            <ModalCreditsState
                isVisible={modalGetCredits}
                onClose={() => hideAlert()}
                getCredits={() => getCredits("getCredit")}
                title="Solicitar Creditos?"
                message="Puedes solicitar creditos, el administrador se contactará contigo para acordar cantidad y forma de cambio de los creditos"
                credits={null}
            />
            <ModalCreditsState
                isVisible={modalGetCreditsOne}
                onClose={() => hideAlert()}
                getCredits={() => getCredits("getCredit+1")}
                title="Solicitar Creditos?"
                message="Puedes solicitar creditos, el administrador se contactará contigo para acordar cantidad y forma de cambio de los creditos"
                credits={null}
            />
            <ModalCreditsState
                isVisible={modalViewCredits}
                onClose={() => hideAlert()}
                getCredits={null}
                title="Creditos como cliente!"
                message="Si en algun momento quedas sin credito, podras solicitar mas"
                credits={user.credits}
            />
            <ModalCreditsState
                isVisible={modalViewRequest}
                onClose={() => hideAlert()}
                getCredits={null}
                title="Esperando respuesta!"
                message="El administrador se contactará contigo para acordar cantidad y forma de cambio de los creditos"
                credits={null}
            />
            <ModalCreditsState
                isVisible={modalHaveFutureTurns}
                onClose={() => hideAlert()}
                getCredits={null}
                title="No puedes solicitar credito!"
                message="Debido a que tienes turnos ya guardados para el futuro, no puedes solicitar creditos"
                credits={null}
            />
            <ModalCreditsState
                isVisible={modalNoVerified}
                onClose={() => hideAlert()}
                getCredits={null}
                title="No verificado!"
                message="Cuando el administrador verifique tu identidad recibiras 4 creditos para guardar turnos"
                credits={null}
            />
            <ModalCreditsState
                isVisible={modalVip}
                onClose={() => hideAlert()}
                getCredits={null}
                title="Eres VIP!"
                message="Como usuario VIP puedes guardar los turnos que quieras"
                credits={null}
            />

        </View>
    );
};

export default User;