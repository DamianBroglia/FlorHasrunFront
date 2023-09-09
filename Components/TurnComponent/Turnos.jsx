import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SaveTurn from './SaveTurn';
import MyTurns from './MyTurns';
import CalendarScreen from "./CalendarScreen"


const Stack = createStackNavigator()

const Turnos = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Guardar Turno" component={SaveTurn} />
                <Stack.Screen name="Mis Turnos" component={MyTurns} />
                <Stack.Screen name="Elija una fecha" component={CalendarScreen} />
            </Stack.Navigator>
    );
};

export default Turnos;