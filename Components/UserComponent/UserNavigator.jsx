import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import MyTurns from '../TurnComponent/MyTurns';
import PutUser from './PutUser';
import User from './User';
import UserOptions from './UserOptions';
import { style } from '../Styles';


const Stack = createStackNavigator()

const UserNavigator = () => {
    return (
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "rgb(47,44,54)",
                },
                headerTintColor: "rgb(203,171,148)",
                headerTitleAlign: 'center',
                headerRight: () => (
                    <Image style={style.imageStack} source={require("../../assets/FloresD.png")} />
                ),
                headerLeft: () => (
                    <Image style={style.imageStackLeft} source={require("../../assets/FloresD.png")} />
                ),
            }}>
                <Stack.Screen name="Opciones De Usuario" component={User} />
                <Stack.Screen name="Modificar Usuario" component={PutUser} />
                <Stack.Screen name="Mis Turnos" component={MyTurns} />
                <Stack.Screen name="Opciones" component={UserOptions} />
            </Stack.Navigator>
    );
};

export default UserNavigator;