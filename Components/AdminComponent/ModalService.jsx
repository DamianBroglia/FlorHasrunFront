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
                        <Text style={style.titleBig}>Servicios</Text>
                    </View>

                }
                ListFooterComponent={
                    <TouchableOpacity onPress={onClose} style={style.smallButton}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                }
                data={viewStadistic.totalService}
                style={{ marginTop: 5 }}
                renderItem={({ item }) =>
                    <View style={style.cardModalUserTurns}>
                        <Text style={style.titleStadistic}>{item.name}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: 240, marginTop: 3 }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUserSmall}>
                                    <Text style={style.propertyTextLittleLimit2}>{item.count}</Text>
                                </View>
                                <Text style={style.mediumMsj}>Turnos</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUserSmall}>
                                    <Text style={style.propertyTextLittleLimit}>${item.collected}</Text>
                                </View>
                                <Text style={style.mediumMsj}>Ganancia</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={style.propertyUserSmall}>
                                    <Text style={style.propertyTextLittleLimit2}>{item.failed}</Text>
                                </View>
                                <Text style={style.mediumMsj}>Fallados</Text>
                            </View>
                        </View>
                    </View>
                }
            />

        </Modal>
    );
};