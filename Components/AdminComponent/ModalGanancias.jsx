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
                    <View style={{ alignItems: "center" }}>
                        <Text style={style.titleStadistic}>Ganancia Total</Text>
                        <Text style={style.totalStadistic}>$ {viewStadistic.totalCollected}</Text>
                        <Text style={style.future}>+ $ {viewStadistic.futureCollected}</Text>
                        <Text style={{ fontSize: 10, marginTop: -6, color: "green" }}>Ganancia futura</Text>
                        <Text style={style.titleStadistic}> Ganancia por dia </Text>
                    </View>
                }
                ListFooterComponent={
                    <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                }
                style={{ marginTop: 5 }}
                renderItem={({ item }) =>
                    <View style={style.infoStadisticDay}>
                        <Text style={{ fontWeight: "500", fontSize: 15 }}>{item.date}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "500", fontSize: 15 }}>  $ {item.collectedDay} | </Text>
                            <Text style={{ fontWeight: "500", fontSize: 15, color: "green" }}>$ {item.futurecollectDay}</Text>
                        </View>
                    </View>
                }
            />
        </Modal>
    );
};
