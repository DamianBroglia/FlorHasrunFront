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
                    <View style={{ width: 310 }}>
                        <View style={{ alignItems: "center", marginBottom: 12 }}>
                            <Text style={style.titleBig}>Turnos</Text>
                            <View style={style.propertyUser}>
                                <Text style={style.propertyText}> {viewStadistic.allTurns} </Text>
                            </View>
                            <Text style={style.mediumText}>Turnos Totales</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.takedTurn} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Turnos</Text>
                                <Text style={style.littleMediumMsj}>cumplidos</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.failedTurn} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Turnos</Text>
                                <Text style={style.littleMediumMsj}>fallados</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.cancelByUser} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Turnos</Text>
                                <Text style={style.littleMediumMsj}>cancelados</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.cancelByAdmin} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Cancelados</Text>
                                <Text style={style.littleMediumMsj}>por ti</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.futureTurn} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Turnos</Text>
                                <Text style={style.littleMediumMsj}>futuros</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.totalHours} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Horas</Text>
                                <Text style={style.littleMediumMsj}>trabajadas</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.loseTime} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Horas</Text>
                                <Text style={style.littleMediumMsj}>perdidas</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.arrayTurnsByDay.length} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Dias</Text>
                                <Text style={style.littleMediumMsj}>seleccionados</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextSmall}> {viewStadistic.workedDays} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Dias</Text>
                                <Text style={style.littleMediumMsj}>trabajados</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", marginBottom:-14 }}>
                            <Text style={style.titleTurnUser}>Turnos por día</Text>
                        </View>
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
                    <View>
                        {item.collectedDay > 0 || item.failedTurnDay > 0 || item.futureTurnDay > 0 || item.cancelByUserDay > 0 || item.cancelByAdmin > 0 ?
                            <View style={style.cardModalUserTurns}>
                                <Text style={style.mediumText}>{item.date}</Text>
                                <View style={{ flexDirection: "row", marginTop: 5 }}>
                                    <View style={{ alignItems: "center", width: 44 }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittle}> {item.totalTurns} </Text>
                                        </View>
                                        <Text style={style.littleMsj}> Total </Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: 44 }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittle}> {item.takedTurnDay} </Text>
                                        </View>
                                        <Text style={style.littleMsj}> Cumplidos </Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: 44 }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittle}> {item.failedTurnDay} </Text>
                                        </View>
                                        <Text style={style.littleMsj}> Fallados </Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: 44 }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittle}> {item.cancelByUserDay + item.cancelByAdminDay} </Text>
                                        </View>
                                        <Text style={style.littleMsj}> Cancelados </Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: 44 }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittle}> {item.hoursDay} </Text>
                                        </View>
                                        <Text style={style.littleMsj}> Horas </Text>
                                    </View>
                                </View>
                            </View> : null
                        }
                    </View>
                }
            />

        </Modal>
    );
};