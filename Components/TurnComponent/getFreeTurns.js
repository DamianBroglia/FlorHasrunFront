
export const getFreeTurns = (turns) => {

    const array = [
        { hour: "9:00", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "9:30", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "10:00", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "10:30", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "11:00", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "11:30", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "15:00", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "15:30", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "16:00", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "16:30", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "17:00", free: true, name: "", turnId: "", userId: "", userCredits: "" },
        { hour: "17:30", free: true, name: "", turnId: "", userId: "", userCredits: "" }
    ]
    turns = turns.filter((e) => e.state !== "cancelByAdmin" && e.state !== "cancelByUser")

    if (turns.length > 0) {
        if (turns[0].product.name === "Dia Bloqueado") {
            array.map(e => e.free = false)
            array[0].name = "Dia Bloqueado"
            array[0].turnId = turns[0].id
        } else {
            turns.forEach(element => {
                for (let i = 0; i < array.length; i++) {
                    if (element.hourInit === array[i].hour) {
                        array[i].free = false
                        array[i].name = element.product.name
                        array[i].turnId = element.id
                        array[i].userId = element.user.id
                        array[i].userCredits = element.user.credits
                        if (Number(element.product.duration) >= 60 && array[i].hour !== "11:30" && array[i].hour !== "17:30") {
                            array[i + 1].free = false
                            array[i].name = element.product.name
                            array[i + 1].turnId = element.id
                            array[i + 1].userId = element.user.id
                            array[i + 1].userCredits = element.user.credits
                        }
                        if (element.product.duration === "90" && array[i].hour !== "11:30" && array[i].hour !== "11:00" && array[i].hour !== "17:30" && array[i].hour !== "17:00") {
                            array[i + 2].free = false
                            array[i].name = element.product.name
                            array[i + 2].turnId = element.id
                            array[i + 2].userId = element.user.id
                            array[i + 2].userCredits = element.user.credits
                        }
                    }
                }
            });
        }
    }

    return array

}