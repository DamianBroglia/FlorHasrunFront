import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Agenda from './Agenda';
import AdminControl from './AdminControl';
import AdminData from './AdminData';
import UsersList from './UsersList';
import FormProduct from '../ProductComponent/FormProduct';
import UserTurns from './UserTurns';
import ServiceControl from './ServiceControl';
import AllService from '../ProductComponent/AllService';


const Stack = createStackNavigator()

const Admin = () => {
    return (
        <Stack.Navigator>
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