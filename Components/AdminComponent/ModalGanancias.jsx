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
            style={style.cardModalStadistic}
        >
            <FlatList
                data={orderDaysCollected}
                ListHeaderComponent={
                    <View>
                        <View style={{ alignItems: "center", marginBottom: 15 }}>
                            <Text style={style.titleBig}>Ganancias</Text>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextLong}>${viewStadistic.totalCollected}</Text>
                                </View>
                                <Text style={style.mediumText}>Ganancias totales</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10, width: 310 }}>

                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextLittleLimit}>${viewStadistic.loseforFail}</Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Perdida</Text>
                                <Text style={style.littleMediumMsj}>por falta</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextLittleLimit2}> {viewStadistic.workedDays} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Días</Text>
                                <Text style={style.littleMediumMsj}>trabajados</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextLittleLimit}>${Math.round(viewStadistic.totalCollected / viewStadistic.workedDays)}</Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Promedio</Text>
                                <Text style={style.littleMediumMsj}>por día</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 12 }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextLittleLimit}>${viewStadistic.futureCollected}</Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Ganancias</Text>
                                <Text style={style.littleMediumMsj}>futuras</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextLittleLimit2}> {viewStadistic.totalHours} </Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Horas</Text>
                                <Text style={style.littleMediumMsj}>trabajadas</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUser}>
                                    <Text style={style.propertyTextLittleLimit}>${Math.round(viewStadistic.totalCollected / viewStadistic.totalHours)}</Text>
                                </View>
                                <Text style={style.littleMediumMsj}>Promedio</Text>
                                <Text style={style.littleMediumMsj}>por hora</Text>
                            </View>
                        </View>

                        <View style={{ alignItems: "center", marginBottom: -14 }}>
                            <Text style={style.titleTurnUser}>Ganancia por día</Text>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                }
                style={{ marginTop: 5 }}
                renderItem={({ item }) =>
                    <View>
                        {item.collectedDay > 0 || item.futurecollectDay > 0 ?
                            <View style={style.cardModalUserTurns2}>
                                <Text style={style.mediumText}>{item.date}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", width: 251, marginTop: 6 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittleLimit3}>${item.collectedDay}</Text>
                                        </View>
                                        <Text style={style.littleMsj}>Total</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittleLimit4}>{item.hoursDay}</Text>
                                        </View>
                                        <Text style={style.littleMsj}>Horas</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittleLimit3}>${Math.round(item.collectedDay / item.hoursDay)}</Text>
                                        </View>
                                        <Text style={style.littleMsj}>Por hora</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={style.propertyUserSmall}>
                                            <Text style={style.propertyTextLittleLimit3}>${item.futurecollectDay}</Text>
                                        </View>
                                        <Text style={style.littleMsj}>A futuro</Text>
                                    </View>
                                </View>
                            </View> :
                            null
                        }

                    </View>
                }
            />
        </Modal>
    );
};
