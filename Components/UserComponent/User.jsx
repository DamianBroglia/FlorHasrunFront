import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { clearUser } from '../../Redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { style } from '../Styles';



const User = ({ navigation }) => {
    const dispatch = useDispatch()
    const [areYouSure, setAreYouSure] = useState(false)
    const user = useSelector((state) => state.users.user)

    const logOut = () => {
        dispatch(clearUser())
        navigation.navigate("Home")
    }

    return (
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <View style={style.cardUsers}>
                <Text style={style.titleServ}>{user.name} {user.lastname}</Text>
                <Text style={style.textInfo}>{user.celNumber}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Usuario.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Modificar Usuario")}>
                        <Text style={style.buttonText}>Modificar</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Calendario.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Mis Turnos")}>
                        <Text style={style.buttonText}>Mis Turnos</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ flexDirection: "row" }}>

                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Configuraciones.png")} />
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Opciones")}>
                        <Text style={style.buttonText}>Opciones</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/FlechaIzquierda.png")} />
                    <TouchableOpacity style={style.button} onPress={() => { setAreYouSure(true) }}>
                        <Text style={style.buttonText}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {areYouSure ?
                <View style={style.cardUsers}>
                    <Text style={style.textInfo}> Seguro que desea salir?</Text>
                    <View style={{ flexDirection: "row-reverse" }}>
                        <TouchableOpacity style={style.button} onPress={logOut}>
                            <Text style={style.buttonText}> Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={() => { setAreYouSure(false) }}>
                            <Text style={style.buttonText}> Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }
        </View>
    );
};

export default User;