import moment from 'moment';
import 'moment/locale/es';
import axios from 'axios';


moment.locale('es');

export const getStadistic = async (dateInit, dateFinish) => {

    let collectedDay = 0
    let futurecollectDay= 0
    let hoursDay = 0
    let totalCollected = 0
    let totalHours = 0
    let arrayTurnsByDay = []
    let allTurns = 0
    let totalService = []
    let takedTurn = 0
    let failedTurn = 0
    let takedTurnDay = 0
    let failedTurnDay = 0
    let futureCollected = 0

    let init = moment(dateInit, 'dddd D [de] MMMM [de] YYYY');
    let finish = moment(dateFinish, 'dddd D [de] MMMM [de] YYYY');

    if (finish.isBefore(init)) {
        console.log("las fechas estan invertidas");
    } else {
        let initInFormatString = init
        while (!finish.isBefore(initInFormatString)) {
            try {
                const date = initInFormatString.format('dddd D [de] MMMM [de] YYYY')
                const turnsBythisDay = await axios(`http://192.168.0.111:3001/turns/byDay/${date}`)
                turnsBythisDay.data.forEach(element => {
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
                        totalCollected = totalCollected + (element.price / 2)
                        collectedDay = collectedDay + (element.price / 2)
                        failedTurn = failedTurn + 1
                        failedTurnDay = failedTurnDay + 1
                        totalService.push({ name: element.product.name, count: 0, failed: 1, collected: element.price / 2 })
                    }
                    if (element.state === "toTake") {
                        futureCollected = futureCollected + element.price
                        futurecollectDay = futurecollectDay + element.price
                    }

                    // totalService.forEach(el => {
                    //         if (el.name === element.product.name ) {
                    //             el.count = el.count + 1
                    //             el.totalCollect = el.totalCollect + element.price
                    //         } else {
                    //             totalService.push({ name: element.product.name, price: element.price })
                    //         }
                    // })

                    // totalService.push({ name: element.product.name, count: 1, totalCollect: element.price })

                    // if(totalService.hasOwnProperty(element.product.name)){
                    //         totalService[element.product.name] = totalService[element.product.name] + 1
                    // }else{
                    //     totalService[element.product.name] = 1
                    // }

                });

                allTurns = allTurns + turnsBythisDay.data.length

                let futureTurnDay = turnsBythisDay.data.length - takedTurnDay - failedTurnDay

                let day = {
                    date,
                    collectedDay,
                    futurecollectDay,
                    hoursDay,
                    takedTurnDay,
                    failedTurnDay,
                    futureTurnDay,
                    totalTurns: turnsBythisDay.data.length
                }

                arrayTurnsByDay.push(day)
                initInFormatString = initInFormatString.add(1, "days")
                collectedDay = 0
                hoursDay = 0
                takedTurnDay = 0
                failedTurnDay = 0
                futurecollectDay= 0

            } catch (error) {
                console.log(error);
            }
        }

        for (let i = 0; i < totalService.length; i++) {
            for (let j = i + 1; j < totalService.length; j++) {
                if (totalService[i].name === totalService[j].name) {
                    totalService[j].collected = totalService[j].collected + totalService[i].collected
                    totalService[j].count = totalService[j].count + totalService[i].count
                    totalService[j].failed = totalService[j].failed + totalService[i].failed
                    totalService.splice(i, 1)
                    j = j - 1
                }
            }
        }

        totalService = totalService.sort((a, b) => b.collected - a.collected)
        let futureTurn = allTurns - takedTurn - failedTurn

        let obj = {
            totalCollected,
            totalHours,
            arrayTurnsByDay,
            allTurns,
            totalService,
            takedTurn,
            failedTurn,
            futureTurn,
            futureCollected
        }
        return obj

    }

}