import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

export const ModalUserTurns = ({ isVisible, onClose, filterTurns, title, noHay }) => {
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

{filterTurns.length > 0 ?
                <View style={{ alignItems: "center" }}>
                    <Text style={style.name}>{title}</Text>
                    <FlatList
                        data={filterTurns}
                        renderItem={({ item }) =>
                            <View style={style.cardUsers}>
                                <Text style={style.titleDate}>{item.dateInit}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={style.textInfo}>{item.hourInit} hs</Text>
                                    <Text style={style.textInfoCenter} >{item.product.name}</Text>
                                    <Text style={style.textInfo} >$ {item.product.price}</Text>
                                </View>
                            </View>
                        } />
                </View>
                :
                <Text style={style.message}>{noHay}</Text>
            }
        </Modal>
    );
};