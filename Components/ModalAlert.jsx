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
      style={{ margin: 0 }}
    >

      <View style={style.block}>
        <View style={style.modalCard}>
          {type === "ok" ?
            <Image style={style.bigImage} source={require("../assets/Bien.png")} />
            :
            <Image style={style.bigImage} source={require("../assets/Warning.png")} />
          }
          <Text style={style.title}>{title}</Text>
          <Text style={{...style.bigText, width:"90%"}}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{...style.smallButton, marginVertical:12}}>
            <Text style={style.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>


    </Modal>
  );
};


