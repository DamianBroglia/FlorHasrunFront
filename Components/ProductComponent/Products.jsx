import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {Image} from 'react-native';
import Catalogo from './Catalogo';
import ProductDetail from './ProductDetail';
import FormProduct from './FormProduct';
import PutProduct from './putProduct';
import AllService from './AllService';
import CalendarScreen from '../TurnComponent/CalendarScreen';
import { style } from "../Styles";

const Stack = createStackNavigator()

const Products = () => {
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
            <Stack.Screen name="Catalogo" component={Catalogo}
                options={{
                    title: 'Catalogo',
 
                }} />
            <Stack.Screen name="Detalle" component={ProductDetail} />
            <Stack.Screen name="Crear Servicio" component={FormProduct} />
            <Stack.Screen name="Editar Servicio" component={PutProduct} />
            <Stack.Screen name="Todos los servicios" component={AllService} />
            <Stack.Screen name="Elija una fecha" component={CalendarScreen} />
        </Stack.Navigator>
    );
};

export default Products;