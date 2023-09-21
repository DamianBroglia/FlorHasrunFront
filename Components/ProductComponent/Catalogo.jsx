import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllViewServi, getAllServi } from '../../Redux/actions/serviceActions';
import { getServiceId } from '../../Redux/actions/serviceActions';
import { style } from '../Styles';


const Catalogo = ({ navigation }) => {
    const dispatch = useDispatch()
    const services = useSelector((state) => state.services.viewService)
    const user = useSelector((state) => state.users.user)
    const [viewMore, setViewMore] = useState(null)

    useEffect(() => {
        dispatch(getAllViewServi());
    }, []);

    const seeMore = (id) => {
        dispatch(getServiceId(id))
        setViewMore(id)
    }

    const seeAllService = () => {
        dispatch(getAllServi())
        navigation.navigate("Todos los servicios")
    }

    return (

        <View >
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />


            {services.length ?
                <FlatList
                    data={services}
                    ListHeaderComponent={
                        <View style={{ alignItems: "center" }}>
                            {
                                user.name === "Flor" && user.lastname === "Hasrun" ?
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Crear Servicio")}>
                                            <Text style={style.buttonText}> Crear Servicio</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.button} onPress={seeAllService}>
                                            <Text style={style.buttonText}> Ver todos los Servicios</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    }
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
                            {viewMore === item.id ?
                                <View>
                                    <Text style={style.textPutSer}> {item.description} </Text>
                                    <Text style={style.textPutSer}> ${item.price} </Text>
                                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Detalle")}>
                                        <Text style={style.buttonText}> Ir al detalle </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.button} onPress={() => setViewMore(null)}>
                                        <Text style={style.buttonText}> Ver menos </Text>
                                    </TouchableOpacity>
                                </View> :
                                <TouchableOpacity style={style.button} onPress={() => seeMore(item.id)}>
                                    <Text style={style.buttonText}> Ver mas </Text>
                                </TouchableOpacity>
                            }

                        </View>
                    }
                /> :
                <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "800", marginTop: 15 }}> No hay servicios para mostrar</Text>
            }
        </View>

    );
};


export default Catalogo;