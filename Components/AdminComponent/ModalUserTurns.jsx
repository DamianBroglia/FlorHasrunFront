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
            style={{ margin: 0 }}
        >

            {filterTurns.length > 0 ?
                <View style={style.block}>
                    <View style={{...style.modalCard, height:"auto", maxHeight:"80%", top:"10%" }}>
                        <Text style={style.title}>{title}</Text>
                        <FlatList
                        style={{width:"100%"}}
                            data={filterTurns}
                            renderItem={({ item }) =>
                                <View style={style.fullWidthCard}>
                                    <Text style={style.bigText}>{item.dateInit}</Text>
                                    <Text style={style.mediumText} >{item.product.name}</Text>
                                    <View style={{ flexDirection: "row"}}>
                                        <Text style={style.smallText}>{item.hourInit} hs |</Text>
                                        <Text style={style.smallText} > $ {item.product.price}</Text>
                                    </View>
                                </View>
                            } />
                    </View>
                </View>
                :
                <View style={style.fullWidthCard}>
                <Text style={style.bigText}>{noHay}</Text>
                </View>
            }
        </Modal>
    );
};