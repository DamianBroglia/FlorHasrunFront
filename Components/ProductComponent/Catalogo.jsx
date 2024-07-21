import React, { useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
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

        <View style={{ alignItems: "center", width: "100%", height: "100%" }} >
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />


            {services.length ?
                <FlatList
                    data={services}
                    style={style.flatCatalogo}
                    ListHeaderComponent={
                        <View style={{ alignItems: "center" }}>
                            {
                                user.name === "Flor" && user.lastname === "Hasrun" ?
                                    <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-around", width: "94%" }}>
                                        <TouchableOpacity style={style.buttonMedium} onPress={() => navigation.navigate("Crear Servicio")}>
                                            <Text style={style.newbuttonText}> Crear Servicio</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.buttonMedium} onPress={seeAllService}>
                                            <Text style={style.newbuttonText}> Ver todos </Text>
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
                            <Text style={style.titleWelcome}> {item.name} </Text>
                            <View style={style.imageContainerServ}>
                                <Image style={style.imageServ} source={{ uri: item.image[0] }} />
                                <View style={{ width: "34%", alignItems: "flex-end", justifyContent: "space-between" }}>
                                    <Image style={style.imageServ2} source={{ uri: item.image[1] }} />
                                    <Image style={style.imageServ2} source={{ uri: item.image[2] }} />
                                </View>
                            </View>
                            <Text style={{ ...style.bigText, marginBottom: 10 }}> {item.minimalDescription} </Text>
                            {viewMore === item.id ?
                                <View style={{width:"100%", alignItems:"center"}}>
                                    <Text style={style.mediumText}> {item.description} </Text>
                                    <Text style={{ ...style.bigText, marginVertical: 8 }}> ${item.price} </Text>
                                    <View style={{flexDirection:"row", width:"98%", justifyContent:"space-around"}}>
                                        <TouchableOpacity style={style.buttonAlert} onPress={() => setViewMore(null)}>
                                            <Text style={style.newbuttonText}> Ver menos </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.buttonAlert} onPress={() => navigation.navigate("Detalle")}>
                                            <Text style={style.newbuttonText}> Detalle </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> :
                                <TouchableOpacity style={style.buttonAlert} onPress={() => seeMore(item.id)}>
                                    <Text style={style.newbuttonText}> Ver mas </Text>
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