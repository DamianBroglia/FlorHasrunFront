
export const getFreeTurns = (turns) => {
    const array = [
        { hour: "9:00", free: true },
        { hour: "9:30", free: true },
        { hour: "10:00", free: true },
        { hour: "10:30", free: true },
        { hour: "11:00", free: true },
        { hour: "11:30", free: true },
        { hour: "15:00", free: true },
        { hour: "15:30", free: true },
        { hour: "16:00", free: true },
        { hour: "16:30", free: true },
        { hour: "17:00", free: true },
        { hour: "17:30", free: true }
    ]

    if(turns.length > 0){
        turns.forEach(element => {
            for (let i = 0; i < array.length; i++) {
                if (element.hourInit === array[i].hour) {
                    array[i].free = false
                    if (Number(element.product.duration) >= 60 && array[i].hour !== "11:30" && array[i].hour !== "17:30") {
                        array[i + 1].free = false
                    }
                    if (element.product.duration === "90" && array[i].hour !== "11:30" && array[i].hour !== "11:00" && array[i].hour !== "17:30" && array[i].hour !== "17:00") {
                        array[i + 2].free = false
                    }
                }
            }
        });
    }


    return array

}