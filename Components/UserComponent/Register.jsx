import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from "axios"
import { getUserByIdAction, getAllUserAction } from '../../Redux/actions/userActions';
import { validateUser } from './validateUser';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

const Register = () => {
    const [newUserName, setNewUserName] = useState("")
    const [newUserLastname, setNewUserLastname] = useState("")
    const [newUserCelNumber, setNewUserCelNumber] = useState("")
    const [newUserPassword, setNewUserPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [disguisePassword, setDisguisePassword] = useState(true)

    useEffect(() => {
        const errorSet = validateUser({ name: newUserName, lastname: newUserLastname, celNumber: newUserCelNumber, password: newUserPassword })
        setErrors(errorSet)
    }, [newUserName, newUserLastname, newUserCelNumber, newUserPassword])

    const dispatch = useDispatch()

    const postNewUser = async () => {
        const { name,
            lastname,
            password,
            celNumber } = errors

        if (!name && !lastname && !password && !celNumber) {
            try {
                const user = await axios.post(`${API_URL}users`, { name: newUserName, lastname: newUserLastname, celNumber: newUserCelNumber, password: newUserPassword })
                if (user.data) {
                    const infoUser = await axios.post(`${API_URL}infoUser`, { userId: user.data.id })
                    if (infoUser.data) {
                        dispatch(getUserByIdAction(user.data.id))
                        dispatch(getAllUserAction())
                        setNewUserName("")
                        setNewUserLastname("")
                        setNewUserCelNumber("")
                        setNewUserPassword("")
                        const jsonValue = JSON.stringify(infoUser.data);
                        await AsyncStorage.setItem('@user_data', jsonValue);
                    }
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            setIsAlertVisible(true)
        }
    }

    const hideAlert = () => {
        setIsAlertVisible(false);
    };

    return (
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />

            <Image style={style.imageHomeLogo} source={require("../../assets/LogoFlor.png")} />

            <View style={{ alignItems: "flex-start", width:"70%" }}>
                <Text style={style.bigText}> Nombre: </Text>
                <TextInput
                    style={style.loginInput}
                    placeholder='Ej: Damián'
                    onChangeText={name => setNewUserName(name.trim())}
                    defaultValue={newUserName}
                />
            </View>

            {errors.name ? <Text style={style.smallText}>{errors.name}</Text> : <Text style={style.smallText}>✔Nombre</Text>}

            <View style={{ alignItems: "flex-start", width:"70%", marginTop:"3%" }}>
                <Text style={style.bigText}> Apellido: </Text>
                <TextInput
                    style={style.loginInput}
                    placeholder='Ej: Garcia'
                    onChangeText={lastname => setNewUserLastname(lastname.trim())}
                    defaultValue={newUserLastname}
                />
            </View>
            {errors.lastname ? <Text style={style.smallText}>{errors.lastname}</Text> : <Text style={style.smallText}>✔Apellido</Text>}

            <View style={{ alignItems: "flex-start", width:"70%", marginTop:"3%" }}>
                <Text style={style.bigText}> Número de celular: </Text>
                <TextInput
                    style={style.loginInput}
                    placeholder='Número de celular'
                    onChangeText={celNumber => setNewUserCelNumber(celNumber)}
                    defaultValue={newUserCelNumber}
                />
            </View>
            {errors.celNumber ? <Text style={style.smallText}>{errors.celNumber}</Text> : <Text style={style.smallText}>✔Número de celular</Text>}

            <View style={{ alignItems: "flex-start", width:"70%", marginTop:"3%"}}>
                <Text style={style.bigText}> Contraseña: </Text>
                <TextInput
                    style={style.loginInput}
                    secureTextEntry={disguisePassword}
                    placeholder='Ej: Damiangarcia123!!'
                    onChangeText={password => setNewUserPassword(password.trim())}
                    defaultValue={newUserPassword}
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
            {errors.password ? <Text style={style.smallText}>{errors.password}</Text> : <Text style={style.smallText}>✔Contraseña</Text>}

            <View style={{ marginVertical: "4%" }}>
                <TouchableOpacity style={style.smallButton} onPress={postNewUser}>
                    <Text style={style.buttonText}> Ingresar </Text>
                </TouchableOpacity>
            </View>
            <ModalAlert
                isVisible={isAlertVisible}
                onClose={hideAlert}
                title="Lo sentimos..."
                message="Faltan requisitos para registrarse"
            />
        </View>

    );
};



export default Register;