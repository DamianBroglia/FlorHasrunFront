import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

export const CancelModal = ({ isVisible, onClose, cancelAny, title, message }) => {
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
                <Text style={style.titleServ}>{title}</Text>
                <Text style={style.textHome}>{message}</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelAny} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Cancelar igual</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};