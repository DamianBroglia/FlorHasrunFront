import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { style } from '../Styles';
import { useDispatch } from 'react-redux';
import { getServiceId } from '../../Redux/actions/serviceActions';



export const ModalSaveTurns = ({ isVisible, onClose, services, navigation }) => {
    const dispatch = useDispatch()

    const calendarHandler = (id) => {
        dispatch(getServiceId(id))
        navigation.navigate("Elija una fecha")
    }

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
            <View style={{alignItems:"center"}}>
                <Text style={style.titleHome}> Elija un servicio </Text>
                <FlatList
                    data={services}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={style.button} onPress={() => calendarHandler(item.id)}>
                            <Text style={style.buttonText}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        </Modal>
    );
};