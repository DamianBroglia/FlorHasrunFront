import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { style } from '../Styles';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByIdAction } from '../../Redux/actions/userActions';
import axios from "axios"
import { ModalAlert } from '../ModalAlert';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

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
            if(userChanged.data){
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
        <View style={style.cardUsers}>
            <Text style={style.titleServ}>Notificaciones </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                <View style={{ alignItems: "flex-start", width: 170 }}>
                    <Text style={style.textNotification}>Un día antes</Text>
                    <Text style={style.msjNotification}>Recibir un mensaje un</Text>
                    <Text style={style.msjNotification}>dia antes del turno</Text>
                    {userNotification.spamDay ? <Text style={style.textgreen}>✔Activado</Text> : <Text style={style.textRed}>Desactivado</Text>}
                </View>
                {userNotification.spamDay ?
                    <TouchableOpacity style={style.buttonNotification} onPress={() => setUserNotification({ ...userNotification, spamDay: false })}>
                        <Text style={style.buttonText}>Desactivar</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={style.buttonNotifNotSelect} onPress={() => setUserNotification({ ...userNotification, spamDay: true })}>
                        <Text style={style.buttonText}>Activar</Text>
                    </TouchableOpacity>
                }

            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                <View style={{ alignItems: "flex-start", width: 170 }}>
                    <Text style={style.textNotification}>Una hora antes</Text>
                    <Text style={style.msjNotification}>Recibir un mensaje una</Text>
                    <Text style={style.msjNotification}>hora antes del turno</Text>
                    {userNotification.spamHour ? <Text style={style.textgreen}>✔Activado</Text> : <Text style={style.textRed}>Desactivado</Text>}
                </View>
                {userNotification.spamHour ?
                    <TouchableOpacity style={style.buttonNotification} onPress={() => setUserNotification({ ...userNotification, spamHour: false })}>
                        <Text style={style.buttonText}>Desactivar</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={style.buttonNotifNotSelect} onPress={() => setUserNotification({ ...userNotification, spamHour: true })}>
                        <Text style={style.buttonText}>Activar</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 30 }}>
                <View style={{ alignItems: "flex-start", width: 170 }}>
                    <Text style={style.textNotification}>Por nuevo servicio</Text>
                    <Text style={style.msjNotification}>Recibir un mensaje cuando</Text>
                    <Text style={style.msjNotification}>un nuevo servicio sea cargado</Text>
                    {userNotification.spamService ? <Text style={style.textgreen}>✔Activado</Text> : <Text style={style.textRed}>Desactivado</Text>}
                </View>
                {userNotification.spamService ?
                    <TouchableOpacity style={style.buttonNotification} onPress={() => setUserNotification({ ...userNotification, spamService: false })}>
                        <Text style={style.buttonText}>Desactivar</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={style.buttonNotifNotSelect} onPress={() => setUserNotification({ ...userNotification, spamService: true })}>
                        <Text style={style.buttonText}>Activar</Text>
                    </TouchableOpacity>
                }
            </View>

            <View style={{ marginBottom: 30 }}>
                <TouchableOpacity style={style.button} onPress={changeNotifications}>
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