import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { style } from './Styles';

export const ModalAlert = ({ isVisible, onClose, title, message, type }) => {
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
         {type === "ok" ?  
         <Image style={style.imageIcons} source={require("../assets/Bien.png")} />
         : 
         <Image style={style.imageIcons} source={require("../assets/Warning.png")} />
         }
          <Text style={style.titleServ}>{title}</Text>
          <Text style={style.text}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
            <Text style={style.buttonText}>OK</Text>
          </TouchableOpacity>
        </View> 
        
  
    </Modal>
  );
};


