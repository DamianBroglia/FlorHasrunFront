import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Button, TouchableOpacity, FlatList, ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllViewServi } from '../../Redux/actions/serviceActions';
import axios from "axios"
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

const ProductDetail = ({ navigation }) => {
    const service = useSelector((state) => state.services.detail)
    const user = useSelector((state) => state.users.user)
    const [viewModalDelete, setViewModalDelete] = useState(false)
    const dispatch = useDispatch()
    const countImage = [...service.image]
   

    const deleteService = async (id) => {
        const newProduct = await axios.put(`${API_URL}products`, { productId: id, view: false })
        if (newProduct.data) {
            dispatch(getAllViewServi())
            setViewModalDelete(true)
        }
    }

    const hideAlert = () => {
        setViewModalDelete(false)
        navigation.navigate("Servicios")
    }

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
                    {!user.id ? <Text>Registrate para guardar un turno para este servicio!</Text> :
                        <View>
                            {user.vip || user.credits > 1 ?
                                <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Elija una fecha")}>
                                    <Text style={style.buttonText}> Guardar Turno </Text>
                                </TouchableOpacity> :
                                <Text>No tienes suficientes creditos para guardar un turno!</Text>
                            }
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
                title="Servicio Eliminado!"
                message="Se ha eliminado el servicio con exito"
                type="ok"
            />
        </View>
    );
};



export default ProductDetail;