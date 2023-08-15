import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
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

    const [view, setView] = useState(null)
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


    const changeView = (opcion) => {
        if (view === opcion) {
            setView(null)
        } else {
            setView(opcion)
        }
    }

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
                <View style={style.containerEstadistica}>
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
            {loading && <Text>Calculando...</Text>}
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


    // return (
    //     <ScrollView >
    //         <View style={style.cardUsers}>
    //             <Text style={style.textInfo}> Elije las fechas</Text>
    //             <View style={style.containerEstadistica}>
    //                 <TouchableOpacity style={style.button} onPress={init}>
    //                     <Text style={style.buttonText}> Desde </Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={style.button} onPress={finish} >
    //                     <Text style={style.buttonText}> Hasta </Text>
    //                 </TouchableOpacity>
    //             </View>
    //             {dateInit && <Text style={style.textInfo}>Desde: {dateInit}</Text>}
    //             {dateFinish && <Text style={style.textInfo}>Hasta: {dateFinish}</Text>}
    //             {dateInit && dateFinish ?
    //                 <TouchableOpacity style={style.button} onPress={getStadisticInTime}>
    //                     <Text style={style.buttonText}> Calcular </Text>
    //                 </TouchableOpacity>
    //                 : null}
    //             {viewCalendar && <Calendar
    //                 onDayPress={onDayPressHandler}
    //             />}

    //         </View>

    //          {loading && <Text>Calculando...</Text>}

    //         <View style={style.cardUsers}>
    //             <Image style={style.imageIcons} source={require("../../assets/Ganancia.png")} />
    //             {viewStadistic ?
    //                 <View>
    //                     <TouchableOpacity style={style.button} onPress={() => setModalGan(true)}>
    //                         <Text style={style.buttonText}> Ganancias </Text>
    //                     </TouchableOpacity>
    //                     <ModalGanancias
    //                         isVisible={modalGan}
    //                         onClose={() => hideAlert()}
    //                         viewStadistic={viewStadistic}
    //                         orderDaysCollected={orderDaysCollected}
    //                     />
    //                 </View>
    //                 :
    //                 <View>
    //                     <TouchableOpacity style={style.buttonNoSelect}>
    //                         <Text style={style.buttonText}> Ganancias </Text>
    //                     </TouchableOpacity>
    //                     <Text style={style.textInfo}> Elije las fechas de inicio y final, luego</Text>
    //                 </View>
    //             }
    //             <Text style={style.textInfo}> Has click para ver tus ganancias</Text>

    //         </View>


    //         <View style={style.cardUsers}>
    //             <Image style={style.imageIcons} source={require("../../assets/Calendario.png")} />
    //             {viewStadistic ?
    //                 <View>
    //                     <TouchableOpacity style={style.button} onPress={() => setModalTurnView(true)}>
    //                         <Text style={style.buttonText}> Turnos </Text>
    //                     </TouchableOpacity>
    //                     <ModalTurns
    //                         isVisible={modalTurnView}
    //                         onClose={() => hideAlert()}
    //                         viewStadistic={viewStadistic}
    //                         orderDaysTurns={orderDaysTurns}
    //                     />
    //                 </View>
    //                 :
    //                 <View>
    //                     <TouchableOpacity style={style.buttonNoSelect} >
    //                         <Text style={style.buttonText}> Turnos </Text>
    //                     </TouchableOpacity>
    //                     <Text style={style.textInfo}> Elije las fechas de inicio y final, luego</Text>
    //                 </View>
    //             }
    //             <Text style={style.textInfo}> Has click para ver la cantidad de turnos</Text>

    //         </View>


    //         <View style={style.cardUsers}>
    //             <Image style={style.imageIcons} source={require("../../assets/Vip.png")} />
    //             {viewStadistic ?
    //                 <View>
    //                     <TouchableOpacity style={style.button} onPress={() => setModalServView(true)}>
    //                         <Text style={style.buttonText}> Servicios </Text>
    //                     </TouchableOpacity>
    //                     <ModalService
    //                         isVisible={modalServView}
    //                         onClose={() => hideAlert()}
    //                         viewStadistic={viewStadistic}
    //                     />
    //                 </View>
    //                 :
    //                 <View>
    //                     <TouchableOpacity style={style.buttonNoSelect} >
    //                         <Text style={style.buttonText}> Servicios </Text>
    //                     </TouchableOpacity>
    //                     <Text style={style.textInfo}> Elije las fechas de inicio y final, luego</Text>
    //                 </View>
    //             }
    //             <Text style={style.textInfo}> Has click para ver datos de tus servicios</Text>

    //         </View>
    //     </ScrollView>
    // );
};

export default AdminData;