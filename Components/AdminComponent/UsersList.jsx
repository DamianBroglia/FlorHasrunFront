import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import { getAllUserAction, getUserByNameAction } from "../../Redux/actions/userActions"
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
import { getInfoUser } from './getInfoUser';
import { ModalUserTurns } from './ModalUserTurns';
import axios from "axios"
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

const UsersList = ({ navigation }) => {

    const dispatch = useDispatch()
    const allUsers = useSelector((state) => state.users.allUsers)
    const userTurns = useSelector((state) => state.turns.viewTurns)
    const [userPut, setUserPut] = useState({})
    const [areYouShure, setAreYouShure] = useState(null)
    const [msj, setmsj] = useState("")
    const [userInfo, setUserInfo] = useState(null)
    // const [info, setInfo] = useState({})
    const [searchUser, setSearchUser] = useState("")
    const [alertVip, setAlertVip] = useState(false)
    const [alertNOVip, setAlertNOVip] = useState(false)
    const [alertCredits, setAlertCredits] = useState(false)
    const [alertVerified, setAlertVerified] = useState(false)
    const [opcionCredits, setOpcionCredits] = useState(false)
    const [showModalTurns, setShowModalTurns] = useState(false)
    const [filteredTurns, setFilteredTurns] = useState([])
    const [title, setTitle] = useState("")
    const [noHay, setNoHay] = useState("Seleccione un boton para ver los turnos")
    const [showOrder, setShowOrder] = useState(false)
    const [viewOrderUsers, setViewOrderUsers] = useState([...allUsers])
    const [showProperty, setShowProperty] = useState(null)

    useEffect(() => {
        dispatch(getAllUserAction())
    }, [])

    // useEffect(() => {
    //     const getInfoUserObj = getInfoUser(turns)
    //     setInfo(getInfoUserObj)
    // }, [turns])

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
                    setAlertVip(true)
                } else {
                    setAlertNOVip(true)
                }
                dispatch(getAllUserAction())
                setAreYouShure(null)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserTurns = (id) => {
        setUserInfo(id)
        dispatch(getTurnsByUserIdAction(id))
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

    // const goToUserInfo = async (id) => {
    //     dispatch(getTurnsByUserIdAction(id))
    //     setUserInfo(id)
    // }

    const searchUserName = () => {
        dispatch(getUserByNameAction(searchUser))
    }

    const hideAlert = () => {
        setAlertVip(false);
        setAlertNOVip(false);
        setAlertCredits(false)
        setAlertVerified(false)
        setShowModalTurns(false)
    };

    const orderUser = (order) => {
        let userOrder = [...allUsers]
        let changed = true
        if (order === "savedTurns") {
            while (changed) {
                changed = false
                for (let i = 0; i < userOrder.length - 1; i++) {
                    if (userOrder[i].infoUser.pasTurns < userOrder[i + 1].infoUser.pasTurns) {
                        let aux = userOrder[i]
                        userOrder[i] = userOrder[i + 1]
                        userOrder[i + 1] = aux
                        changed = true
                    }
                }
            }
        }
        if (order === "takedTurns") {
            while (changed) {
                changed = false
                for (let i = 0; i < userOrder.length - 1; i++) {
                    if (userOrder[i].infoUser.turnsTakedIt < userOrder[i + 1].infoUser.turnsTakedIt) {
                        let aux = userOrder[i]
                        userOrder[i] = userOrder[i + 1]
                        userOrder[i + 1] = aux
                        changed = true
                    }
                }
            }
        }
        if (order === "money") {
            while (changed) {
                changed = false
                for (let i = 0; i < userOrder.length - 1; i++) {
                    if (userOrder[i].infoUser.totalPay < userOrder[i + 1].infoUser.totalPay) {
                        let aux = userOrder[i]
                        userOrder[i] = userOrder[i + 1]
                        userOrder[i + 1] = aux
                        changed = true
                    }
                }
            }
        }
        if (order === "assists") {
            while (changed) {
                changed = false
                for (let i = 0; i < userOrder.length - 1; i++) {
                    if (userOrder[i].infoUser.averageAssists < userOrder[i + 1].infoUser.averageAssists) {
                        let aux = userOrder[i]
                        userOrder[i] = userOrder[i + 1]
                        userOrder[i + 1] = aux
                        changed = true
                    }
                }
            }
        }
        setViewOrderUsers(userOrder)
        setShowProperty(order)
    }

    const disorderUser = () => {
        setShowProperty(null)
        setViewOrderUsers(allUsers)
        setShowOrder(false)
    }

    const filterTurns = (filter) => {
        if (filter === "todos") {
            setFilteredTurns(userTurns)
            setTitle("Todos los Turnos")
            setNoHay("No hay Turnos")
        }
        if (filter === "pas") {
            let turnsPas = userTurns.filter(e => e.state === "takedIt" || e.state === "failed")
            setFilteredTurns(turnsPas)
            setTitle("Turnos Pasados")
            setNoHay("No hay turnos pasados")
        }
        if (filter === "fut") {
            let turnsFut = userTurns.filter(e => e.state === "toTake")
            setFilteredTurns(turnsFut)
            setTitle("Turnos Futuros")
            setNoHay("No hay turnos futuros")
        }
        if (filter === "cancel") {
            let turnscancel = userTurns.filter(e => e.state === "cancelByUser")
            setFilteredTurns(turnscancel)
            setTitle("Turnos Fallados")
            setNoHay("Este cliente no ha fallado ningun turno")
        }
        if (filter === "failed") {
            let turnsfailed = userTurns.filter(e => e.state === "failed")
            setFilteredTurns(turnsfailed)
            setTitle("Turnos Fallados")
            setNoHay("Este cliente no ha fallado ningun turno")
        }
        if (filter === "takedIt") {
            let turnsTaked = userTurns.filter(e => e.state === "takedIt")
            setFilteredTurns(turnsTaked)
            setTitle("Turnos Cumplidos")
            setNoHay("Este cliente no ha cumplido con ningun turno")
        }
        setShowModalTurns(true)
    }

    return (
        <FlatList
            data={viewOrderUsers}
            ListHeaderComponent={
                <View>
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
                        {showOrder ?
                            <TouchableOpacity style={style.button} onPress={disorderUser}>
                                <Text style={style.buttonText}>Aleatorio</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={style.button} onPress={() => setShowOrder(true)}>
                                <Text style={style.buttonText}>Ordenar</Text>
                            </TouchableOpacity>
                        }

                    </View>
                    {showOrder &&
                        <View style={{ alignItems: "center" }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={style.buttonOrderUser} onPress={() => orderUser("savedTurns")}>
                                    <Text style={style.buttonText}>+ Turnos pasados</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.buttonOrderUser} onPress={() => orderUser("takedTurns")}>
                                    <Text style={style.buttonText}>+ Turnos cumplidos</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={style.buttonOrderUser} onPress={() => orderUser("money")}>
                                    <Text style={style.buttonText}>+ Dinero gastado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.buttonOrderUser} onPress={() => orderUser("assists")}>
                                    <Text style={style.buttonText}>+ Asistencia</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                </View>
            }
            renderItem={({ item }) =>
                <View style={style.cardUsers}>
                    <View style={{ marginHorizontal: 10, alignItems: "center" }}>
                        <Text style={style.name}> {item.name} {item.lastname}</Text>
                        <Text style={style.phoneNumber}> {item.celNumber} </Text>
                        {item.credits === "getCredit" || item.credits === "getCredit+1" ?
                            <View style={{ alignItems: "center" }}>
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

                        {showProperty === "savedTurns" && <Text>{item.infoUser.pasTurns}</Text>}
                        {showProperty === "takedTurns" && <Text>{item.infoUser.turnsTakedIt}</Text>}
                        {showProperty === "money" && <Text>{item.infoUser.totalPay}</Text>}
                        {showProperty === "assists" && <Text>{item.infoUser.averageAssists}</Text>}

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
                            <TouchableOpacity style={style.button} onPress={() => getUserTurns(item.id)}>
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

                    {userInfo === item.id &&
                        <View>
                            <Text>Turnos</Text>

                            <TouchableOpacity onPress={() => { filterTurns("todos") }}>
                                <Text>Guardados</Text>
                                <Text> {item.turns.length} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { filterTurns("pas") }}>
                                <Text>Pasados</Text>
                                <Text> {item.infoUser.pasTurns} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { filterTurns("fut") }}>
                                <Text>Futuros</Text>
                                <Text> {item.turns.length - item.infoUser.turnsCancel - item.infoUser.pasTurns} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { filterTurns("cancel") }}>
                                <Text>Cancelados</Text>
                                <Text> {item.infoUser.turnsCancel} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { filterTurns("failed") }}>
                                <Text>Fallados</Text>
                                <Text> {item.infoUser.turnsFailed} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { filterTurns("takedIt") }}>
                                <Text>Cumplidos</Text>
                                <Text> {item.infoUser.turnsTakedIt} </Text>
                            </TouchableOpacity>

                            <Text>Ganancias generadas por el usuario</Text>
                            <Text>{item.infoUser.totalPay}</Text>

                            <Text>Perdidas por falta</Text>
                            <Text>{item.infoUser.loseForFail}</Text>

                            <Text>Tiempo dedicado a este ususario</Text>
                            <Text>{item.infoUser.totalTime}</Text>

                            <Text>Perdida de tiempo por faltas</Text>
                            <Text>{item.infoUser.loseTime}</Text>

                            <Text>Asistencia</Text>
                            <Text>{item.infoUser.averageAssists}</Text>

                            <Text>Clase del usuario</Text>
                            <Text>{item.infoUser.class}</Text>

                        </View>
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
                    <ModalUserTurns
                        isVisible={showModalTurns}
                        onClose={() => hideAlert()}
                        filterTurns={filteredTurns}
                        title={title}
                        noHay={noHay}
                    />
                </View>
            } />
    );
};

export default UsersList;