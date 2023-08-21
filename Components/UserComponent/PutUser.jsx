import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import { getAllUserAction, getUserByIdAction } from '../../Redux/actions/userActions';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

function PutUser({ navigation }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    const [changeUser, setChangeUser] = useState({
        userId: user.id
    })
    const [isAlert, setIsAlert] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [disguisePassword, setDisguisePassword] = useState(true)

    const putChange = async () => {
        try {
            const userChanged = await axios.put(`${API_URL}users`, changeUser)
            if (userChanged.data) {
                dispatch(getUserByIdAction(user.id))
                setIsOk(true)
            }
        } catch (error) {
            console.log(error);
        }

    }

    const hideAlert = () => {
        setIsOk(false)
        setIsAlert(false)
    }



    return (
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <View style={style.cardUsersRegis}>
                <Image style={style.imageLogo} source={require("../../assets/LogoFlor.png")} />

                <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
                    <Text style={style.titlePropForm}> Celular: </Text>
                    <TextInput
                        style={style.inputText}
                        placeholder='Ej: 1560707'
                        onChangeText={(celNumber) => setChangeUser({ ...changeUser, celNumber: celNumber })}
                        defaultValue={changeUser.ce}
                    />
                </View>

                <View style={{ alignItems: "flex-start", marginBottom: 3 }}>
                    <Text style={style.titlePropForm}> Contraseña: </Text>
                    <TextInput
                        style={style.inputText}
                        placeholder='Ej: Damiangarcia123!!'
                        secureTextEntry={disguisePassword}
                        onChangeText={password => setChangeUser({ ...changeUser, password: password.trim() })}
                        defaultValue={changeUser.password}

                    />
                    {disguisePassword ?
                        <TouchableOpacity onPress={() => setDisguisePassword(false)}>
                            <Image style={style.viewPassword} source={require("../../assets/OjoCerrado.png")} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setDisguisePassword(true)}>
                             <Image style={style.viewPassword} source={require("../../assets/OjoAbierto.png")} />
                        </TouchableOpacity>
                    }
                </View>


                <View style={{ marginVertical: 15 }}>
                    <TouchableOpacity style={style.button} onPress={putChange}>
                        <Text style={style.buttonText}> Modificar </Text>
                    </TouchableOpacity>
                </View>

                <ModalAlert
                    isVisible={isAlert}
                    onClose={hideAlert}
                    title="Lo sentimos...!"
                    message="No se encontraron usuarios con ese nombre y apellido"
                />

                <ModalAlert
                    isVisible={isOk}
                    onClose={hideAlert}
                    title="Bien!"
                    message="Usuario modificado con exito"
                />

            </View>
        </View>
    );
}


export default PutUser;