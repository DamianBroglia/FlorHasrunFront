import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from "axios"
import { getUserByIdAction, getAllUserAction } from '../../Redux/actions/userActions';
import { validateUser } from './validateUser';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;


const Register = () => {
    const [newUserName, setNewUserName] = useState("")
    const [newUserLastname, setNewUserLastname] = useState("")
    const [newUserCelNumber, setNewUserCelNumber] = useState("")
    const [newUserPassword, setNewUserPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [isWelcomeVis, setIsWelcomeVis] = useState(false)
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
                    const infoUser = await axios.post(`${API_URL}infoUser` , {userId: user.data.id})
                    if(infoUser.data){
                        setIsWelcomeVis(true)
                        dispatch(getUserByIdAction(user.data.id))
                        dispatch(getAllUserAction())
                        setNewUserName("")
                        setNewUserLastname("")
                        setNewUserCelNumber("")
                        setNewUserPassword("")
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

    const hideWelcome = () => {
        setIsWelcomeVis(false)
        // navigation.navigate("Home")
    }

    return (
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <View style={style.cardUsersRegis}>
                <Image style={style.imageLogo} source={require("../../assets/LogoFlor.png")} />

                <View style={{ alignItems: "flex-start" }}>
                    <Text style={style.titlePropForm}> Nombre: </Text>
                    <TextInput
                        style={style.inputText}
                        placeholder='Ej: Damián'
                        onChangeText={name => setNewUserName(name.trim())}
                        defaultValue={newUserName}
                    />
                </View>

                {errors.name ? <Text style={style.error}>{errors.name}</Text> : <Text style={style.ok}>✔Nombre</Text>}

                <View style={{ alignItems: "flex-start", marginTop: 9 }}>
                    <Text style={style.titlePropForm}> Apellido: </Text>
                    <TextInput
                        style={style.inputText}
                        placeholder='Ej: Garcia'
                        onChangeText={lastname => setNewUserLastname(lastname.trim())}
                        defaultValue={newUserLastname}
                    />
                </View>
                {errors.lastname ? <Text style={style.error}>{errors.lastname}</Text> : <Text style={style.ok}>✔Apellido</Text>}

                <View style={{ alignItems: "flex-start", marginTop: 9 }}>
                    <Text style={style.titlePropForm}> Número de celular: </Text>
                    <TextInput
                        style={style.inputText}
                        placeholder='Número de celular'
                        onChangeText={celNumber => setNewUserCelNumber(celNumber)}
                        defaultValue={newUserCelNumber}
                    />
                </View>
                {errors.celNumber ? <Text style={style.error}>{errors.celNumber}</Text> : <Text style={style.ok}>✔Número de celular</Text>}

                <View style={{ alignItems: "flex-start", marginTop: 9 }}>
                    <Text style={style.titlePropForm}> Contraseña: </Text>
                    <TextInput
                        style={style.inputText}
                        secureTextEntry={disguisePassword}
                        placeholder='Ej: Damiangarcia123!!'
                        onChangeText={password => setNewUserPassword(password.trim())}
                        defaultValue={newUserPassword}
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
                {errors.password ? <Text style={style.error}>{errors.password}</Text> : <Text style={style.ok}>✔Contraseña</Text>}

                <View style={{ marginVertical: 15 }}>
                    <TouchableOpacity style={style.button} onPress={postNewUser}>
                        <Text style={style.buttonText}> Ingresar </Text>
                    </TouchableOpacity>
                </View>
                <ModalAlert
                    isVisible={isAlertVisible}
                    onClose={hideAlert}
                    title="Lo sentimos..."
                    message="Faltan requisitos para registrarse"
                />
                <ModalAlert
                    isVisible={isWelcomeVis}
                    onClose={hideWelcome}
                    title="Bienvenid@!"
                    message="App oficial de Flor Hasrun"
                    type="ok"
                />
            </View>
        </View>
    );
};



export default Register;