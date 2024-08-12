import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Linking, ImageBackground } from 'react-native';
import { getAllUserAction, getUserByNameAction } from "../../Redux/actions/userActions"
import { getTurnsByUserIdAction } from '../../Redux/actions/turnActions';
import { ModalUserTurns } from './ModalUserTurns';
import axios from "axios"
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

const UsersList = ({ navigation }) => {

    const dispatch = useDispatch()
    const allUsers = useSelector((state) => state.users.allUsers)
    const userTurns = useSelector((state) => state.turns.viewTurns)
    const [userPut, setUserPut] = useState({})
    const [areYouShure, setAreYouShure] = useState(null)
    const [msj, setmsj] = useState("")
    const [userInfo, setUserInfo] = useState(null)
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
    const [numTurnsCancelByAdmin, setNumTurnsCancelByAdmin] = useState(0)
    const [renderUsers, setRenderUsers] = useState(viewOrderUsers.slice(0, 5))
    const [initNumUser, setInitNumUser] = useState(1)
    const [endNumUser, setEndNumUser] = useState(6)
    const [page, setPage] = useState([])
    const [actualPage, setActualPage] = useState(1)

    useEffect(() => {
        if (allUsers.length > 5) {
            let numOfPag = Math.ceil(allUsers.length / 5)
            let array = ["<"]
            for (let i = 1; i <= numOfPag; i++) {
                array.push(i)
            }
            array.push(">")
            setPage(array)
        }
    }, [])

    useEffect(() => {
        setViewOrderUsers(allUsers)
        setRenderUsers(allUsers.slice(initNumUser, endNumUser))
    }, [allUsers])

    useEffect(() => {
        setRenderUsers(viewOrderUsers.slice(0, 5))
        setActualPage(1)
        setInitNumUser(0)
        setEndNumUser(5)
    }, [viewOrderUsers])

    useEffect(() => {
        const cancelByAdmin = userTurns.filter(e => e.state === "cancelByAdmin")
        setNumTurnsCancelByAdmin(cancelByAdmin.length)
    }, [userTurns])

    const openWhatsApp = (number) => {
        Linking.openURL(`whatsapp://send?phone=${number}`)
            .catch(() => {
                Linking.openURL(`https://wa.me/${number}`);
            });
    };

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

    const backPage = () => {
        let init = initNumUser - 5
        let end = endNumUser - 5
        setRenderUsers(viewOrderUsers.slice(init, end))
        setActualPage(actualPage - 1)
        setInitNumUser(init)
        setEndNumUser(end)
    }

    const nextPage = () => {
        let init = initNumUser + 5
        let end = endNumUser + 5
        setRenderUsers(viewOrderUsers.slice(init, end))
        setActualPage(actualPage + 1)
        setInitNumUser(init)
        setEndNumUser(end)
    }
    
    const goPage = (item) => {
        let init = (item * 5) - 5
        let end = (item * 5)
        setRenderUsers(viewOrderUsers.slice(init, end))
        setInitNumUser(init)
        setEndNumUser(end)
        setActualPage(item)
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />

            <FlatList
                data={renderUsers}
                ListHeaderComponent={
                    <View>
                        <View style={style.fullWidthCard}>
                            <View style={style.buttonsHorizontalContainer}>
                                <TextInput
                                    style={{ ...style.loginInput, width: "56%" }}
                                    placeholder='Buscar usuario'
                                    onChangeText={name => setSearchUser(name.toLowerCase())}
                                    defaultValue={searchUser}
                                />
                                {showOrder ?
                                    <TouchableOpacity style={{ ...style.smallButton, width: "38%" }} onPress={disorderUser}>
                                        <Text style={style.buttonText}>Aleatorio</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ ...style.smallButton, width: "38%" }} onPress={() => setShowOrder(true)}>
                                        <Text style={style.buttonText}>Ordenar</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>

                        {showOrder &&
                            <View style={style.fullWidthCard}>
                                <View style={style.buttonsHorizontalContainer}>
                                    <TouchableOpacity style={style.mediumButton} onPress={() => orderUser("savedTurns")}>
                                        <Text style={style.buttonText}>+ Turnos pasados</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.mediumButton} onPress={() => orderUser("takedTurns")}>
                                        <Text style={style.buttonText}>+ cumplidores</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.buttonsHorizontalContainer}>
                                    <TouchableOpacity style={style.mediumButton} onPress={() => orderUser("money")}>
                                        <Text style={style.buttonText}>+ Dinero gastado</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.mediumButton} onPress={() => orderUser("assists")}>
                                        <Text style={style.buttonText}>+ Asistencia</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                    </View>
                }
                ListFooterComponent={
                    <View style={{ alignItems: "center" }}>
                        <FlatList
                            horizontal
                            data={page}
                            renderItem={({ item }) =>
                                <View style={{ marginBottom: 10 }}>
                                    {item === "<" &&
                                        <View>
                                            {actualPage === 1 ?
                                                <Text style={{ ...style.buttonText, opacity: 0.5 }}> {item} </Text>
                                                :
                                                <TouchableOpacity onPress={() => backPage()}>
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>}
                                    {item !== "<" && item !== ">" &&
                                        <View>
                                            {item === actualPage ?
                                                <Text style={{ ...style.buttonText, opacity: 0.5 }}> {item} </Text>
                                                :
                                                <TouchableOpacity onPress={() => goPage(item)}>
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>}
                                    {item === ">" &&
                                        <View>
                                            {actualPage === page.length - 2 ?
                                                <Text style={{ ...style.buttonText, opacity: 0.5 }}> {item} </Text>
                                                :
                                                <TouchableOpacity onPress={() => nextPage()}>
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </TouchableOpacity>
                                            }

                                        </View>
                                    }
                                </View>
                            }
                        />
                    </View>
                }
                renderItem={({ item }) =>
                    <View style={style.fullWidthCard}>
                        <View style={{ alignItems: "flex-start", width: "97%" }}>

                            <Text style={style.VerybigText}> {item.name} {item.lastname}</Text>
                            {showProperty !== null &&
                                <View style={style.buttonsHorizontalContainer}>
                                    {showProperty === "savedTurns" ?
                                        <Text style={style.title}> {item.infoUser.pasTurns} </Text>
                                        :
                                        <Text style={{ ...style.title, opacity: 0.3 }}> {item.infoUser.pasTurns} </Text>
                                    }
                                    {showProperty === "takedTurns" ?
                                        <Text style={style.title}> {item.infoUser.turnsTakedIt} </Text>
                                        :
                                        <Text style={{ ...style.title, opacity: 0.3 }}> {item.infoUser.turnsTakedIt} </Text>
                                    }
                                    {showProperty === "money" ?
                                        <Text style={style.title}>$ {item.infoUser.totalPay} </Text>
                                        :
                                        <Text style={{ ...style.title, opacity: 0.3 }}>$ {item.infoUser.totalPay} </Text>
                                    }
                                    {showProperty === "assists" ?
                                        <Text style={style.title}> {item.infoUser.averageAssists} %</Text>
                                        :
                                        <Text style={{ ...style.title, opacity: 0.3 }}> {item.infoUser.averageAssists} %</Text>
                                    }
                                </View>
                            }
                            <View style={style.buttonsHorizontalContainer}>
                                {item.verified ?
                                    <View style={{ alignItems: "center" }}>
                                        <Image style={style.smallImage} source={require("../../assets/OkGreen.png")} />
                                        <Text style={style.smallText}>Verificado</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => verifiedUser(item.id)}>
                                            <Image style={style.smallImage} source={require("../../assets/Bien.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.smallText}>No Verific</Text>
                                    </View>
                                }

                                {item.vip ?
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => setVip(item)}>
                                            <Image style={style.smallImage} source={require("../../assets/VipColor.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.smallText}>Vip</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => setVip(item)}>
                                            <Image style={style.smallImage} source={require("../../assets/Vip.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.smallText}>No Vip</Text>
                                    </View>
                                }
                                {item.credits === "getCredit" || item.credits === "getCredit+1" ?
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => setOpcionCredits(true)}>
                                            <Image style={style.smallImage} source={require("../../assets/AlertaCredit.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.smallText}>Solicitud!</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center" }}>
                                        <Image style={style.smallImage} source={require("../../assets/Credit.png")} />
                                        <Text style={style.smallText}>Creditos</Text>
                                        <Text style={{ ...style.bigText, position: "absolute", top: "15%" }}> {item.credits} </Text>
                                    </View>
                                }

                                <View style={{ alignItems: "center" }}>
                                    <Image style={style.smallImage} source={require("../../assets/Credit.png")} />
                                    <Text style={style.smallText}>Clase</Text>
                                    {item.infoUser.class === "new" ?
                                        <Text style={{ ...style.bigText, position: "absolute", top: "15%" }}>N</Text>
                                        :
                                        <Text style={{ ...style.bigText, position: "absolute", top: "15%" }}>{item.infoUser.class}</Text>
                                    }

                                </View>

                                <TouchableOpacity onPress={() => openWhatsApp(item.celNumber)} style={{ alignItems: "center" }}>
                                    <Image style={style.smallImage} source={require("../../assets/WA.png")} />
                                    <Text style={style.smallText}>Enviar WA</Text>
                                </TouchableOpacity>

                                {userInfo === item.id ?
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => setUserInfo(null)}>
                                            <Image style={{ ...style.smallImage, width: 45 }} source={require("../../assets/OjoAbierto.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.smallText}>Ocultar info</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => getUserTurns(item.id)}>
                                            <Image style={{ ...style.smallImage, width: 45 }} source={require("../../assets/OjoCerrado.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.smallText}>Ver info</Text>
                                    </View>
                                }
                            </View>

                        </View>
                        {opcionCredits &&

                                <View style={{width:"100%"}}>
                                    {item.credits === "getCredit+1" &&
                                        <View style={style.fullWidthCard}>
                                            <Text style={style.mediumText}>Este Usuario está solicitando creditos, cuantos desea darle?</Text>
                                            <View style={style.buttonsHorizontalContainer}>
                                                <TouchableOpacity style={style.verySmallButton} onPress={() => { giveCredits(item.id, "2") }}>
                                                    <Text style={style.buttonText}> 1 </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.verySmallButton} onPress={() => { giveCredits(item.id, "3") }}>
                                                    <Text style={style.buttonText}> 2 </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.verySmallButton} onPress={() => { giveCredits(item.id, "4") }}>
                                                    <Text style={style.buttonText}> 3 </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.smallButton} onPress={() => setOpcionCredits(false)}>
                                                    <Text style={style.buttonText}> Volver </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }

                                    {item.credits === "getCredit" &&
                                        <View style={style.fullWidthCard}>
                                            <Text style={style.mediumText}>Este Usuario está solicitando creditos, cuantos desea darle?</Text>
                                            <View style={style.buttonsHorizontalContainer}>
                                                <TouchableOpacity style={style.verySmallButton} onPress={() => { giveCredits(item.id, "2") }}>
                                                    <Text style={style.buttonText}> 2 </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.verySmallButton} onPress={() => { giveCredits(item.id, "3") }}>
                                                    <Text style={style.buttonText}> 3 </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.verySmallButton} onPress={() => { giveCredits(item.id, "4") }}>
                                                    <Text style={style.buttonText}> 4 </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.smallButton} onPress={() => setOpcionCredits(false)}>
                                                    <Text style={style.buttonText}> Volver </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }

                                </View>
                            }

                        {areYouShure === item.id ?
                            <View style={style.fullWidthCard}>
                                <Text style={style.bigText}>{msj}</Text>
                                <View style={{ ...style.buttonsHorizontalContainer, marginTop: 15 }}>
                                    <TouchableOpacity style={style.smallButton} onPress={() => setAreYouShure(null)}>
                                        <Text style={style.buttonText}> Cancelar </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.smallButton} onPress={putChangeInUser}>
                                        <Text style={style.buttonText}> Si </Text>
                                    </TouchableOpacity>
                                </View>
                            </View> :
                            null
                        }

                        {userInfo === item.id &&
                            <View style={{ alignItems: "center", width: "100%" }}>
                                <View style={style.fullWidthCard}>
                                    <Text style={style.title}>Turnos</Text>
                                    <View style={style.buttonsHorizontalContainer}>
                                        <TouchableOpacity style={style.veryLitleCard} onPress={() => { filterTurns("todos") }}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}> {userTurns.length} </Text>
                                            <Text style={style.mediumText}>Guardados</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.veryLitleCard} onPress={() => { filterTurns("pas") }}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}> {item.infoUser.pasTurns} </Text>
                                            <Text style={style.mediumText}>Pasados</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.veryLitleCard} onPress={() => { filterTurns("fut") }}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}> {userTurns.length - item.infoUser.turnsCancel - item.infoUser.pasTurns - numTurnsCancelByAdmin} </Text>
                                            <Text style={style.mediumText}>Futuros</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={style.buttonsHorizontalContainer}>
                                        <TouchableOpacity style={style.veryLitleCard} onPress={() => { filterTurns("cancel") }}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}> {item.infoUser.turnsCancel} </Text>
                                            <Text style={style.mediumText}>Cancelados</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.veryLitleCard} onPress={() => { filterTurns("failed") }}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}> {item.infoUser.turnsFailed} </Text>
                                            <Text style={style.mediumText}>Fallados</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.veryLitleCard} onPress={() => { filterTurns("takedIt") }}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}> {item.infoUser.turnsTakedIt} </Text>
                                            <Text style={style.mediumText}>Cumplidos</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={style.fullWidthCard}>
                                    <Text style={style.title}>Ganancias</Text>
                                    <View style={style.buttonsHorizontalContainer}>
                                        <View style={style.litleCard}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}>${item.infoUser.totalPay}</Text>
                                            <Text style={style.mediumText}>Generadas</Text>
                                        </View>
                                        <View style={style.litleCard}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}>${item.infoUser.loseForFail}</Text>
                                            <Text style={style.mediumText}>Perdidas por falta</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={style.fullWidthCard}>
                                    <Text style={style.title}>Tiempo</Text>
                                    <View style={style.buttonsHorizontalContainer}>
                                        <View style={style.litleCard}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}>{item.infoUser.totalTime / 60} Hs</Text>
                                            <Text style={style.mediumText}>Dedicado</Text>
                                        </View>
                                        <View style={style.litleCard}>
                                            <Text style={{ ...style.VerybigText, marginTop: "10%" }}>{item.infoUser.loseTime / 60} Hs</Text>
                                            <Text style={style.mediumText}>Perdido por faltas</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={style.fullWidthCard}>
                                    <Text style={style.title}>Asistencia</Text>
                                    <View style={style.litleCard}>
                                        <Text style={{ ...style.VerybigText, marginVertical: "10%" }}>{item.infoUser.averageAssists}%</Text>
                                    </View>
                                </View>
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
        </View>
    );
};

export default UsersList;