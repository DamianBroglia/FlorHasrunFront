import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

export const CancelModal = ({ isVisible, onClose, cancelAny, title, message, buttonText }) => {
    return (
        <Modal
            isVisible={isVisible}
            backdropOpacity={0.1}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            animationIn="fadeIn"
            animationOut="fadeOutDown"
            useNativeDriver
            style={{margin:0}}
        >
            <View style={style.block}>
            <View style={style.modalCard}>
                <Text style={style.title}>{title}</Text>
                <Text style={style.bigText}>{message}</Text>
                <View style={{flexDirection:"row", width:"80%", justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={onClose} style={style.smallButton}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelAny} style={style.smallButton}>
                        <Text style={style.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
    );
};
