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
            style={style.cardModalStadistic}
        >

            <FlatList
                ListHeaderComponent={
                    <View style={{ alignItems: "center" }}>
                        <Text style={style.titleStadistic}>Servicios</Text>
                    </View>

                }
                ListFooterComponent={
                    <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                }
                data={viewStadistic.totalService}
                style={{ marginTop: 5 }}
                renderItem={({ item }) =>
                    <View style={style.infoStadisticDay}>
                        <Text style={{ fontWeight: "500", fontSize: 15 }} >
                            <Text>{item.name}</Text> |
                            <Text style={{ color: "orange" }}> {item.count}</Text> |
                            <Text style={{ color: "red" }}> {item.failed}</Text> |
                            <Text> $ {item.collected}</Text>
                        </Text>
                    </View>
                }
            />

        </Modal>
    );
};