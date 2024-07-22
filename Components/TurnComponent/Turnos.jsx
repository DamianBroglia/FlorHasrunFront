import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, View, Image, Text, Linking, ImageBackground } from 'react-native';
import SaveTurn from './SaveTurn';
import MyTurns from './MyTurns';
import CalendarScreen from "./CalendarScreen"
import { style } from '../Styles';



const Stack = createStackNavigator()

const Turnos = () => {
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
                <Stack.Screen name="Guardar Turno" component={SaveTurn} />
                <Stack.Screen name="Mis Turnos" component={MyTurns} />
                <Stack.Screen name="Elija una fecha" component={CalendarScreen} />
            </Stack.Navigator>
    );
};

export default Turnos;