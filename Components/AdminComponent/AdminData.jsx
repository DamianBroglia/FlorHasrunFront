import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from 'react-native';
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
    const [showButtons, setShowButtons] = useState(true)

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
        setShowButtons(false)
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
        <View style={{ flex: 1 }} >
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            {!viewCalendar ?
                <View style={style.fullWidthCard}>
                    {showButtons ?
                        <View>
                            <Text style={style.title}> Elije las fechas</Text>
                            <TouchableOpacity style={{ ...style.smallButton, marginVertical: "4%" }} onPress={init}>
                                <Text style={style.buttonText}> Desde </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <TouchableOpacity style={{ ...style.mediumButton, marginVertical: "1%" }} onPress={() => setShowButtons(true)}>
                                <Text style={style.buttonText}> Elejir Fechas </Text>
                            </TouchableOpacity>
                            <Text style={style.smallText}>Desde</Text>
                        </View>
                    }
                    {dateInit &&
                        <View style={{ ...style.loginInput, width: "85%", justifyContent: "center" }}>
                            <Text style={style.VerybigText}>{dateInit}</Text>
                        </View>
                    }
                    {showButtons ?
                        <TouchableOpacity style={{ ...style.smallButton, marginVertical: "4%" }} onPress={finish} >
                            <Text style={style.buttonText}> Hasta </Text>
                        </TouchableOpacity>
                        :
                        <Text style={style.smallText}>Hasta</Text>
                    }
                    {dateFinish &&
                        <View style={{ ...style.loginInput, width: "85%", justifyContent: "center" }}>
                            <Text style={style.VerybigText}>{dateFinish}</Text>
                        </View>
                    }
                    {dateInit && dateFinish && showButtons &&
                        <TouchableOpacity style={{ ...style.mediumButton, marginVertical: "5%" }} onPress={getStadisticInTime}>
                            <Text style={style.buttonText}> Calcular </Text>
                        </TouchableOpacity>
                    }
                </View>
                :
                <Calendar
                    style={style.calendar}
                    onDayPress={onDayPressHandler} />
            }

            {loading &&
                <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size="large" color='rgb(203, 171, 148)' />
                    <Text style={style.bigText}>Calculando...</Text>
                </View>}
            {viewStadistic &&
                <View>
                    <View style={style.fullWidthCard}>
                        <View style={style.buttonsHorizontalContainer}>
                            <Image style={{...style.mediumImage, marginTop:"0%"}} source={require("../../assets/Ganancia.png")} />
                            <TouchableOpacity style={style.mediumButton} onPress={() => setModalGan(true)}>
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
                    <View style={style.fullWidthCard}>
                        <View style={style.buttonsHorizontalContainer}>
                            <Image style={{...style.mediumImage, marginTop:"0%"}} source={require("../../assets/Calendario.png")} />
                            <TouchableOpacity style={style.mediumButton} onPress={() => setModalTurnView(true)}>
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
                    <View style={style.fullWidthCard}>
                        <View style={style.buttonsHorizontalContainer}>
                            <Image style={{...style.mediumImage, marginTop:"0%"}} source={require("../../assets/Vip.png")} />
                            <TouchableOpacity style={style.mediumButton} onPress={() => setModalServView(true)}>
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