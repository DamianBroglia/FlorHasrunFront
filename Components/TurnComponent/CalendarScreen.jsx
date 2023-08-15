import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
import { getTurnByDayAction } from '../../Redux/actions/turnActions';
import { getFreeTurns } from './getFreeTurns';
import axios from "axios"
import moment from 'moment';
import 'moment/locale/es';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

moment.locale('es');

const CalendarScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)
  const service = useSelector((state) => state.services.detail)
  const turnsDay = useSelector((state) => state.turns.viewTurns)
  const [selectedDate, setSelectedDate] = useState(null);
  const [freeTurns, setFreeTurs] = useState([])
  const [newTurn, setNewTurn] = useState({
    dateInit: "",
    hourInit: "",
    price: 0,
    userId: user.id,
    productId: ""
  })

  const [loading, setLoading] = useState(false)
  const [confirmTurn, setConfirmTurn] = useState(null)
  const [selecDate, setSelecDate] = useState(true)
  const [dateFormat, setDateFormat] = useState(null)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [turnSaved, setTurnSaved] = useState(false)
  const [dateNotFormat, setDateNotFormta] = useState(null)

  useEffect(() => {
    setLoading(true)
    dispatch(getTurnByDayAction(selectedDate))
  }, [selectedDate]);

  useEffect(() => {
    const freeTurnsArray = getFreeTurns(turnsDay)
    setFreeTurs([...freeTurnsArray])

    setLoading(false)
  }, [turnsDay]);


  const saveTurn = async (hour) => {
    try {
      setNewTurn({
        ...newTurn,
        hourInit: hour,
        productId: service.id,
        price: service.price,
      })
      const index = freeTurns.findIndex((e) => e.hour === hour)
      if (hour === "11:30" || hour === "17:30" || service.duration === "30") {
        setConfirmTurn(hour)
      } else {
        if (service.duration === "60") {
          if (freeTurns[index + 1].free === true) {
            setConfirmTurn(hour)
          } else {
            setIsAlertVisible(true)
            // Alert.alert("El turno es muy corto para el servicio que se desea tomar")
          }
        }
        if (service.duration === "90") {
          if (hour === "17:00" || hour === "11:00") {
            if (freeTurns[index + 1].free === true) {
              setConfirmTurn(hour)
            } else {
              setIsAlertVisible(true)
              // Alert.alert("El turno es muy corto para el servicio que se desea tomar")
            }
          } else {
            if (freeTurns[index + 1].free === true && freeTurns[index + 2].free === true) {
              setConfirmTurn(hour)
            } else {
              setIsAlertVisible(true)
              // Alert.alert("El turno es muy corto para el servicio que se desea tomar")
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const hideAlert = () => {
    setIsAlertVisible(false);
    setTurnSaved(false)
  };

  const postTurn = async () => {
    try {
      // if (user.vip) {
      const newTurnSave = await axios.post(`${API_URL}turns`, newTurn)
      if (newTurnSave.data) {
        // Alert.alert("Turno guardado con exito!")
        setTurnSaved(true)
        setConfirmTurn(null)
        dispatch(getTurnByDayAction(selectedDate))
      }
      // } else {
      //   navigation.navigate("Seña")
      // }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDatePress = (day) => {
    if (moment(day.dateString).format("dddd") === "domingo" || moment(day.dateString).format("dddd") === "lunes") {
      return
    }
    setDateNotFormta(moment(day.dateString))
    const fechaFormateada = moment(day.dateString).format('DD-MM-YYYY')
    setDateFormat(fechaFormateada)
    const dateStringSpanish = moment(day.dateString).format('dddd D [de] MMMM [de] YYYY');
    dispatch(getTurnByDayAction(dateStringSpanish))
    setSelectedDate(dateStringSpanish)
    setNewTurn({ ...newTurn, dateInit: dateStringSpanish })
    setSelecDate(false)
  };

  const getOneDayBefore = () => {
    if (dateNotFormat.format("dddd") === "martes") {
      const restDays = dateNotFormat.subtract(3, "days")
      setSelectedDate(restDays.format('dddd D [de] MMMM [de] YYYY'))
      setDateFormat(restDays.format('DD-MM-YYYY'))
      setNewTurn({ ...newTurn, dateInit: restDays.format('dddd D [de] MMMM [de] YYYY') })

    } else {
      const restDay = dateNotFormat.subtract(1, "days")
      setSelectedDate(restDay.format('dddd D [de] MMMM [de] YYYY'))
      setDateFormat(restDay.format('DD-MM-YYYY'))
      setNewTurn({ ...newTurn, dateInit: restDay.format('dddd D [de] MMMM [de] YYYY') })
    }
  }

  const getOneDayAfter = () => {
    if (dateNotFormat.format("dddd") === "sábado") {
      const sumDays = dateNotFormat.add(3, "days")
      setSelectedDate(sumDays.format('dddd D [de] MMMM [de] YYYY'))
      setDateFormat(sumDays.format('DD-MM-YYYY'))
      setNewTurn({ ...newTurn, dateInit: sumDays.format('dddd D [de] MMMM [de] YYYY') })
    } else {
      const sumDay = dateNotFormat.add(1, "days")
      setSelectedDate(sumDay.format('dddd D [de] MMMM [de] YYYY'))
      setDateFormat(sumDay.format('DD-MM-YYYY'))
      setNewTurn({ ...newTurn, dateInit: sumDay.format('dddd D [de] MMMM [de] YYYY') })
    }
  }

  // return (
  //   <View style={{ flex: 1 }}>
  //     <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />

  //     {selecDate ?
  //       <Calendar
  //         disableWeekends={true}
  //         onDayPress={handleDatePress}

  //       /> :
  //       <View style={{ alignItems: "center" }}>
  //         <TouchableOpacity style={style.button} onPress={() => setSelecDate(true)}>
  //           <Text style={style.buttonText} >Elegir fecha</Text>
  //         </TouchableOpacity>
  //       </View>
  //     }
  //     {selectedDate
  //       ?
  //       <View style={{ alignItems: "center" }}>

  //         <Text style={style.titleStadistic}> {selectedDate} </Text>
  //         {loading ?
  //           <Text style={{ textAlign: "center" }}>Cargando Turnos</Text>
  //           :
  //           <FlatList
  //             data={freeTurns}
  //             // numColumns={2}
  //             horizontal
  //             renderItem={({ item }) =>
  //               item.free ?
  //                 <View>
  //                   <TouchableOpacity style={style.cardTurn} onPress={() => saveTurn(item.hour)}>
  //                     <Text style={style.textHoursGreen}>{item.hour} hs</Text>
  //                     <Image style={style.imageTurn} source={require("../../assets/Llave.png")} />
  //                     <Text style={style.text2} >Disponible</Text>
  //                   </TouchableOpacity>

  //                   <ModalAlert
  //                     isVisible={isAlertVisible}
  //                     onClose={hideAlert}
  //                     title="Lo sentimos..."
  //                     message="El turno es muy corto para el servicio que se desea tomar"
  //                   />
  //                   {confirmTurn === item.hour
  //                     ?
  //                     <View style={style.cardTurnConf}>
  //                       <Text style={style.titleDate}> Confirmar turno? </Text>
  //                       <Text style={style.titleInfo}> {service.name} </Text>
  //                       <View style={{ flexDirection: "row", marginTop: 18 }}>
  //                         <View style={style.cardConfTurn}>
  //                           <Image style={style.imageIconsTurn} source={require("../../assets/Ganancia.png")} />
  //                           <Text style={style.propTurn}> $ {service.price} </Text>
  //                         </View>
  //                         <View style={style.cardConfTurn}>
  //                           <Image style={style.imageIconsTurn} source={require("../../assets/Duracion.png")} />
  //                           <Text style={style.propTurn}> {service.duration} minutos </Text>
  //                         </View>
  //                       </View>
  //                       <View style={{ flexDirection: "row", marginTop: 18 }}>
  //                         <View style={style.cardConfTurn}>
  //                           <Image style={style.imageIconsTurn} source={require("../../assets/Reloj.png")} />
  //                           <Text style={style.propTurn}> {newTurn.hourInit} horas </Text>
  //                         </View>
  //                         <View style={style.cardConfTurn}>
  //                           <Image style={style.imageIconsTurn} source={require("../../assets/Calendario.png")} />
  //                           <Text style={style.propTurn}> {dateFormat} </Text>
  //                         </View>
  //                       </View>
  //                       <View style={{ flexDirection: "row-reverse", marginVertical: 15 }}>
  //                         <TouchableOpacity style={style.button} onPress={postTurn}>
  //                           <Text style={style.buttonText}>Confirmar</Text>
  //                         </TouchableOpacity>
  //                         <TouchableOpacity style={style.button} onPress={() => setConfirmTurn(null)}>
  //                           <Text style={style.buttonText} >Volver</Text>
  //                         </TouchableOpacity>
  //                       </View>
  //                     </View>
  //                     :
  //                     null
  //                   }
  //                 </View>
  //                 :
  //                 <View style={style.cardTurnOc} >
  //                   <Text style={style.textHoursRed}>{item.hour} hs</Text>
  //                   <Image style={style.imageTurn} source={require("../../assets/Candado.png")} />
  //                   <Text style={style.text2b} >Ocupado</Text>
  //                 </View>
  //             }
  //           />
  //         }
  //       </View>
  //       :
  //       <View style={{ marginTop: 40, marginHorizontal: 100 }}>
  //         <Text style={{ fontSize: 18, textAlign: "center" }}>Elija una fecha para ver los turnos disponibles</Text>
  //       </View>
  //     }
  //     <ModalAlert
  //       isVisible={turnSaved}
  //       onClose={() => hideAlert()}
  //       title="Todo OK!"
  //       message="Turno guardado exitosamente!"
  //     />
  //   </View>
  // );



  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />

      {selecDate ?
        <Calendar
          disableWeekends={true}
          onDayPress={handleDatePress}

        /> :
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={style.button} onPress={() => setSelecDate(true)}>
            <Text style={style.buttonText} >Elegir fecha</Text>
          </TouchableOpacity>
        </View>
      }
      {selectedDate
        ?
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={style.littleButton} onPress={getOneDayBefore}>
              <Text style={style.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={style.titleStadistic}> {selectedDate} </Text>
            <TouchableOpacity style={style.littleButton} onPress={getOneDayAfter}>
              <Text style={style.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {loading ?
            <Text style={{ textAlign: "center" }}>Cargando Turnos</Text>
            : <View>
              {confirmTurn ?
                <FlatList
                  data={freeTurns}
                  numColumns={3}

                  renderItem={({ item }) =>
                    <View>
                      {confirmTurn === item.hour
                        ?
                        <View style={style.cardTurnConf}>
                          <Text style={style.titleDate}> Confirmar turno? </Text>
                          <Text style={style.titleInfo}> {service.name} </Text>
                          <View style={{ flexDirection: "row", marginTop: 18 }}>
                            <View style={style.cardConfTurn}>
                              <Image style={style.imageIconsTurn} source={require("../../assets/Ganancia.png")} />
                              <Text style={style.propTurn}> $ {service.price} </Text>
                            </View>
                            <View style={style.cardConfTurn}>
                              <Image style={style.imageIconsTurn} source={require("../../assets/Duracion.png")} />
                              <Text style={style.propTurn}> {service.duration} minutos </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 18 }}>
                            <View style={style.cardConfTurn}>
                              <Image style={style.imageIconsTurn} source={require("../../assets/Reloj.png")} />
                              <Text style={style.propTurn}> {newTurn.hourInit} horas </Text>
                            </View>
                            <View style={style.cardConfTurn}>
                              <Image style={style.imageIconsTurn} source={require("../../assets/Calendario.png")} />
                              <Text style={style.propTurn}> {dateFormat} </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row-reverse", marginVertical: 15 }}>
                            <TouchableOpacity style={style.button} onPress={postTurn}>
                              <Text style={style.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.button} onPress={() => setConfirmTurn(null)}>
                              <Text style={style.buttonText} >Volver</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        : null}
                    </View>
                  }
                /> :
                <FlatList
                  data={freeTurns}
                  numColumns={3}
                  renderItem={({ item }) =>
                    <View>
                      <ModalAlert
                        isVisible={isAlertVisible}
                        onClose={hideAlert}
                        title="Lo sentimos..."
                        message="El turno es muy corto para el servicio que se desea tomar"
                      />
                      {item.free ?
                        <TouchableOpacity style={style.cardTurn} onPress={() => saveTurn(item.hour)}>
                          <Text style={style.textHome}>{item.hour} hs</Text>
                          <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Llave.png")} />
                        </TouchableOpacity>
                        :
                        <View style={style.cardTurnOc} >
                          <Text style={style.textHome}>{item.hour} hs</Text>
                          <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Candado.png")} />
                        </View>
                      }
                    </View>
                  }
                />
              }
            </View>
          }
        </View>
        :
        <View style={{ marginTop: 40, marginHorizontal: 100 }}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>Elija una fecha para ver los turnos disponibles</Text>
        </View>
      }
      <ModalAlert
        isVisible={turnSaved}
        onClose={() => hideAlert()}
        title="Todo OK!"
        message="Turno guardado exitosamente!"
      />
    </View>
  );
};


export default CalendarScreen;
