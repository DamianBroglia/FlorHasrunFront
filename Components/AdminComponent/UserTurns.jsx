import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { style } from '../Styles';
import { ModalUserTurns } from './ModalUserTurns';



const UserTurns = ({ navigation }) => {

    const turns = useSelector((state) => state.turns.viewTurns)
    const [filterTurns, setFilterTurns] = useState([])
    const [title, setTitle] = useState("")
    const [noHay, setNoHay] = useState("Seleccione un boton para ver los turnos")
    const [viewModal, setViewModal] = useState(false)

    const getAllTurns = () => {
        setFilterTurns(turns)
        setTitle("Todos los Turnos")
        setNoHay("No hay Turnos")
        setViewModal(true)
    }

    const getPastTurns = () => {
        const pastTurns = turns.filter((e) => e.state !== "toTake")
        setFilterTurns(pastTurns)
        setTitle("Turnos Pasados")
        setNoHay("No hay turnos pasados")
        setViewModal(true)
    }
    const getFutureTurns = () => {
        const futureTurns = turns.filter((e) => e.state === "toTake")
        setFilterTurns(futureTurns)
        setTitle("Turnos Futuros")
        setNoHay("No hay turnos futuros")
        setViewModal(true)
    }
    const getTakedTurns = () => {
        const futureTurns = turns.filter((e) => e.state === "takedIt")
        setFilterTurns(futureTurns)
        setTitle("Turnos Cumplidos")
        setNoHay("Este cliente no ha cumplido con ningun turno")
        setViewModal(true)
    }
    const getFailedTurns = () => {
        const futureTurns = turns.filter((e) => e.state === "failed")
        setFilterTurns(futureTurns)
        setTitle("Turnos Fallados")
        setNoHay("Este cliente no ha fallado ningun turno")
        setViewModal(true)
    }

    const hideAlert = () => {
        setViewModal(false)
    };

//agregar turnos cancelados

    return (
        <View>

            <View style={style.cardUsers}>
                <Image style={style.imageIcons} source={require("../../assets/CheckList.png")} />
                <TouchableOpacity style={style.button} onPress={getAllTurns}>
                    <Text style={style.buttonText}>Todos</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/FlechaIzquierda.png")} />
                    <TouchableOpacity style={style.button} onPress={getPastTurns}>
                        <Text style={style.buttonText}>Pasados</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/FlechaDerecha.png")} />
                    <TouchableOpacity style={style.button} onPress={getFutureTurns}>
                        <Text style={style.buttonText}>Futuros</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Bien.png")} />
                    <TouchableOpacity style={style.button} onPress={getTakedTurns}>
                        <Text style={style.buttonText}>Cumplidos</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.cardUserTurns}>
                    <Image style={style.imageIcons} source={require("../../assets/Warning.png")} />
                    <TouchableOpacity style={style.button} onPress={getFailedTurns}>
                        <Text style={style.buttonText}>Fallados</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ModalUserTurns
                isVisible={viewModal}
                onClose={() => hideAlert()}
                filterTurns={filterTurns}
                title={title}
                noHay={noHay}
            />

            {/* {filterTurns.length > 0 ?
                <View style={{ alignItems: "center" }}>
                    <Text style={style.name}>{title}</Text>
                    <FlatList
                        data={filterTurns}
                        renderItem={({ item }) =>
                            <View style={style.cardUsers}>
                                <Text style={style.titleDate}>{item.dateInit}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={style.textInfo}>{item.hourInit} hs</Text>
                                    <Text style={style.textInfoCenter} >{item.product.name}</Text>
                                    <Text style={style.textInfo} >$ {item.product.price}</Text>
                                </View>
                            </View>
                        } />
                </View>
                :
                <Text style={style.message}>{noHay}</Text>
            } */}

        </View>



    );
};

export default UserTurns;