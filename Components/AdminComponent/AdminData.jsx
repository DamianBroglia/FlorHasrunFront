import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { style } from '../Styles';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/es';
import { getStadistic } from './getStadistic';
import { ModalGanancias } from './ModalGanancias';
import { ModalTurns } from './ModalTurns';
import { ModalService } from './ModalService';

moment.locale('es');

const AdminData = () => {

    const [viewCalendar, setViewCalendar] = useState(false)
    const [dateInit, setDayInit] = useState(null)
    const [dateFinish, setDateFinish] = useState(null)
    const [type, setType] = useState(null)
    const [viewStadistic, setViewStadistic] = useState(null)
    const [orderDaysCollected, setOrderDaysCollected] = useState(null)
    const [orderDaysTurns, setOrderDaysTurns] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modalGan, setModalGan] = useState(false)
    const [modalTurnView, setModalTurnView] = useState(false)
    const [modalServView, setModalServView] = useState(false)

    const onDayPressHandler = (day) => {
        const dateStringSpanish = moment(day.dateString).format('dddd D [de] MMMM [de] YYYY')
        if (type === "init") {
            setDayInit(dateStringSpanish)
        }
        if (type === "finish") {
            setDateFinish(dateStringSpanish)
        }
        setViewCalendar(false)
    }

    const init = () => {
        setViewCalendar(true)
        setType("init")
    }
    const finish = () => {
        setViewCalendar(true)
        setType("finish")
    }

    const getStadisticInTime = async () => {
        setLoading(true)
        const stadistic = await getStadistic(dateInit, dateFinish)
        setViewStadistic(stadistic)
        setOrderDaysCollected([...stadistic.arrayTurnsByDay.sort((a, b) => b.collectedDay - a.collectedDay)])
        setOrderDaysTurns([...stadistic.arrayTurnsByDay.sort((a, b) => b.totalTurns - a.totalTurns)])
        setLoading(false)
    }
    const hideAlert = () => {
        setModalGan(false)
        setModalTurnView(false)
        setModalServView(false)
    };

    return (
        <View >
            <View style={style.cardUsers}>
                <Text style={style.textInfo}> Elije las fechas</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={style.button} onPress={init}>
                        <Text style={style.buttonText}> Desde </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={finish} >
                        <Text style={style.buttonText}> Hasta </Text>
                    </TouchableOpacity>
                </View>
                {dateInit && <Text style={style.textInfo}>Desde: {dateInit}</Text>}
                {dateFinish && <Text style={style.textInfo}>Hasta: {dateFinish}</Text>}
                {dateInit && dateFinish ?
                    <TouchableOpacity style={style.button} onPress={getStadisticInTime}>
                        <Text style={style.buttonText}> Calcular </Text>
                    </TouchableOpacity>
                    : null}
                {viewCalendar && <Calendar
                    onDayPress={onDayPressHandler}
                />}

            </View>
            {loading &&
                <View style={{alignItems:"center"}}>
                    <ActivityIndicator size="large" color='rgb(252, 181, 180)' />
                    <Text style={style.titleStadistic}>Calculando...</Text>
                </View>}
            {viewStadistic &&
                <View>
                    <View style={style.cardStadistic}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={style.imageIconsStadistic} source={require("../../assets/Ganancia.png")} />
                            <TouchableOpacity style={style.buttonStadistic} onPress={() => setModalGan(true)}>
                                <Text style={style.buttonText}> Ganancias </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ModalGanancias
                        isVisible={modalGan}
                        onClose={() => hideAlert()}
                        viewStadistic={viewStadistic}
                        orderDaysCollected={orderDaysCollected}
                    />

                    <View style={style.cardStadistic}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={style.imageIconsStadistic} source={require("../../assets/Calendario.png")} />
                            <TouchableOpacity style={style.buttonStadistic} onPress={() => setModalTurnView(true)}>
                                <Text style={style.buttonText}> Turnos </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <ModalTurns
                        isVisible={modalTurnView}
                        onClose={() => hideAlert()}
                        viewStadistic={viewStadistic}
                        orderDaysTurns={orderDaysTurns}
                    />
                    <View style={style.cardStadistic}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={style.imageIconsStadistic} source={require("../../assets/Vip.png")} />
                            <TouchableOpacity style={style.buttonStadistic} onPress={() => setModalServView(true)}>
                                <Text style={style.buttonText}> Servicios </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ModalService
                        isVisible={modalServView}
                        onClose={() => hideAlert()}
                        viewStadistic={viewStadistic}
                    />
                </View>
            }

        </View>
    );

};

export default AdminData;