import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { style } from '../Styles';
import { ModalUserTurns } from './ModalUserTurns';

const UserTurns = () => {
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

    return (
        <View>
            <View style={style.cardUsers}>
                <Image style={style.bigImage} source={require("../../assets/CheckList.png")} />
                <TouchableOpacity style={style.button} onPress={getAllTurns}>
                    <Text style={style.buttonText}>Todos</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={style.mediumCard}>
                    <Image style={style.bigImage} source={require("../../assets/FlechaIzquierda.png")} />
                    <TouchableOpacity style={style.button} onPress={getPastTurns}>
                        <Text style={style.buttonText}>Pasados</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.mediumCard}>
                    <Image style={style.bigImage} source={require("../../assets/FlechaDerecha.png")} />
                    <TouchableOpacity style={style.button} onPress={getFutureTurns}>
                        <Text style={style.buttonText}>Futuros</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={style.mediumCard}>
                    <Image style={style.bigImage} source={require("../../assets/Bien.png")} />
                    <TouchableOpacity style={style.button} onPress={getTakedTurns}>
                        <Text style={style.buttonText}>Cumplidos</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.mediumCard}>
                    <Image style={style.bigImage} source={require("../../assets/WarningGolden.png")} />
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
        </View>
    );
};

export default UserTurns;