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
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <ScrollView>
                <View style={style.cardService}>
                    <Text style={style.title}>{service.name}</Text>
                    <FlatList
                        horizontal
                        data={countImage}
                        renderItem={({ item }) =>
                            <Image style={style.imageIcons} source={{ uri: item }} />
                        } />
                    <Text style={style.bigText}>{service.minimalDescription}</Text>
                    <Text style={style.mediumText}>{service.description}</Text>
                    <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-around", marginVertical: 15 }}>
                        <View style={style.detailServContainer}>
                            <Text style={style.bigText}>Duración</Text>
                            <Text style={style.title}>{service.duration}</Text>
                            <Text style={{ ...style.smallText, marginBottom: 8 }}>minutos</Text>
                        </View>
                        <View style={style.detailServContainer}>
                            <Text style={style.bigText}>Precio</Text>
                            <Text style={style.title}>$ {service.price}</Text>
                            <Text style={{ ...style.smallText, marginBottom: 8 }}>pesos argentinos</Text>
                        </View>
                    </View>
                    {!user.id ?
                        <Text style={{...style.smallText, marginVertical:10}}>Registrate para guardar un turno para este servicio!</Text>
                        :
                        <View style={{ marginBottom: 10 }}>
                            {user.vip || user.credits > 1 ?
                                <TouchableOpacity style={style.bigButton} onPress={() => navigation.navigate("Elija una fecha")}>
                                    <Text style={style.buttonText}> Guardar Turno </Text>
                                </TouchableOpacity>
                                :
                                <Text style={style.smallText}>No tienes suficientes creditos para guardar un turno!</Text>
                            }
                        </View>
                    }
                    {user.name === "Flor" && user.lastname === "Hasrun" ?
                        <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-around" }}>
                            <TouchableOpacity style={style.smallButton} onPress={() => deleteService(service.id)}>
                                <Text style={style.buttonText}> Eliminar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.smallButton} onPress={() => navigation.navigate("Editar Servicio")}>
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