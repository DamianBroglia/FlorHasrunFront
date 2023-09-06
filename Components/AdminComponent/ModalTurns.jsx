import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

// Agregar turnos cancelados

export const ModalTurns = ({ isVisible, onClose, viewStadistic, orderDaysTurns }) => {
    return (
        <Modal
            isVisible={isVisible}
            backdropOpacity={0.1}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            animationIn="fadeIn"
            animationOut="fadeOutDown"
            useNativeDriver
            style={style.cardModalStadistic}
        >
            <FlatList
                ListHeaderComponent={
                    <View style={{alignItems:"center"}}>
                        <Text style={style.titleStadistic}>Turnos Totales</Text>
                        <Text style={style.totalStadistic}>{viewStadistic.allTurns}</Text>
                        <Text style={style.stadisticInfo}>
                            <Text style={{ color: "orange" }}>{viewStadistic.takedTurn} </Text> |
                            <Text style={{ color: "red" }}>  {viewStadistic.failedTurn} </Text> |
                            <Text style={{ color: "green" }}>  {viewStadistic.futureTurn} </Text> |
                            <Text style={{ color: "darkblue" }}>  {viewStadistic.totalHours} </Text>
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            <Text style={{ color: "orange" }}>cumplidos</Text>|
                            <Text style={{ color: "red" }}>fallados</Text>|
                            <Text style={{ color: "green" }}>futuros</Text>|
                            <Text style={{ color: "darkblue" }}>Horas</Text>
                        </Text>
                        <Text style={style.titleStadistic}> Turnos por dia </Text>
                    </View>
                }
                ListFooterComponent={
                    <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                }
                data={orderDaysTurns}
                style={{ marginTop: 5 }}
                renderItem={({ item }) =>
                    <View style={style.infoStadisticDay}>
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.date}</Text>
                        <Text style={{ fontWeight: "500", fontSize: 15 }}>
                            <Text>{item.totalTurns} </Text> |
                            <Text style={{ color: "orange" }}> {item.takedTurnDay}</Text> |
                            <Text style={{ color: "red" }}> {item.failedTurnDay}</Text> |
                            <Text style={{ color: "green" }}> {item.futureTurnDay}</Text> |
                            <Text style={{ color: "darkblue" }}> {item.hoursDay}</Text>
                        </Text>
                    </View>
                }
            />

        </Modal>
    );
};