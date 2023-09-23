import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
import { getTurnByDayAction } from '../../Redux/actions/turnActions';
import { getFreeTurns } from './getFreeTurns';
import { getUserByIdAction, getAllUserAction } from '../../Redux/actions/userActions';
import axios from "axios"
import moment from 'moment';
import 'moment/locale/es';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import { CancelModal } from './CancelModal';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

moment.locale('es');

const CalendarScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)
  const allUsers = useSelector((state) => state.users.allUsers)
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
  const [turnSavedCredits, setTurnSavedCredits] = useState(false)
  const [dateNotFormat, setDateNotFormta] = useState(null)
  const [alertNoCredits, setAlertNoCredits] = useState(false)
  const [blockTurnAnyWay, setBlockTurnAnyWay] = useState(false)
  const [blockAlert, setBlockAlert] = useState(false)
  const [disblockedAlert, setDisblockedAlert] = useState(false)
  const [disblockAlert, setDisblockAlert] = useState(false)
  const [alertturnBlock, setAlertTurnBlock] = useState(false)
  const [dataBlockDisblockTurn, setDataBlockDisblockTurn] = useState({})
  const [blockDayAlert, setBlockDayAlert] = useState(false)
  const [blockDayAnyWayAlert, setBlockDayAnyWayAlert] = useState(false)
  const [blockedAlert, setBloquedAlert] = useState(false)
  const [disblockDay, setDisblockDay] = useState(false)
  const [disblockedDayAlert, setDisblocedkDayAlert] = useState(false)


  useEffect(() => {
    setLoading(true)
    dispatch(getTurnByDayAction(selectedDate))
  }, [selectedDate]);


  useEffect(() => {
    if (selectedDate) {
      const freeTurnsArray = getFreeTurns(turnsDay)
      setFreeTurs([...freeTurnsArray])
      setLoading(false)
    }
  }, [turnsDay]);



  const saveTurn = (hour) => {
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
        }
      }
      if (service.duration === "90") {
        if (hour === "17:00" || hour === "11:00") {
          if (freeTurns[index + 1].free === true) {
            setConfirmTurn(hour)
          } else {
            setIsAlertVisible(true)
          }
        } else {
          if (freeTurns[index + 1].free === true && freeTurns[index + 2].free === true) {
            setConfirmTurn(hour)
          } else {
            setIsAlertVisible(true)
          }
        }
      }
    }
  }

  const hideAlert = () => {
    setIsAlertVisible(false);
    setTurnSaved(false)
    setTurnSavedCredits(false)
    setAlertNoCredits(false)
    setBlockTurnAnyWay(false)
    setBlockAlert(false)
    setDisblockedAlert(false)
    setAlertTurnBlock(false)
    setDisblockAlert(false)
    setBloquedAlert(false)
    setBlockDayAlert(false)
    setBlockDayAnyWayAlert(false)
    setDisblocedkDayAlert(false)
    setDisblockDay(false)
  };

  const postTurn = async () => {
    try {
      if (user.credits > 1 || user.vip) {
        const newTurnSave = await axios.post(`${API_URL}turns`, newTurn)
        if (newTurnSave.data) {
          if (!user.vip) {
            const setUser = await axios.put(`${API_URL}users`, { userId: user.id, credits: String(Number(user.credits) - 2) })
            if (setUser.data) {
              setTurnSavedCredits(true)
              dispatch(getUserByIdAction(user.id))
              dispatch(getAllUserAction())
            }
          } else {
            setTurnSaved(true)
          }
          setConfirmTurn(null)
          dispatch(getTurnByDayAction(selectedDate))
        }
      } else {
        setAlertNoCredits(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const blockDisblockTurn = (hour, name, turnId, userId, userCredits, free) => {
    setNewTurn({
      ...newTurn,
      hourInit: hour,
      productId: service.id,
      price: service.price,
    })
    if (free) {
      setBlockAlert(true)
    } else {
      setDataBlockDisblockTurn({
        hour,
        name,
        turnId,
        userId,
        userCredits
      })
      if (name === "Turno Bloqueado") {
        setDisblockAlert(true)
      } else {
        setBlockTurnAnyWay(true)
      }
    }
  }

  const cancelTurn = async () => {
    const canceledTurn = await axios.put(`${API_URL}turns`, { turnId: dataBlockDisblockTurn.turnId, state: "cancelByAdmin" })
    if (canceledTurn.data) {
      setDisblockedAlert(true)
      dispatch(getTurnByDayAction(selectedDate))
    }
  }

  const postBlockDisblockTurn = async (state) => {
    try {
      const newTurnSave = await axios.post(`${API_URL}turns`, newTurn)
      if (newTurnSave.data) {
        if (state === "ocuped") {
          const canceledTurn = await axios.put(`${API_URL}turns`, { turnId: dataBlockDisblockTurn.turnId, state: "cancelByAdmin" })
          if (canceledTurn.data) {
            const setUser = await axios.put(`${API_URL}users`, { userId: dataBlockDisblockTurn.userId, credits: String(Number(dataBlockDisblockTurn.userCredits) + 2) })
            if (setUser.data) {
              setAlertTurnBlock(true)
              dispatch(getAllUserAction())
            }
          }
        } else {
          setAlertTurnBlock(true)
        }
        dispatch(getTurnByDayAction(selectedDate))
      }
    } catch (error) {
      console.log(error);
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

  const blockDay = () => {
    setNewTurn({
      ...newTurn,
      hourInit: "9:00",
      productId: service.id,
      price: service.price,
    })
    const turnFiltered = turnsDay.filter((e) => e.state !== "cancelByAdmin" && e.state !== "cancelByUser")
    const turnDobleFilter = turnFiltered.filter((e) => e.product.name !== "Turno Bloqueado" && e.product.name !== "Dia Bloqueado")
    if (turnDobleFilter.length > 0) {
      setBlockDayAnyWayAlert(true)
    } else {
      setBlockDayAlert(true)
    }
  }

  const BlockedDay = async (stateDay) => {
    try {
      const newTurnSave = await axios.post(`${API_URL}turns`, newTurn)
      if (newTurnSave.data) {
        if (stateDay === "ocuped") {
          const filterTurn = turnsDay.filter(e => e.state !== "cancelByAdmin" && e.state !== "cancelByUser")
          for (let i = 0; i < filterTurn.length; i++) {
            const cancelTurn = await axios.put(`${API_URL}turns`, { turnId: filterTurn[i].id, state: "cancelByAdmin" })
            if (cancelTurn.data) {
              const setUser = await axios.put(`${API_URL}users`, { userId: filterTurn[i].user.id, credits: String(Number(filterTurn[i].user.credits) + 2) })
              if (setUser.data) {
                setBloquedAlert(true)
                dispatch(getAllUserAction())
              }
            }
          }
        } else {
          setBloquedAlert(true)
        }
        dispatch(getTurnByDayAction(selectedDate))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const disblockDayHandler = async () => {
    try {
      const cancelTurn = await axios.put(`${API_URL}turns`, { turnId: freeTurns[0].turnId, state: "cancelByAdmin" })
      if (cancelTurn.data) {
        setDisblocedkDayAlert(true)
        dispatch(getTurnByDayAction(selectedDate))
      }
    } catch (error) {
      console.log();
    }

  }

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
            <View style={{ alignItems: "center", marginTop: 70 }}>
              <ActivityIndicator size="large" color='rgb(252, 181, 180)' />
              <Text style={style.titleStadistic}>Cargando turnos...</Text>
            </View>
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
                  ListHeaderComponent={
                    service.name === "Dia Bloqueado" &&
                    <View>
                      {freeTurns[0].name === "Dia Bloqueado" ?
                        <TouchableOpacity style={style.button} onPress={() => setDisblockDay(true)}>
                          <Text style={style.buttonText} >Desbloquear dia</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={style.button} onPress={() => blockDay()}>
                          <Text style={style.buttonText} >Bloquear dia</Text>
                        </TouchableOpacity>
                      }

                    </View>
                  }
                  numColumns={3}
                  renderItem={({ item }) =>
                    service.name === "Dia Bloqueado" ?
                      <View>
                        {item.free ?
                          <View style={style.cardTurnBlockDay}>
                            <Text style={style.textHome}>{item.hour} hs</Text>
                            <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Llave.png")} />
                          </View>
                          :
                          <View style={style.cardTurnOcBlockDay}>
                            <Text style={style.textHome}>{item.hour} hs</Text>
                            <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Candado.png")} />
                          </View>
                        }
                      </View>
                      :
                      <View>
                        {user.name === "Flor" && user.lastname === "Hasrun" ?
                          <View>
                            {item.free ?
                              <TouchableOpacity style={style.cardTurn} onPress={() => blockDisblockTurn(item.hour, item.name, item.turnId, item.userId, item.userCredits, item.free)}>
                                <Text style={style.textHome}>{item.hour} hs</Text>
                                <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Llave.png")} />
                              </TouchableOpacity>
                              :
                              <TouchableOpacity style={style.cardTurnOc} onPress={() => blockDisblockTurn(item.hour, item.name, item.turnId, item.userId, item.userCredits, item.free)}>
                                <Text style={style.textHome}>{item.hour} hs</Text>
                                <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Candado.png")} />
                              </TouchableOpacity>
                            }
                          </View>
                          :
                          <View>
                            {item.free ?
                              <TouchableOpacity style={style.cardTurn} onPress={() => saveTurn(item.hour)}>
                                <Text style={style.textHome}>{item.hour} hs</Text>
                                <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Llave.png")} />
                              </TouchableOpacity>
                              :
                              <View style={style.cardTurnOc}>
                                <Text style={style.textHome}>{item.hour} hs</Text>
                                <Image style={style.imageIconsTurnCalendar} source={require("../../assets/Candado.png")} />
                              </View>
                            }
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
        isVisible={isAlertVisible}
        onClose={hideAlert}
        title="Lo sentimos..."
        message="El turno es muy corto para el servicio que se desea tomar"
      />
      <ModalAlert
        isVisible={turnSaved}
        onClose={() => hideAlert()}
        title="Turno Guardado!"
        message="Se ha guardado el turno exitosamente!"
        type="ok"
      />
      <ModalAlert
        isVisible={alertNoCredits}
        onClose={() => hideAlert()}
        title="Creditos insuficientes!"
        message="No puedes guardar el turno por falta de credito"

      />
      <ModalAlert
        isVisible={turnSavedCredits}
        onClose={() => hideAlert()}
        title="Turno Guardado!"
        message="Se ha guardado el turno exitosamente! Se le descontaran 2 creditos, si asiste al turno o cancela dos dias antes del dia del turno, se le retornarán dichos creditos"
        type="ok"
      />
      <ModalAlert
        isVisible={alertturnBlock}
        onClose={() => hideAlert()}
        title="Turno Bloqueado"
        message="Ningun usuario podrá guardar este turno"
        type="ok"
      />
      <ModalAlert
        isVisible={disblockedAlert}
        onClose={() => hideAlert()}
        title="Turno desbloqueado"
        message="Turno desbloqueado, ahora puede ser guardado por un usuario"
        type="ok"
      />
      <ModalAlert
        isVisible={blockedAlert}
        onClose={() => hideAlert()}
        title="Dia Bloqueado"
        message="Ningun usuario podrá guardar un turno en esta fecha"
        type="ok"
      />
      <ModalAlert
        isVisible={disblockedDayAlert}
        onClose={() => hideAlert()}
        title="Dia Desbloqueado"
        message="Ya se pueden guardar los turno de este dia"
        type="ok"
      />
      <CancelModal
        isVisible={blockTurnAnyWay}
        onClose={() => hideAlert()}
        cancelAny={() => postBlockDisblockTurn("ocuped")}
        title="Atención!"
        message="Este turno ya esta guardado por un cliente, si lo bloquea, cuando lo desbloquee se perderá el turno, desea bloquearlo de todos modos?"
        buttonText="Bloquear igual"
      />
      <CancelModal
        isVisible={blockAlert}
        onClose={() => hideAlert()}
        cancelAny={() => postBlockDisblockTurn()}
        title="Atención!"
        message="Desea bloquear el turno? nadie podrá guardarlo"
        buttonText="Bloquear"
      />
      <CancelModal
        isVisible={disblockAlert}
        onClose={() => hideAlert()}
        cancelAny={() => cancelTurn()}
        title="Desbloquear turno"
        message="Desea desbloquear el turno?"
        buttonText="Desbloquear"
      />
      <CancelModal
        isVisible={blockDayAlert}
        onClose={() => hideAlert()}
        cancelAny={() => BlockedDay()}
        title="Bloquear dia?"
        message="Ningun usuario podrá guardar turno en este día"
        buttonText="Bloquear"
      />
      <CancelModal
        isVisible={blockDayAnyWayAlert}
        onClose={() => hideAlert()}
        cancelAny={() => BlockedDay("ocuped")}
        title="Bloquear dia?"
        message="Este dia tiene turnos guardados, si lo bloquea los turnos se perderán, desea bloquear de todos modos?"
        buttonText="Bloquear"
      />
      <CancelModal
        isVisible={disblockDay}
        onClose={() => hideAlert()}
        cancelAny={() => disblockDayHandler()}
        title="Desbloquear dia?"
        message="El día quedará completamente libre"
        buttonText="Desbloquear"
      />
    </View>
  );
};


export default CalendarScreen;
