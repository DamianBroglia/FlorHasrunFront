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
            style={{ margin: 0 }}
        >
            <View style={{ ...style.block, justifyContent: "center" }}>
                <View style={{ ...style.fullWidthCard, backgroundColor: "rgb(47,44,54)" }}>
                    <FlatList
                        ListHeaderComponent={
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ ...style.title, marginBottom: 10 }}>Turnos</Text>
                                <View style={{ width: "98%", alignItems: "center" }}>
                                    <View style={{ ...style.litleCard, paddingVertical: 5 }}>
                                        <Text style={style.VerybigText}> {viewStadistic.allTurns} </Text>
                                    </View>
                                    <Text style={style.mediumText}>Turnos Totales</Text>
                                </View>

                                <View style={style.buttonsHorizontalContainer}>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.takedTurn} </Text>
                                        </View>
                                        <Text style={style.smallText}>Turnos cumplidos</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.failedTurn} </Text>
                                        </View>
                                        <Text style={style.smallText}>Turnos fallados</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.cancelByUser} </Text>
                                        </View>
                                        <Text style={style.smallText}>Turnos cancelados</Text>
                                    </View>
                                </View>

                                <View style={style.buttonsHorizontalContainer}>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.cancelByAdmin} </Text>
                                        </View>
                                        <Text style={style.smallText}>Cancelados por ti</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.futureTurn} </Text>
                                        </View>
                                        <Text style={style.smallText}>Turnos futuros</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.totalHours} </Text>
                                        </View>
                                        <Text style={style.smallText}>Horas trabajadas</Text>
                                    </View>
                                </View>
                                <View style={style.buttonsHorizontalContainer}>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.loseTime} </Text>
                                        </View>
                                        <Text style={style.smallText}>Horas perdidas</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.arrayTurnsByDay.length} </Text>
                                        </View>
                                        <Text style={style.smallText}>Dias seleccionados</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.workedDays} </Text>
                                        </View>
                                        <Text style={style.smallText}>Dias trabajados</Text>
                                    </View>
                                </View>
                                <Text style={style.VerybigText}>Turnos por día</Text>
                            </View>
                        }
                        ListFooterComponent={
                            <TouchableOpacity onPress={onClose} style={style.smallButton}>
                                <Text style={style.buttonText}>Volver</Text>
                            </TouchableOpacity>
                        }
                        data={orderDaysTurns}
                        style={{ marginTop: 5 }}
                        renderItem={({ item }) =>
                            <View>
                                {item.collectedDay > 0 || item.failedTurnDay > 0 || item.futureTurnDay > 0 || item.cancelByUserDay > 0 || item.cancelByAdmin > 0 ?
                                    <View style={style.fullWidthCard}>
                                        <Text style={style.bigText}>{item.date}</Text>
                                        <View style={style.buttonsHorizontalContainer}>
                                            <View style={{ alignItems: "center", width: "20%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                                    <Text style={style.bigText}> {item.totalTurns} </Text>
                                                </View>
                                                <Text style={style.smallText}>Total</Text>
                                            </View>
                                            <View style={{ alignItems: "center", width: "20%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                                    <Text style={style.bigText}> {item.takedTurnDay} </Text>
                                                </View>
                                                <Text style={style.smallText}>Cumplidos</Text>
                                            </View>
                                            <View style={{ alignItems: "center", width: "20%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                                    <Text style={style.bigText}> {item.failedTurnDay} </Text>
                                                </View>
                                                <Text style={style.smallText}>Fallados</Text>
                                            </View>
                                            <View style={{ alignItems: "center", width: "20%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                                    <Text style={style.bigText}> {item.cancelByUserDay + item.cancelByAdminDay} </Text>
                                                </View>
                                                <Text style={style.smallText}>Cancelados</Text>
                                            </View>
                                            <View style={{ alignItems: "center", width: "20%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                                    <Text style={style.bigText}> {Math.round(item.hoursDay)} </Text>
                                                </View>
                                                <Text style={style.smallText}>Horas</Text>
                                            </View>
                                        </View>
                                    </View> : null
                                }
                            </View>
                        }
                    />
                </View>
            </View>
        </Modal>
    );
};