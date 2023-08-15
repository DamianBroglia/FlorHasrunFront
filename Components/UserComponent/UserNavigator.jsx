import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MyTurns from '../TurnComponent/MyTurns';
import PutUser from './PutUser';
import User from './User';
import UserOptions from './UserOptions';

const Stack = createStackNavigator()

const UserNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Opciones De Usuario" component={User} />
                <Stack.Screen name="Modificar Usuario" component={PutUser} />
                <Stack.Screen name="Mis Turnos" component={MyTurns} />
                <Stack.Screen name="Opciones" component={UserOptions} />
            </Stack.Navigator>
    );
};

export default UserNavigator;