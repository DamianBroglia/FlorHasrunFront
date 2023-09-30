import moment from 'moment';
import 'moment/locale/es';
import axios from 'axios';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

moment.locale('es');

export const getStadistic = async (dateInit, dateFinish) => {

    let collectedDay = 0
    let futurecollectDay = 0
    let hoursDay = 0
    let totalCollected = 0
    let loseforFail = 0
    let totalHours = 0
    let loseTime = 0
    let arrayTurnsByDay = []
    let allTurns = 0
    let totalService = []
    let takedTurn = 0
    let failedTurn = 0
    let takedTurnDay = 0
    let failedTurnDay = 0
    let futureTurnDay = 0
    let futureTurn = 0
    let futureCollected = 0
    let cancelByUser = 0
    let cancelByUserDay= 0
    let cancelByAdmin = 0
    let cancelByAdminDay = 0
    let workedDays = 0
    let init = moment(dateInit, 'dddd D [de] MMMM [de] YYYY');
    let finish = moment(dateFinish, 'dddd D [de] MMMM [de] YYYY');

    if (finish.isBefore(init)) {
        console.log("las fechas estan invertidas");
    } else {
        let initInFormatString = init
        while (!finish.isBefore(initInFormatString)) {
            try {
                const date = initInFormatString.format('dddd D [de] MMMM [de] YYYY')
                const turnsBythisDay = await axios(`${API_URL}turns/byDay/${date}`)
                turnsBythisDay.data.forEach(element => {
                    if (element.state === "cancelByUser") {
                       cancelByUser = cancelByUser + 1
                       cancelByUserDay = cancelByUserDay + 1
                    }
                    if (element.state === "cancelByAdmin") {
                       cancelByAdmin = cancelByAdmin + 1
                       cancelByAdminDay = cancelByAdminDay + 1
                    }
                    if (element.state === "takedIt") {
                        totalCollected = totalCollected + element.price
                        totalHours = totalHours + (element.product.duration / 60)
                        collectedDay = collectedDay + element.price
                        hoursDay = hoursDay + (element.product.duration / 60)
                        takedTurn = takedTurn + 1
                        takedTurnDay = takedTurnDay + 1
                        totalService.push({ name: element.product.name, count: 1, failed: 0, collected: element.price })
                    }
                    if (element.state === "failed") {
                        failedTurn = failedTurn + 1
                        loseforFail = loseforFail + element.price
                        loseTime = loseTime + (element.product.duration / 60)
                        failedTurnDay = failedTurnDay + 1
                        totalService.push({ name: element.product.name, count: 0, failed: 1, collected: 0 })
                    }
                    if (element.state === "toTake") {
                        futureCollected = futureCollected + element.price
                        futurecollectDay = futurecollectDay + element.price
                        futureTurnDay = futureTurnDay + 1
                        futureTurn = futureTurn + 1
                    }
                });
                allTurns = allTurns + turnsBythisDay.data.length
                if(collectedDay > 0){
                    workedDays = workedDays + 1
                }
                let day = {
                    date,
                    collectedDay,
                    futurecollectDay,
                    hoursDay,
                    takedTurnDay,
                    failedTurnDay,
                    futureTurnDay,
                    cancelByUserDay,
                    cancelByAdminDay,
                    totalTurns: turnsBythisDay.data.length
                }
                arrayTurnsByDay.push(day)
                initInFormatString = initInFormatString.add(1, "days")
                collectedDay = 0
                hoursDay = 0
                takedTurnDay = 0
                failedTurnDay = 0
                futureTurnDay= 0
                futurecollectDay = 0
                cancelByUserDay = 0
                cancelByAdminDay = 0
            } catch (error) {
                console.log(error);
            }
        }

        for (let i = 0; i < totalService.length; i++) {
            for (let j = i + 1; j < totalService.length; j++) {
                if (totalService[i].name === totalService[j].name) {
                    totalService[i].collected = totalService[j].collected + totalService[i].collected
                    totalService[i].count = totalService[j].count + totalService[i].count
                    totalService[i].failed = totalService[j].failed + totalService[i].failed
                    totalService.splice(j, 1)
                    j = j - 1
                }
            }
        }
        totalService = totalService.sort((a, b) => b.collected - a.collected)
        let obj = {
            totalCollected,
            totalHours,
            arrayTurnsByDay,
            allTurns,
            totalService,
            takedTurn,
            failedTurn,
            futureTurn,
            futureCollected,
            cancelByUser,
            cancelByAdmin,
            loseTime,
            loseforFail,
            workedDays
        }
        return obj

    }

}