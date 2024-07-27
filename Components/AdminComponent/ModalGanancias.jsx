import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

export const ModalGanancias = ({ isVisible, onClose, viewStadistic, orderDaysCollected }) => {
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
                        data={orderDaysCollected}
                        ListHeaderComponent={
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ ...style.title, marginBottom: 10 }}>Ganancias</Text>
                                <View style={{ width: "98%", alignItems: "center" }}>
                                    <View style={{ ...style.litleCard, paddingVertical: 5 }}>
                                        <Text style={style.VerybigText}>${viewStadistic.totalCollected}</Text>
                                    </View>
                                    <Text style={style.mediumText}>Ganancias totales</Text>
                                </View>
                                <View style={style.buttonsHorizontalContainer}>
                                    <View style={{ width: "33%", alignItems: "center" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}>${viewStadistic.loseforFail}</Text>
                                        </View>
                                        <Text style={style.smallText}>Perdida por falta</Text>
                                    </View>
                                    <View style={{ width: "33%", alignItems: "center" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.workedDays} </Text>
                                        </View>
                                        <Text style={style.smallText}>Días trabajados</Text>
                                    </View>
                                    <View style={{ width: "33%", alignItems: "center" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}>${Math.round(viewStadistic.totalCollected / viewStadistic.workedDays)}</Text>
                                        </View>
                                        <Text style={style.smallText}>Promedio por dia</Text>
                                    </View>
                                </View>

                                <View style={style.buttonsHorizontalContainer}>
                                    <View style={{ width: "33%", alignItems: "center" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}>${viewStadistic.futureCollected}</Text>
                                        </View>
                                        <Text style={style.smallText}>Ganancias futuras</Text>
                                    </View>
                                    <View style={{ width: "33%", alignItems: "center" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}> {viewStadistic.totalHours} </Text>
                                        </View>
                                        <Text style={style.smallText}>Horas trabajadas</Text>
                                    </View>
                                    <View style={{ width: "33%", alignItems: "center" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}>${Math.round(viewStadistic.totalCollected / viewStadistic.totalHours)}</Text>
                                        </View>
                                        <Text style={style.smallText}>Promedio por hora</Text>
                                    </View>
                                </View>
                                <Text style={style.VerybigText}>Ganancia por día</Text>
                            </View>
                        }
                        ListFooterComponent={
                            <TouchableOpacity onPress={onClose} style={style.smallButton}>
                                <Text style={style.buttonText}>Volver</Text>
                            </TouchableOpacity>
                        }
                        style={{ marginTop: 5 }}
                        renderItem={({ item }) =>
                            <View>
                                {item.collectedDay > 0 || item.futurecollectDay > 0 ?
                                    <View style={style.fullWidthCard}>
                                        <Text style={style.bigText}>{item.date}</Text>
                                        <View style={style.buttonsHorizontalContainer}>
                                            <View style={{ alignItems: "center", width: "25%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "95%" }}>
                                                    <Text style={style.mediumText}>${item.collectedDay}</Text>
                                                </View>
                                                <Text style={style.smallText}>Total</Text>
                                            </View>
                                            <View style={{ alignItems: "center", width: "25%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "95%" }}>
                                                    <Text style={style.mediumText}>{item.hoursDay}</Text>
                                                </View>
                                                <Text style={style.smallText}>Horas</Text>
                                            </View>
                                            <View style={{ alignItems: "center", width: "25%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "95%" }}>
                                                    <Text style={style.mediumText}>${Math.round(item.collectedDay / item.hoursDay)}</Text>
                                                </View>
                                                <Text style={style.smallText}>Por hora</Text>
                                            </View>
                                            <View style={{ alignItems: "center", width: "25%" }}>
                                                <View style={{ ...style.litleCard, paddingVertical: 5, width: "95%" }}>
                                                    <Text style={style.mediumText}>${item.futurecollectDay}</Text>
                                                </View>
                                                <Text style={style.smallText}>A futuro</Text>
                                            </View>
                                        </View>
                                    </View> :
                                    null
                                }

                            </View>
                        }
                    />
                </View>
            </View>
        </Modal>
    );
};
