

export const getInfoUser = (turnsArray) => {
    const info = {}
    let expectedProfit = 0
    let charged = 0
    let collectedWorked = 0
    let toCollect = 0
    let loseForFail = 0
    let loseTimeForFail = 0
    let pasTime = 0
    let totalTime = 0
    let futureTime = 0

    const filterFuture = turnsArray.filter((e) => e.state === "toTake")
    info.futureTurns = filterFuture.length

    const filterPast = turnsArray.filter((e) => e.state !== "toTake")
    info.pastTurns = filterPast.length

    // Agregar turnos cancelados por usuario y por admin

    const filterCumplidos = turnsArray.filter((e) => e.state === "takedIt")
    info.complied = filterCumplidos.length

    const filterFail = turnsArray.filter((e) => e.state === "failed")
    info.failed = filterFail.length

    turnsArray.forEach(ele => {
        expectedProfit = expectedProfit + ele.price
        totalTime = totalTime + Number(ele.product.duration)
    });

    info.expectedProfit = expectedProfit
    info.totalTime = totalTime

    filterCumplidos.forEach(ele => {
        collectedWorked = collectedWorked + ele.price
        charged = charged + ele.price
        pasTime = pasTime + Number(ele.product.duration)
    })

    info.collectedWorked = collectedWorked
    info.pasTime = pasTime

    filterFail.forEach(ele => {
        // charged = charged + (ele.price / 2)
        // loseForFail = loseForFail + (ele.price / 2)
        loseForFail = loseForFail + ele.price 
        loseTimeForFail = loseTimeForFail + Number(ele.product.duration)
    })

    filterFuture.forEach(ele => {
        // charged = charged + (ele.price / 2)
        // toCollect = toCollect + (ele.price / 2)
        toCollect = toCollect + ele.price 
        futureTime = futureTime + Number(ele.product.duration)
    })

    info.charged = charged
    info.futureTime = futureTime
    info.toCollect = toCollect


    if (filterPast.length === 0) {
        info.averageAssists = "-"
        info.promeDurationMoney = 0
    } else {
        info.averageAssists = filterCumplidos.length * 100 / filterPast.length
        info.promeDurationMoney = collectedWorked / (pasTime / 60)
    }

    info.loseForFail = loseForFail
    info.loseTimeForFail = loseTimeForFail

    if (info.averageAssists === 100) info.class = "Super"
    if (info.averageAssists >= 80 && info.averageAssists < 100) info.class = "A"
    if (info.averageAssists >= 60 && info.averageAssists < 80) info.class = "B"
    if (info.averageAssists >= 40 && info.averageAssists < 60) info.class = "C"
    if (info.averageAssists < 40) info.class = "D"
    if (info.averageAssists === "-") info.class = "Nuevo S/C"

    return info

}