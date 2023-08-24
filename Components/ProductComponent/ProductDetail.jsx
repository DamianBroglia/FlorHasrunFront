import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TouchableOpacity, FlatList, ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllViewServi } from '../../Redux/actions/serviceActions';
import axios from "axios"
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;


const ProductDetail = ({ navigation }) => {
    const service = useSelector((state) => state.services.detail)
    const user = useSelector((state) => state.users.user)
    const [viewModalDelete, setViewModalDelete] = useState(false)
    // const [numImg, setNumImg] = useState(0)
    const dispatch = useDispatch()
    const countImage = [...service.image]

    const deleteService = async (id) => {
        const newProduct = await axios.put(`${API_URL}products`, { productId: id, view: false })
        if (newProduct.data) {
            dispatch(getAllViewServi())
            // Alert.alert("Servicio eliminado con exito")
            setViewModalDelete(true)
            // navigation.navigate("Servicios")
        }
    }

    const hideAlert = () => {
        setViewModalDelete(false)
        navigation.navigate("Servicios")
    }
    // const handleImageRight = () => {
    //     if (numImg === countImage.length - 1) {
    //         setNumImg(0)
    //     } else {
    //         setNumImg(numImg + 1)
    //     }
    // }

    // const handleImageLeft = () => {
    //     if (numImg === 0) {
    //         setNumImg(countImage.length - 1)
    //     } else {
    //         setNumImg(numImg - 1)
    //     }
    // }

    return (
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <ScrollView>
                <View style={style.cardService}>
                    <Text style={style.titleServ}>{service.name}</Text>

                    <FlatList
                        horizontal
                        data={countImage}
                        renderItem={({ item }) =>
                            <Image style={style.imageDetail} source={{ uri: item }} />
                        } />
                    <Text style={style.textInfo}>{service.minimalDescription}</Text>
                    <Text style={style.textPutSer}>{service.description}</Text>
                    <Text style={style.textInfo}>Duración aproximada: {service.duration} minutos</Text>
                    <Text style={style.priceServ}>$ {service.price}</Text>
                    {user.id ?
                        <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Elija una fecha")}>
                            <Text style={style.buttonText}> Guardar Turno </Text>
                        </TouchableOpacity> :
                        <View>
                            <TouchableOpacity style={style.buttonNoSelect}>
                                <Text style={style.buttonText}> Guardar Turno </Text>
                            </TouchableOpacity>
                            <Text>Registrate para sacar un turno para este servicio!</Text>
                        </View>

                    }
                    {user.name === "Flor" && user.lastname === "Hasrun" ?
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={style.button} onPress={() => deleteService(service.id)}>
                                <Text style={style.buttonText}> Eliminar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Editar Servicio")}>
                                <Text style={style.buttonText}> Modificar </Text>
                            </TouchableOpacity>
                        </View> : null
                    }

                </View>
            </ScrollView>
            
            <ModalAlert
                isVisible={viewModalDelete}
                onClose={() => hideAlert()}
                title="Todo OK!"
                message="Servicio eliminado con exito"
                type="ok"
            />
        </View>
    );
};



export default ProductDetail;