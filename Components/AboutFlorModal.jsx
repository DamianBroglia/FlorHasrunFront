import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { style } from './Styles';

export const AboutFlorModal = ({ isVisible, onClose }) => {

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
            <ScrollView>
                <View style={style.alertContainer}>
                    <Text style={style.titleHome}>Sobre Florencia</Text>
                    <Image style={style.imageHome} source={require("../assets/Flor.jpg")} />
                    <Text style={style.text}> Florencia , reconocida como una eminencia en el campo de la estética, es una apasionada del arte y la belleza desde una edad temprana.
                        Nacida en una pequeña ciudad, Florencia descubrió su pasión por el diseño y la estética mientras crecía rodeada de naturaleza y colores vibrantes.
                        Desde su adolescencia, Florencia demostró un talento innato para la creatividad y la expresión visual. Su amor por el arte la llevó a estudiar Bellas Artes en una
                        prestigiosa universidad, donde perfeccionó sus habilidades en el dibujo, la pintura y la escultura. Sin embargo, fue en el mundo de la estética donde realmente
                        encontró su vocación.
                        Florencia se sumergió en el estudio de la estética en todas sus formas: desde la moda y el diseño de interiores hasta la arquitectura y el maquillaje. Su mente inquisitiva
                        la llevó a investigar las últimas tendencias y técnicas, pero también a explorar la historia y la teoría del arte y la belleza.</Text>
                    <TouchableOpacity onPress={onClose} style={style.buttonAlert}>
                        <Text style={style.buttonText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    );
};