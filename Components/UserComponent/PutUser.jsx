import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getUserByIdAction } from '../../Redux/actions/userActions';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

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
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <View style={style.fullWidthCard}>
                <Image style={{...style.imageHomeLogo, height:"25%", marginBottom:30}} source={require("../../assets/LogoFlor.png")} />

                <View style={{ alignItems: "flex-start", marginBottom: 15, width:"65%" }}>
                    <Text style={style.mediumText}> Celular: </Text>
                    <TextInput
                        style={style.loginInput}
                        placeholder='Ej: 1560707'
                        onChangeText={(celNumber) => setChangeUser({ ...changeUser, celNumber: celNumber })}
                        defaultValue={changeUser.ce}
                    />
                </View>

                <View style={{ alignItems: "flex-start", marginBottom: 15, width:"65%" }}>
                    <Text style={style.mediumText}> Contraseña: </Text>
                    <TextInput
                        style={style.loginInput}
                        placeholder='Ej: Damiangarcia123!!'
                        secureTextEntry={disguisePassword}
                        onChangeText={password => setChangeUser({ ...changeUser, password: password.trim() })}
                        defaultValue={changeUser.password}

                    />
                    {disguisePassword ?
                        <TouchableOpacity style={{position:"absolute", top:"50%", right:"5%"}} onPress={() => setDisguisePassword(false)}>
                            <Image style={style.eyeImage} source={require("../../assets/OjoCerrado.png")} />
                        </TouchableOpacity> 
                        :
                        <TouchableOpacity style={{position:"absolute", top:"50%", right:"5%"}} onPress={() => setDisguisePassword(true)}>
                            <Image style={style.eyeImage} source={require("../../assets/OjoAbierto.png")} />
                        </TouchableOpacity>
                    }
                </View>


                <View style={{...style.buttonsHorizontalContainer, width:"80%", marginVertical: 15 }}>
                    <TouchableOpacity style={style.smallButton} onPress={putChange}>
                        <Text style={style.buttonText}> Modificar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.smallButton} onPress={() => { navigation.navigate("Opciones De Usuario") }}>
                        <Text style={style.buttonText}> Volver </Text>
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
                    type="ok"
                />

            </View>
        </View>
    );
}


export default PutUser;