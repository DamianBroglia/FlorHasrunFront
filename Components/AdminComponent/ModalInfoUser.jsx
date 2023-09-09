import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';

export const ModalInfoUser = ({ isVisible, onClose, userInfo, goToTurns }) => {
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
            <View>
                <Text>{userInfo.name} {userInfo.lastname}</Text>
                <TouchableOpacity onPress={()=>{goToTurns("saved")}}>
                    <Text>Turnos guardados</Text>
                    <Text>{userInfo.turnsSaved}</Text>
                </TouchableOpacity>
            </View>


        </Modal>
    );
};