import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getUserByIdAction } from '../../Redux/actions/userActions';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;


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
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <View style={style.cardUsersRegis}>
                <Image style={style.imageLogo} source={require("../../assets/LogoFlor.png")} />
                <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
                    <Text style={style.titlePropForm}> Nombre: </Text>
                    <TextInput
                        style={style.inputText}
                        placeholder='Ej: Damián'
                        onChangeText={name => setUserName(name.trim())}
                        defaultValue={userName}
                    />
                </View>

                <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
                    <Text style={style.titlePropForm}> Apellido: </Text>
                    <TextInput
                        style={style.inputText}
                        placeholder='Ej: Garcia'
                        onChangeText={lastname => setUserLastname(lastname.trim())}
                        defaultValue={userLastname}
                    />
                </View>

                <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
                    <Text style={style.titlePropForm}> Contraseña: </Text>
                    <TextInput
                        style={style.inputText}
                        secureTextEntry={disguisePassword}
                        placeholder='Ej: Damiangarcia123!!'
                        onChangeText={password => setUserPassword(password.trim())}
                        defaultValue={userPassword}
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
                    <TouchableOpacity style={style.button} onPress={login}>
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