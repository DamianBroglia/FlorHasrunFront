import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import { getAllUserAction, getUserByNameAction } from "../../Redux/actions/userActions"
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
import { getInfoUser } from './getInfoUser';
import axios from "axios"
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

const UsersList = ({ navigation }) => {

    const dispatch = useDispatch()
    const allUsers = useSelector((state) => state.users.allUsers)
    const turns = useSelector((state) => state.turns.viewTurns)
    const [userPut, setUserPut] = useState({})
    const [areYouShure, setAreYouShure] = useState(null)
    const [msj, setmsj] = useState("")
    const [userInfo, setUserInfo] = useState(null)
    const [info, setInfo] = useState({})
    const [searchUser, setSearchUser] = useState("")
    const [alertVip, setAlertVip] = useState(false)
    const [alertNOVip, setAlertNOVip] = useState(false)
    const [alertCredits, setAlertCredits] = useState(false)
    const [alertVerified, setAlertVerified] = useState(false)
    const [opcionCredits, setOpcionCredits] = useState(false)

    useEffect(() => {
        dispatch(getAllUserAction())
    }, [])

    useEffect(() => {
        const getInfoUserObj = getInfoUser(turns)
        setInfo(getInfoUserObj)
    }, [turns])

    useEffect(() => {
        dispatch(getUserByNameAction(searchUser))
    }, [searchUser])

    const setVip = (item) => {
        setUserPut(userPut.userId = item.id)

        if (item.vip) {
            setUserPut({ ...userPut, vip: false })
            setmsj("Este usuario dejara de ser VIP, está seguro?")
        } else {
            setUserPut({ ...userPut, vip: true })
            setmsj("Este usuario será VIP, está seguro?")
        }
        setAreYouShure(item.id)
    }

    const putChangeInUser = async () => {
        try {
            const setUser = await axios.put(`${API_URL}users`, userPut)
            if (setUser.data) {
                if (setUser.data.vip) {
                    // Alert.alert("Has hecho VIP a este usuario")
                    setAlertVip(true)
                } else {
                    // Alert.alert("Has hecho que este usuario NO sea VIP")
                    setAlertNOVip(true)
                }
                dispatch(getAllUserAction())
                setAreYouShure(null)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const giveCredits = async (userId, credits) => {
        try {
            const setUser = await axios.put(`${API_URL}users`, { userId, credits })
            if (setUser.data) {
                setAlertCredits(true)
                dispatch(getAllUserAction())
            }
        } catch (error) {
            console.log(error);
        }
    }

    const verifiedUser = async (userId) => {
        try {
            const setUser = await axios.put(`${API_URL}users`, { userId, verified: true, credits: "4" })
            if (setUser.data) {
                setAlertVerified(true)
                dispatch(getAllUserAction())
            }
        } catch (error) {
            console.log(error);
        }
    }

    const goToUserInfo = async (id) => {
        dispatch(getTurnsByUserIdAction(id))
        setUserInfo(id)
    }

    const searchUserName = () => {
        dispatch(getUserByNameAction(searchUser))
    }


    const hideAlert = () => {
        setAlertVip(false);
        setAlertNOVip(false);
        setAlertCredits(false)
        setAlertVerified(false)
    };

    return (
        <FlatList
            data={allUsers}
            ListHeaderComponent={
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <TextInput
                        style={style.searchUser}
                        placeholder='Buscar usuario'
                        onChangeText={name => setSearchUser(name.toLowerCase())}
                        defaultValue={searchUser}
                    />
                    <TouchableOpacity style={style.button} onPress={searchUserName}>
                        <Image style={style.imageLupa} source={require("../../assets/Lupa.png")} />
                    </TouchableOpacity>
                </View>
            }
            renderItem={({ item }) =>
                <View style={style.cardUsers}>
                    <View style={{ marginHorizontal: 10, alignItems: "center" }}>
                        <Text style={style.name}> {item.name} {item.lastname}</Text>
                        <Text style={style.phoneNumber}> {item.celNumber} </Text>
                        {item.credits === "getCredit" || item.credits === "getCredit+1" ?
                            <View style={{alignItems:"center"}}>
                                <Text style={style.phoneNumber}> Creditos: 0 </Text>
                                <Text>Este usuario está solicitando creditos</Text>
                                <TouchableOpacity style={style.button} onPress={() => setOpcionCredits(true)}>
                                    <Text style={style.buttonText}> Dar creditos </Text>
                                </TouchableOpacity>
                            </View> :
                            <Text style={style.phoneNumber}> Creditos: {item.credits} </Text>
                        }

                        {item.verified ?
                            <Text>Verificado</Text> :
                            <TouchableOpacity style={style.button} onPress={() => verifiedUser(item.id)}>
                                <Text style={style.buttonText}> Verificar </Text>
                            </TouchableOpacity>
                        }

                        {opcionCredits &&
                            <View>
                                {item.credits === "getCredit+1" &&
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity style={style.button} onPress={() => { giveCredits(item.id, "2") }}>
                                            <Text style={style.buttonText}> 1 </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.button} onPress={() => { giveCredits(item.id, "3") }}>
                                            <Text style={style.buttonText}> 2 </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.button} onPress={() => { giveCredits(item.id, "4") }}>
                                            <Text style={style.buttonText}> 3 </Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                                {item.credits === "getCredit" &&
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity style={style.button} onPress={() => { giveCredits(item.id, "2") }}>
                                            <Text style={style.buttonText}> 2 </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.button} onPress={() => { giveCredits(item.id, "3") }}>
                                            <Text style={style.buttonText}> 3 </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.button} onPress={() => { giveCredits(item.id, "4") }}>
                                            <Text style={style.buttonText}> 4 </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity style={style.button} onPress={() => setOpcionCredits(false)}>
                                    <Text style={style.buttonText}> Volver </Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {userInfo === item.id ?
                            <TouchableOpacity style={style.button} onPress={() => setUserInfo(null)}>
                                <Text style={style.buttonText}> Ocultar info </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={style.button} onPress={() => goToUserInfo(item.id)}>
                                <Text style={style.buttonText}> Ver Info </Text>
                            </TouchableOpacity>
                        }

                        {item.vip ?
                            <TouchableOpacity style={style.button} onPress={() => setVip(item)}>
                                <Text style={style.buttonText}> VIP </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={style.buttonNoSelect} onPress={() => setVip(item)}>
                                <Text style={style.buttonText} > VIP </Text>
                            </TouchableOpacity>
                        }
                    </View>

                    {areYouShure === item.id ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.message}>{msj}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={style.button} onPress={() => setAreYouShure(null)}>
                                    <Text style={style.buttonText}> Cancelar </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.button} onPress={putChangeInUser}>
                                    <Text style={style.buttonText}> Si </Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        null
                    }


                    {userInfo === item.id ?
                        <View style={{ marginTop: 10 }}>
                            <View style={{ marginLeft: 45 }}>
                                <Text style={style.titleInfo}>Turnos</Text>

                                <View style={style.secondContainer}>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.totals}>Total</Text>
                                        <Text style={style.totals}>{turns.length}</Text>
                                    </View>
                                    <View style={style.thirdContainerCenter}>
                                        <Text style={style.textInfo}>Pasados:</Text>
                                        <Text>{info.pastTurns}</Text>
                                        <Text style={style.textInfo} >Futuros:</Text>
                                        <Text>{info.futureTurns}</Text>
                                    </View>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.textInfo} >Cumplidos:</Text>
                                        <Text>{info.complied}</Text>
                                        <Text style={style.textInfo} >Cancelados:</Text>
                                        <Text>0</Text>
                                        <Text style={style.textInfo} >Fallados:</Text>
                                        <Text>{info.failed}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Turnos del Cliente")}>
                                <Text style={style.buttonText}> Ver Turnos </Text>
                            </TouchableOpacity>

                            <View style={{ marginLeft: 45 }}>
                                <Text style={style.titleInfo}>Ganancias</Text>
                                <View style={style.secondContainer}>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.totals}>Previstas</Text>
                                        <Text style={style.totals}> $ {info.expectedProfit}</Text>
                                    </View>
                                    <View style={style.thirdContainerCenter}>
                                        <Text style={style.textInfo}>Pagada</Text>
                                        <Text> $ {info.charged}</Text>
                                        <Text style={style.textInfo}>A Pagar</Text>
                                        <Text> $ {info.toCollect}</Text>
                                    </View>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.textInfo}>Perdida</Text>
                                        <Text style={style.textInfo}>por falta</Text>
                                        <Text> $ {info.loseForFail}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{ marginLeft: 45 }}>
                                <Text style={style.titleInfo}>Tiempo</Text>
                                <View style={style.secondContainer}>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.totals}>Previsto</Text>
                                        <Text style={style.totals}>{info.totalTime} min</Text>
                                    </View>
                                    <View style={style.thirdContainerCenter}>
                                        <Text style={style.textInfo}>Cumplido</Text>
                                        <Text>{info.pasTime} min</Text>
                                        <Text style={style.textInfo}>Futuro</Text>
                                        <Text>{info.futureTime} min</Text>
                                    </View>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.textInfo}>Perdida</Text>
                                        <Text style={style.textInfo}>por falta</Text>
                                        <Text>{info.loseTimeForFail} min</Text>
                                    </View>
                                </View>


                            </View>
                            <View style={{ marginLeft: 45 }}>
                                <Text style={style.titleInfo}>Puntaje como cliente</Text>
                                <View style={style.secondContainer}>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.totals}>Asistencia:</Text>
                                        <Text style={style.textInfo}>{info.averageAssists} %</Text>
                                    </View>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.totals}>$xHora</Text>
                                        <Text style={style.textInfo}> $ {info.promeDurationMoney}/h</Text>
                                    </View>
                                    <View style={style.thirdContainer}>
                                        <Text style={style.totals}>Clase:</Text>
                                        <Text style={style.textInfo}>{info.class}</Text>
                                    </View>
                                </View>
                            </View>
                        </View> :
                        null
                    }
                    <ModalAlert
                        isVisible={alertVip}
                        onClose={hideAlert}
                        title="Usuario VIP!"
                        message="Este usuario no necesitara creditos para guardar turnos"
                        type="ok"
                    />
                    <ModalAlert
                        isVisible={alertNOVip}
                        onClose={hideAlert}
                        title="Usuario no VIP !"
                        message="Este usuario necesitara creditos para guardar turnos"
                        type="ok"
                    />
                    <ModalAlert
                        isVisible={alertCredits}
                        onClose={hideAlert}
                        title="Creditos Otorgados!"
                        message="Le has otorgado creditos a este usuario"
                        type="ok"
                    />
                    <ModalAlert
                        isVisible={alertVerified}
                        onClose={hideAlert}
                        title="Usuario Verificado!"
                        message="Este usuario ya puede guardar un turno en la app"
                        type="ok"
                    />
                </View>
            } />
    );
};

export default UsersList;