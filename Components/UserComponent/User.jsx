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
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;



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
        const futureTurnsUserWithCancel = turnsUser.filter((e) => e.state === "toTake")
        const futureTurnsUser = futureTurnsUserWithCancel.filter((e) => e.cancel === false)
        setFutureTurns(futureTurnsUser)
    }, [turnsUser])

    const logOut = () => {
        dispatch(clearUser())
        navigation.navigate("Home")
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
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <View style={style.cardUser}>
                <Text style={style.titleServ}>{user.name} {user.lastname}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={style.textInfo}>{user.celNumber}</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 26 }}>
                        <Text style={style.textInfo}>Estado  </Text>
                        {user.verified ?
                            <Image style={style.imageVerified} source={require("../../assets/OkGreen.png")} />
                            :
                            <Image style={style.imageVerified} source={require("../../assets/Response.png")} />
                        }
                    </View>

                    <Text style={style.textInfo}>Creditos  </Text>

                    {user.vip ?
                        <View>
                            <TouchableOpacity onPress={() => setModalVip(true)}>
                                    <Image style={style.imageVerified} source={require("../../assets/Vip.png")} />
                                    <Text style={style.creditsVip}>VIP</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            {user.credits !== "getCredit" && user.credits !== "getCredit+1" ?
                                <TouchableOpacity onPress={() => setModals()}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={style.creditsNumber}>{user.credits}</Text>
                                        <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setModalViewRequest(true)}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={style.creditsNumber}>?</Text>
                                        <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                                    </View>

                                </TouchableOpacity>
                            }
                        </View>
                    }

                    {user.credits < 2 && user.verified && futureTurns.length === 0 ?
                        <Text style={style.buttonNot}>🔴</Text> : null
                    }


                    {/* {user.credits > 1 &&
                        <TouchableOpacity onPress={() => setModalViewCredits(true)}>
                            <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                        </TouchableOpacity>
                    } */}
                    {/* 
                    {user.credits === "getCredit" || user.credits === "getCredit+1" ?
                        <TouchableOpacity onPress={() => setModalViewRequest(true)}>
                            <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                        </TouchableOpacity>
                        :
                        null
                    } */}

                    {/* {user.credits === "0" && user.verified ?
                        <View>
                            {futureTurns.length === 0 ?
                                <TouchableOpacity onPress={() => setModalgetCredits(true)}>
                                    <Text style={style.buttonNot}>🔴</Text>
                                    <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setModalHaveFutureTurns(true)}>
                                    <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                                </TouchableOpacity>
                            }

                        </View> :
                        null
                    } */}

                    {/* {user.credits === "0" && !user.verified ?
                        <TouchableOpacity onPress={() => setModalNoVerified(true)}>
                            <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                        </TouchableOpacity> :
                        null
                    } */}

                    {/* {user.credits === "1" ?
                        <View>
                            {futureTurns.length === 0 ?
                                <TouchableOpacity onPress={() => setModalgetCreditsOne(true)}>
                                    <Text style={style.buttonNot}>🔴</Text>
                                    <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setModalHaveFutureTurns(true)}>
                                    <Image style={style.imageVerified} source={require("../../assets/Credit.png")} />
                                </TouchableOpacity>
                            }


                        </View>
                        :
                        null
                    } */}
                </View>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Usuario.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Modificar Usuario")}>
                        <Text style={style.buttonText}>Modificar</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Calendario.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Mis Turnos")}>
                        <Text style={style.buttonText}>Mis Turnos</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ flexDirection: "row" }}>

                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Configuraciones.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Opciones")}>
                        <Text style={style.buttonText}>Opciones</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/FlechaIzquierda.png")} />
                    <TouchableOpacity style={style.button} onPress={() => { setAreYouSure(true) }}>
                        <Text style={style.buttonText}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {areYouSure ?
                <View style={style.cardUsers}>
                    <Text style={style.textInfo}> Seguro que desea salir?</Text>
                    <View style={{ flexDirection: "row-reverse" }}>
                        <TouchableOpacity style={style.button} onPress={logOut}>
                            <Text style={style.buttonText}> Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={() => { setAreYouSure(false) }}>
                            <Text style={style.buttonText}> Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View> : null
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