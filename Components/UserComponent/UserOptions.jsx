import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { style } from '../Styles';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByIdAction } from '../../Redux/actions/userActions';
import axios from "axios"
import { ModalAlert } from '../ModalAlert';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

const UserOptions = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    const [viewModal, setViewModal] = useState(false)
    const [userNotification, setUserNotification] = useState({
        userId: user.id,
        spamHour: user.spamHour,
        spamDay: user.spamDay,
        spamService: user.spamService
    })

    useEffect(() => {
        // Solicitar permisos al montar el componente
        const requestPermissions = async () => {
            const { granted } = await Notifications.requestPermissionsAsync();
            if (!granted) {
                console.log('Los permisos de notificación no fueron otorgados');
            }
            console.log('Los permisos de notificación fueron otorgados');

        };
        requestPermissions();
    }, []);

    const changeNotifications = async () => {
        try {
            const userChanged = await axios.put(`${API_URL}users`, userNotification)
            if (userChanged.data) {
                dispatch(getUserByIdAction(user.id))
                setViewModal(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const hideModal = () => {
        setViewModal(false)
    }

    return (
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <Text style={style.title}>Notificaciones </Text>
            <View style={{ ...style.fullWidthCard, height: "90%", justifyContent: "space-around" }}>

                <View style={{ ...style.litleCard, width: "90%", paddingVertical: "3%" }}>
                    <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "45%", alignItems: "flex-start" }}>
                            <Text style={style.bigText}>Un día antes</Text>
                            <Text style={{ ...style.mediumText, textAlign: "left" }}>Recibir un mensaje un dia antes del turno</Text>
                            {userNotification.spamDay ? <Text style={style.smallText}>✔Activado</Text> : <Text style={style.smallText}>Desactivado</Text>}
                        </View>

                        {userNotification.spamDay ?
                            <TouchableOpacity style={style.smallButton} onPress={() => setUserNotification({ ...userNotification, spamDay: false })}>
                                <Text style={style.buttonText}>Desactivar</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={style.smallButton} onPress={() => setUserNotification({ ...userNotification, spamDay: true })}>
                                <Text style={style.buttonText}>Activar</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ ...style.litleCard, width: "90%", paddingVertical: "3%" }}>
                    <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "45%", alignItems: "flex-start" }}>
                            <Text style={style.bigText}>Mismo día</Text>
                            <Text style={{ ...style.mediumText, textAlign: "left" }}>Recibir un mensaje el día del turno</Text>
                            {userNotification.spamHour ? <Text style={style.smallText}>✔Activado</Text> : <Text style={style.smallText}>Desactivado</Text>}
                        </View>
                        {userNotification.spamHour ?
                            <TouchableOpacity style={style.smallButton} onPress={() => setUserNotification({ ...userNotification, spamHour: false })}>
                                <Text style={style.buttonText}>Desactivar</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={style.smallButton} onPress={() => setUserNotification({ ...userNotification, spamHour: true })}>
                                <Text style={style.buttonText}>Activar</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ ...style.litleCard, width: "90%", paddingVertical: "3%" }}>
                    <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "45%", alignItems: "flex-start" }}>
                            <Text style={style.bigText}>Nuevo servicio</Text>
                            <Text style={{ ...style.mediumText, textAlign: "left" }}>Recibir un mensaje cuando un nuevo servicio sea cargado</Text>
                            {userNotification.spamService ? <Text style={style.smallText}>✔Activado</Text> : <Text style={style.smallText}>Desactivado</Text>}
                        </View>
                        {userNotification.spamService ?
                            <TouchableOpacity style={style.smallButton} onPress={() => setUserNotification({ ...userNotification, spamService: false })}>
                                <Text style={style.buttonText}>Desactivar</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={style.smallButton} onPress={() => setUserNotification({ ...userNotification, spamService: true })}>
                                <Text style={style.buttonText}>Activar</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>

                <TouchableOpacity style={style.mediumButton} onPress={changeNotifications}>
                    <Text style={style.buttonText}>Guardar Cambios</Text>
                </TouchableOpacity>


            </View>

            <ModalAlert
                isVisible={viewModal}
                onClose={hideModal}
                title="Perfecto!"
                message="Se han guardado los cambios"
                type="ok"
            />

        </View>
    );
};

export default UserOptions;