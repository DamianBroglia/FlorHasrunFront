import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

export const ModalService = ({ isVisible, onClose, viewStadistic }) => {
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
                            <Text style={style.title}>Servicios</Text>
                        }
                        ListFooterComponent={
                            <TouchableOpacity onPress={onClose} style={style.smallButton}>
                                <Text style={style.buttonText}>Volver</Text>
                            </TouchableOpacity>
                        }
                        data={viewStadistic.totalService}
                        style={{ marginTop: 5, width: "100%" }}
                        renderItem={({ item }) =>
                            <View style={style.fullWidthCard}>
                                <Text style={style.VerybigText}>{item.name}</Text>
                                <View style={style.buttonsHorizontalContainer}>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}>{item.count}</Text>
                                        </View>
                                        <Text style={style.smallText}>Turnos</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}>${item.collected}</Text>
                                        </View>
                                        <Text style={style.smallText}>Ganancia</Text>
                                    </View>
                                    <View style={{ alignItems: "center", width: "33%" }}>
                                        <View style={{ ...style.litleCard, paddingVertical: 5, width: "90%" }}>
                                            <Text style={style.bigText}>{item.failed}</Text>
                                        </View>
                                        <Text style={style.smallText}>Fallados</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>
        </Modal>
    );
};