import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

export const ModalCreditsState = ({ isVisible, onClose, getCredits, title, message, credits }) => {

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
                {credits > 1 &&
                <Text style={style.textHome}> Tienes {credits} creditos, puedes guardar {Math.floor(credits / 2 )} turno/s</Text>
                }
                <Text style={style.textHome}>{message}</Text>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                    {getCredits &&
                        <TouchableOpacity onPress={getCredits} style={style.buttonAlert}>
                            <Text style={style.buttonText}>Solicitar Creditos</Text>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        </Modal>
    );
};