import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import { getAllUserAction, getUserByIdAction } from '../../Redux/actions/userActions';
import bcrypt from 'bcryptjs';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

// function Login({ navigation }) {
//     const dispatch = useDispatch()
//     const users = useSelector((state) => state.users.allUsers)
//     const [userName, setUserName] = useState("")
//     const [userLastname, setUserLastname] = useState("")
//     const [userPassword, setUserPassword] = useState("")
//     const [isAlert, setIsAlert] = useState(false)
//     const [isWelcome, setIsWelcome] = useState(false)
//     const [isPass, setIsPass] = useState(false)

//     useEffect(() => {
//         dispatch(getAllUserAction());
//     }, []);

//     const passwordOk = (password, dataBaseHash) => {
//         bcrypt.compare(password, dataBaseHash, (error, result) => {
//             if (error) {
//                 console.error('Error al comparar las contraseñas:', error);
//                 return;
//             }
//             if (result) {
//                 console.log('Contraseña válida. El usuario puede iniciar sesión.');
//                 return true
//             } else {
//                 console.log('Contraseña incorrecta. El usuario no puede iniciar sesión.');
//                 return false
//             }
//         });
//     }


//     const login = async () => {
//         dispatch(getAllUserAction());
//         try {
//             const userExists = users.find((e) => e.name === userName && e.lastname === userLastname)
//             if (userExists) {
//                 if (userExists.password === userPassword) {
//                     dispatch(getUserByIdAction(userExists.id))
//                     // Alert.alert(`Bienvenid@ nuevamente ${userExists.name}`)
//                     // navigation.navigate("Home")
//                     setIsWelcome(true)
//                     setUserName("")
//                     setUserLastname("")
//                     setUserPassword("")
//                     // bcrypt.compare(user.password, userExists.password, (error, result) => {
//                     //     if (error) {
//                     //         console.error('Error al comparar las contraseñas:', error);
//                     //         return;
//                     //     }
//                     //     if (result) {
//                     //         dispatch(getUserByIdAction(userExists.id))
//                     //         Alert.alert(`Bienvenid@ nuevamente ${userExists.name}`)
//                     //     } else {
//                     //         Alert.alert('Contraseña incorrecta.');
//                     //     }
//                     // });
//                 } else {
//                     // Alert.alert("Contraseña Incorrecta")
//                     setIsPass(true)
//                 }

//             } else {
//                 // Alert.alert(`No se encontraron usuarios con nombre: ${userName} y apellido: ${userLastname}`)
//                 setIsAlert(true)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const hideAlert = () => {
//         setIsAlert(false);
//         setIsPass(false)
//         setIsWelcome(false)

//     };

//     // const hideWelcome = () => {
//     //     setIsWelcome(false)
//     //     navigation.navigate("Home")
//     // }

//     return (
//         <View>
//             <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
//             <View style={style.cardUsersRegis}>
//                 <Image style={style.imageLogo} source={require("../../assets/LogoFlor.png")} />
//                 <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
//                     <Text style={style.titlePropForm}> Nombre: </Text>
//                     <TextInput
//                         style={style.inputText}
//                         placeholder='Ej: Damián'
//                         onChangeText={name => setUserName(name.trim())}
//                         defaultValue={userName}
//                     />
//                 </View>

//                 <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
//                     <Text style={style.titlePropForm}> Apellido: </Text>
//                     <TextInput
//                         style={style.inputText}
//                         placeholder='Ej: Garcia'
//                         onChangeText={lastname => setUserLastname(lastname.trim())}
//                         defaultValue={userLastname}
//                     />
//                 </View>

//                 <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
//                     <Text style={style.titlePropForm}> Contraseña: </Text>
//                     <TextInput
//                         style={style.inputText}
//                         placeholder='Ej: Damiangarcia123!!'
//                         onChangeText={password => setUserPassword(password.trim())}
//                         defaultValue={userPassword}
//                     />
//                 </View>

//                 <View style={{ marginVertical: 15 }}>
//                     <TouchableOpacity style={style.button} onPress={login}>
//                         <Text style={style.buttonText}> Ingresar </Text>
//                     </TouchableOpacity>
//                 </View>

//                 <ModalAlert
//                     isVisible={isAlert}
//                     onClose={hideAlert}
//                     title="Lo sentimos...!"
//                     message="No se encontraron usuarios con ese nombre y apellido"
//                 />

//                 <ModalAlert
//                     isVisible={isPass}
//                     onClose={hideAlert}
//                     title="Lo sentimos..."
//                     message="Contraseña Incorrecta"
//                 />

//                 <ModalAlert
//                     isVisible={isWelcome}
//                     onClose={hideAlert}
//                     title="Hola!"
//                     message="Bienvenid@ nuevamente"
//                 />

//             </View>
//         </View>
//     );
// }


// export default Login;

function Login({ navigation }) {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState("")
    const [userLastname, setUserLastname] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [isAlert, setIsAlert] = useState(false)
    const [isWelcome, setIsWelcome] = useState(false)
    const [msjError, setMsjError] = useState("")



    const login = async () => {

        try {
            const user = await axios.put(`${API_URL}users/login`, { name: userName, lastname: userLastname, password: userPassword })

            if (user) {
                dispatch(getUserByIdAction(user.data.id))
                setIsWelcome(true)
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
        setIsWelcome(false)

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
                        secureTextEntry={true}
                        placeholder='Ej: Damiangarcia123!!'
                        onChangeText={password => setUserPassword(password.trim())}
                        defaultValue={userPassword}
                    />
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

                <ModalAlert
                    isVisible={isWelcome}
                    onClose={hideAlert}
                    title="Hola!"
                    message="Bienvenid@ nuevamente"
                />

            </View>
        </View>
    );
}


export default Login;