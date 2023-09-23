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
    const [numTurnsCancelByAdmin, setNumTurnsCancelByAdmin] = useState(0)
    const [renderUsers, setRenderUsers] = useState(viewOrderUsers.slice(0, 5))
    const [initNumUser, setInitNumUser] = useState(1)
    const [endNumUser, setEndNumUser] = useState(6)
    const [page, setPage] = useState([])
    const [actualPage, setActualPage] = useState(1)

    useEffect(() => {
        // dispatch(getAllUserAction())
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
        <View>
            <FlatList
                data={renderUsers}
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
                                                <View style={style.buttonPageNoSelected}>
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </View> :
                                                <TouchableOpacity style={style.buttonPage} onPress={() => backPage()}>
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </TouchableOpacity>
                                            }

                                        </View>
                                    }
                                    {item !== "<" && item !== ">" &&
                                        <View>
                                            {item === actualPage ?
                                                <View style={style.buttonPageNoSelected}>
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </View> :
                                                <TouchableOpacity style={style.buttonPage} onPress={() => goPage(item)}>
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    }
                                    {item === ">" &&
                                        <View>
                                            {actualPage === page.length - 2 ?
                                                <View style={style.buttonPageNoSelected} >
                                                    <Text style={style.buttonText}> {item} </Text>
                                                </View> :
                                                <TouchableOpacity style={style.buttonPage} onPress={() => nextPage()}>
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
                    <View style={style.cardUser}>
                        <View style={{ marginHorizontal: 3, alignItems: "flex-start" }}>

                            <Text style={style.nameUser}> {item.name} {item.lastname}</Text>
                            {showProperty !== null &&
                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 15 }}>
                                    {showProperty === "savedTurns" ?
                                        <View style={style.propertyUser}>
                                            <Text style={style.propertyTextFilter}> {item.infoUser.pasTurns} </Text>
                                        </View> :
                                        <View style={style.propertyUserOpac}>
                                            <Text style={style.propertyTextFilterOpac}> {item.infoUser.pasTurns} </Text>
                                        </View>
                                    }
                                    {showProperty === "takedTurns" ?
                                        <View style={style.propertyUser}>
                                            <Text style={style.propertyTextFilter}> {item.infoUser.turnsTakedIt} </Text>
                                        </View> :
                                        <View style={style.propertyUserOpac}>
                                            <Text style={style.propertyTextFilterOpac}> {item.infoUser.turnsTakedIt} </Text>
                                        </View>
                                    }
                                    {showProperty === "money" ?
                                        <View style={style.propertyUser}>
                                            <Text style={style.propertyTextFilter}> {item.infoUser.totalPay} </Text>
                                        </View> :
                                        <View style={style.propertyUserOpac}>
                                            <Text style={style.propertyTextFilterOpac}> {item.infoUser.totalPay} </Text>
                                        </View>
                                    }
                                    {showProperty === "assists" ?
                                        <View style={style.propertyUser}>
                                            <Text style={style.propertyTextFilter}> {item.infoUser.averageAssists} </Text>
                                        </View> :
                                        <View style={style.propertyUserOpac}>
                                            <Text style={style.propertyTextFilterOpac}> {item.infoUser.averageAssists} </Text>
                                        </View>
                                    }
                                </View>
                            }
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    {item.verified ?
                                        <View style={{ alignItems: "center", marginRight: 14 }}>
                                            <Image style={style.imageUserList} source={require("../../assets/OkGreen.png")} />
                                            <Text style={style.littleMsj}>Verificado</Text>
                                        </View>
                                        :
                                        <View style={{ alignItems: "center", marginRight: 14 }}>
                                            <TouchableOpacity onPress={() => verifiedUser(item.id)}>
                                                <Image style={style.imageUserListOpac} source={require("../../assets/Bien.png")} />
                                            </TouchableOpacity>
                                            <Text style={style.littleMsj}>No Verific</Text>
                                        </View>
                                    }
                                </View>
                                {item.vip ?
                                    <View style={{ alignItems: "center", marginRight: 14 }}>
                                        <TouchableOpacity onPress={() => setVip(item)}>
                                            <Image style={style.imageUserList} source={require("../../assets/VipColor.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.littleMsj}>Vip</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center", marginRight: 14 }}>
                                        <TouchableOpacity onPress={() => setVip(item)}>
                                            <Image style={style.imageUserListOpac} source={require("../../assets/Vip.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.littleMsj}>No Vip</Text>
                                    </View>
                                }
                                {item.credits === "getCredit" || item.credits === "getCredit+1" ?
                                    <View style={{ alignItems: "center", marginRight: 14 }}>
                                        <TouchableOpacity onPress={() => setOpcionCredits(true)}>
                                            <Image style={style.imageUserList} source={require("../../assets/AlertaCredit.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.littleMsj}>Solicitud!</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center", marginRight: 14 }}>
                                        <Image style={style.imageUserList} source={require("../../assets/Credit.png")} />
                                        <Text style={style.littleMsj}>Creditos</Text>
                                        <Text style={style.userCredits}> {item.credits} </Text>
                                    </View>
                                }
                                <View style={{ alignItems: "center", marginRight: 14 }}>
                                    {item.infoUser.class === "new" ?
                                        <Text style={style.class}> N</Text>
                                        :
                                        <Text style={style.class}> {item.infoUser.class}</Text>
                                    }
                                    <Text style={style.littleMsj}>Clase</Text>
                                </View>
                                <TouchableOpacity onPress={()=>openWhatsApp(item.celNumber)} style={{ alignItems: "center", marginRight: 14 }}>
                                    <Image style={style.imageUserList} source={require("../../assets/WA.png")} />
                                    <Text style={style.littleMsj}>Enviar WA</Text>
                                </TouchableOpacity>

                                {userInfo === item.id ?
                                    <View style={{ alignItems: "center", marginRight: 14 }}>
                                        <TouchableOpacity onPress={() => setUserInfo(null)}>
                                            <Image style={style.imageOjo} source={require("../../assets/OjoAbierto.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.littleMsj}>Ocultar info</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center", marginRight: 14 }}>
                                        <TouchableOpacity onPress={() => getUserTurns(item.id)}>
                                            <Image style={style.imageOjoOpac} source={require("../../assets/OjoCerrado.png")} />
                                        </TouchableOpacity>
                                        <Text style={style.littleMsj}>Ver info</Text>
                                    </View>
                                }
                            </View>



                            {opcionCredits &&
                                <View>
                                    {item.credits === "getCredit+1" &&
                                        <View style={{ alignItems: "center", marginTop: 10 }}>
                                            <Text style={style.mediumText}>Este Usuario está solicitando creditos, cuantos desea darle?</Text>
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
                                                <TouchableOpacity style={style.button} onPress={() => setOpcionCredits(false)}>
                                                    <Text style={style.buttonText}> Volver </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }

                                    {item.credits === "getCredit" &&
                                        <View style={{ alignItems: "center", marginTop: 10 }}>
                                            <Text style={style.mediumText}>Este Usuario está solicitando creditos, cuantos desea darle?</Text>
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
                                                <TouchableOpacity style={style.button} onPress={() => setOpcionCredits(false)}>
                                                    <Text style={style.buttonText}> Volver </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }

                                </View>
                            }

                        </View>


                        {areYouShure === item.id ?
                            <View style={{ alignItems: "center", marginStart: 14, marginTop: 10 }}>
                                <Text style={style.mediumText}>{msj}</Text>
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
                                <Text style={style.titleTurnUser}>Turnos___________________________</Text>

                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity style={style.propertyUser} onPress={() => { filterTurns("todos") }}>
                                            <Text style={style.propertyText}> {userTurns.length} </Text>
                                        </TouchableOpacity>
                                        <Text style={style.mediumMsj}>Guardados</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity style={style.propertyUser} onPress={() => { filterTurns("pas") }}>
                                            <Text style={style.propertyText}> {item.infoUser.pasTurns} </Text>
                                        </TouchableOpacity>
                                        <Text style={style.mediumMsj}>Pasados</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity style={style.propertyUser} onPress={() => { filterTurns("fut") }}>
                                            <Text style={style.propertyText}> {userTurns.length - item.infoUser.turnsCancel - item.infoUser.pasTurns - numTurnsCancelByAdmin} </Text>
                                        </TouchableOpacity>
                                        <Text style={style.mediumMsj}>Futuros</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: 8, justifyContent: "space-around" }}>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity style={style.propertyUser} onPress={() => { filterTurns("cancel") }}>
                                            <Text style={style.propertyText}> {item.infoUser.turnsCancel} </Text>
                                        </TouchableOpacity>
                                        <Text style={style.mediumMsj}>Cancelados</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity style={style.propertyUser} onPress={() => { filterTurns("failed") }}>
                                            <Text style={style.propertyText}> {item.infoUser.turnsFailed} </Text>
                                        </TouchableOpacity>
                                        <Text style={style.mediumMsj}>Fallados</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity style={style.propertyUser} onPress={() => { filterTurns("takedIt") }}>
                                            <Text style={style.propertyText}> {item.infoUser.turnsTakedIt} </Text>
                                        </TouchableOpacity>
                                        <Text style={style.mediumMsj}>Cumplidos</Text>
                                    </View>
                                </View>

                                <Text style={style.titleTurnUser}>Ganancias_______________________</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={style.propertyTextLong}>${item.infoUser.totalPay}</Text>
                                        <Text style={style.mediumMsj}>Generadas</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={style.propertyTextLong}>${item.infoUser.loseForFail}</Text>
                                        <Text style={style.mediumMsj}>Perdidas por falta</Text>
                                    </View>
                                </View>

                                <Text style={style.titleTurnUser}>Tiempo__________________________</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={style.propertyTextLong}>{item.infoUser.totalTime / 60} Hs</Text>
                                        <Text style={style.mediumMsj}>Dedicado</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={style.propertyTextLong}>{item.infoUser.loseTime / 60} Hs</Text>
                                        <Text style={style.mediumMsj}>Perdido por faltas</Text>
                                    </View>
                                </View>

                                <Text style={style.titleTurnUser}>Asistencia_______________________</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
                                    <Text style={style.propertyText}> {item.infoUser.averageAssists}%</Text>
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