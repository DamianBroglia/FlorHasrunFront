import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { style } from './Styles';

export const ModalAlert = ({ isVisible, onClose, title, message }) => {
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
          <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
            <Text style={style.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  

  