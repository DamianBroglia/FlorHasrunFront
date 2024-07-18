import React, { useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllViewServi, getAllServi } from '../../Redux/actions/serviceActions';
import axios from "axios"
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;


const AllService = () => {
    const dispatch = useDispatch()
    const services = useSelector((state) => state.services.allService)
    const [viewModal, setViewModal] = useState(false)
    const restaurar = async (id) => {
        try {
            const newProduct = await axios.put(`${API_URL}products`, { productId: id, view: true })
            if (newProduct.data) {
                dispatch(getAllViewServi())
                dispatch(getAllServi())
                setViewModal(true)
            }
        } catch (error) {
            console.log(error);
        }

    }
    const hideAlert = () => {
        setViewModal(false)
    }

    return (
        <View>
            {services.length ?
                <FlatList
                    data={services}
                    renderItem={({ item }) =>
                        item.name !== "Turno Bloqueado" && item.name !== "Dia Bloqueado" &&
                        <View style={style.cardService}>
                            <Text style={style.titleServ}> {item.name} </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={style.imageServ} source={{ uri: item.image[0] }} />
                                <View>
                                    <Image style={style.imageServ2} source={{ uri: item.image[1] }} />
                                    <Image style={style.imageServ2} source={{ uri: item.image[2] }} />
                                </View>
                            </View>
                            <Text style={style.textPutSer}> {item.minimalDescription} </Text>
                            {item.view === false ?
                                <View>
                                    <TouchableOpacity style={style.button} onPress={() => restaurar(item.id)}>

                                        <Text style={style.buttonText}> Restaurar </Text>

                                    </TouchableOpacity>
                                    <Image style={style.imageDelete} source={require("../../assets/Eliminado.png")} />
                                </View>
                                :
                                null
                            }

                        </View>
                    }
                /> :
                <Text style={{ textAlign: "center", fontSize: 20 }}> No hay servicios para mostrar</Text>
            }

            <ModalAlert
                isVisible={viewModal}
                onClose={() => hideAlert()}
                title="Todo OK!"
                message="Servicio restaurado con exito"
                type="ok"
            />
        </View>

    );
};


export default AllService;