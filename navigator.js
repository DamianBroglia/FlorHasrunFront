// import React from 'react';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './Redux/store';

// export default function Main() {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// }

import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Products from "./Components/ProductComponent/Products";
import Home from "./Components/Home";
import Turnos from "./Components/TurnComponent/Turnos";
import Login from "./Components/UserComponent/Login";
import Register from "./Components/UserComponent/Register";
import Admin from "./Components/AdminComponent/Admin";
import User from "./Components/UserComponent/User";
import { useSelector } from "react-redux";
import UserNavigator from "./Components/UserComponent/UserNavigator";


const Drawer = createDrawerNavigator();

export default function Navigation() {

    const user = useSelector((state) => state.users.user)

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "peachpuff"
                    }
                }}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Servicios" component={Products} />
                <Drawer.Screen name="Turnos" component={Turnos} />
                {user.id ? <Drawer.Screen name="Usuario" component={UserNavigator} /> : <Drawer.Screen name="Entrar" component={Login} /> }
                {!user.id && <Drawer.Screen name="Registrarse" component={Register} />}    
                {user.name === "Flor" && user.lastname === "Hasrun" ? <Drawer.Screen name="Administrador" component={Admin} /> : null}

            </Drawer.Navigator>

        </NavigationContainer>
    );
}


