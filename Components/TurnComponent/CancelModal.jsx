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
            style={style.alerta}
        >
            <View style={style.alertContainer}>
                <Text style={style.title}>{title}</Text>
                <Text style={style.text}>{message}</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={onClose} style={style.smallButton}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelAny} style={style.smallButton}>
                        <Text style={style.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
