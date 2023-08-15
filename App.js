// import "react-native-gesture-handler";
// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// import Products from "./Components/ProductComponent/Products";
// import Home from "./Components/Home";
// import Turnos from "./Components/TurnComponent/Turnos";
// import Agenda from "./Components/AdminComponent/Agenda";
// import Login from "./Components/UserComponent/Login";
// import Register from "./Components/UserComponent/Register";
// import UsersList from "./Components/AdminComponent/UsersList";
// import { Provider } from 'react-redux';
// import store from './Redux/store'; 



// const Drawer = createDrawerNavigator();

// export default function App() {


//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Drawer.Navigator initialRouteName="home"
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: "peachpuff"
//             }
//           }}>
//           <Drawer.Screen name="Home" component={Home} />
//           <Drawer.Screen name="Productos" component={Products} />
//           <Drawer.Screen name="Turnos" component={Turnos} />
//           <Drawer.Screen name="Agenda" component={Agenda} />
//           <Drawer.Screen name="Entrar" component={Login} />
//           <Drawer.Screen name="Registrarse" component={Register} />
//           <Drawer.Screen name="Usuarios" component={UsersList} />
//         </Drawer.Navigator>

//       </NavigationContainer>
//     </Provider>
//   );
// }



import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigator';
import store from './Redux/store';

export default function Main() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}