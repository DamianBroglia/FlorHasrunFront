import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getUserByIdAction } from '../../Redux/actions/userActions';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;


function Login() {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState("")
    const [userLastname, setUserLastname] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [isAlert, setIsAlert] = useState(false)
    // const [isWelcome, setIsWelcome] = useState(false)
    const [msjError, setMsjError] = useState("")
    const [disguisePassword, setDisguisePassword] = useState(true)


    const login = async () => {

        try {
            const user = await axios.put(`${API_URL}users/login`, { name: userName, lastname: userLastname, password: userPassword })

            if (user.data) {
                dispatch(getUserByIdAction(user.data.id))
                // setIsWelcome(true)
                setUserName("")
                setUserLastname("")
                setUserPassword("")
            }

        } catch (error) {
            setMsjError(error.response.data.error)
            setIsAlert(true)
        }
    }

    const hideAlert = () => {
        setIsAlert(false);
        // setIsWelcome(false)
    };


    return (
        <View style={{...style.baseContainer, justifyContent:"center"}}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <View style={{...style.fullWidthCard, width:"88%"}}>
                <Image style={style.imageHomeLogo} source={require("../../assets/LogoFlor.png")} />
                <View style={style.containerInput}>
                    <Text style={style.bigText}> Nombre: </Text>
                    <TextInput
                        style={style.loginInput}
                        placeholder='Ej: Damián'
                        onChangeText={name => setUserName(name.trim())}
                        defaultValue={userName}
                    />
                </View>

                <View style={style.containerInput}>
                    <Text style={style.bigText}> Apellido: </Text>
                    <TextInput
                        style={style.loginInput}
                        placeholder='Ej: Garcia'
                        onChangeText={lastname => setUserLastname(lastname.trim())}
                        defaultValue={userLastname}
                    />
                </View>

                <View style={style.containerInput}>
                    <Text style={style.bigText}> Contraseña: </Text>
                    <TextInput
                        style={style.loginInput}
                        secureTextEntry={disguisePassword}
                        placeholder='Ej: Damiangarcia123!!'
                        onChangeText={password => setUserPassword(password.trim())}
                        defaultValue={userPassword}
                    />
                    {disguisePassword ?
                        <TouchableOpacity style={style.eyeContainer} onPress={() => setDisguisePassword(false)}>
                            <Image style={style.eyeImage} source={require("../../assets/OjoCerrado.png")} />
                        </TouchableOpacity> :
                        <TouchableOpacity style={style.eyeContainer} onPress={() => setDisguisePassword(true)}>
                            <Image style={style.eyeImage} source={require("../../assets/OjoAbierto.png")} />
                        </TouchableOpacity>
                    }
                </View>

                <View style={{ marginVertical: 15 }}>
                    <TouchableOpacity style={style.mediumButton} onPress={login}>
                        <Text style={style.buttonText}> Ingresar </Text>
                    </TouchableOpacity>
                </View>

                <ModalAlert
                    isVisible={isAlert}
                    onClose={hideAlert}
                    title="Lo sentimos...!"
                    message={msjError}
                />

                {/* <ModalAlert
                    isVisible={isWelcome}
                    onClose={() => hideAlert()}
                    title="Hola!"
                    message="Bienvenid@ nuevamente"
                    type="ok"
                /> */}

            </View>
        </View>
    );
}


export default Login;