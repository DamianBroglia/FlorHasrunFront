import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import Agenda from './Agenda';
import AdminControl from './AdminControl';
import AdminData from './AdminData';
import UsersList from './UsersList';
import FormProduct from '../ProductComponent/FormProduct';
import UserTurns from './UserTurns';
import ServiceControl from './ServiceControl';
import AllService from '../ProductComponent/AllService';
import { style } from '../Styles';


const Stack = createStackNavigator()

const Admin = () => {
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
            <Stack.Screen name="Acciones del administrador" component={AdminControl} />
            <Stack.Screen name="Agenda" component={Agenda} />
            <Stack.Screen name="Estadisticas" component={AdminData} />
            <Stack.Screen name="Usuarios" component={UsersList} />
            <Stack.Screen name="Crear Servicio" component={FormProduct} />
            <Stack.Screen name="Turnos del Cliente" component={UserTurns} />
            <Stack.Screen name="Administrar Servicios" component={ServiceControl} />
            <Stack.Screen name="Todos los servicios" component={AllService} />
        </Stack.Navigator>
    );
};

export default Admin;