import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Catalogo from './Catalogo';
import ProductDetail from './ProductDetail';
import FormProduct from './FormProduct';
import PutProduct from './putProduct';
import AllService from './AllService';
import CalendarScreen from '../TurnComponent/CalendarScreen';

const Stack = createStackNavigator()

const Products = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Catalogo" component={Catalogo} />
                <Stack.Screen name="Detalle" component={ProductDetail} />
                <Stack.Screen name="Crear Servicio" component={FormProduct} />
                <Stack.Screen name="Editar Servicio" component={PutProduct} />
                <Stack.Screen name="Todos los servicios" component={AllService} />
                <Stack.Screen name="Elija una fecha" component={CalendarScreen} />
            </Stack.Navigator>
    );
};

export default Products;