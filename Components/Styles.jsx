import { StyleSheet } from 'react-native';

const buttonBase = {
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginHorizontal: 3,
}
const buttons = {
    ...buttonBase,
    backgroundColor: 'rgb(252, 181, 180)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 5
}
const buttonsNoSelect = {
    ...buttonBase,
    backgroundColor: "rgba(252, 181, 180, 0.3)",
}
const cards = {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 6,
    marginVertical: 8,
    alignItems: "center",
    marginHorizontal: 20
}
const border = {
    borderColor: "rgb(252, 181, 180)",
    borderStyle: "solid",
    borderWidth: 2,
}
const propertyTextBase = {
    fontSize: 20,
    fontWeight: "800",
    color: 'rgb(212, 141, 140)',
}
const msj = {
    fontWeight: "600",
    color: "rgb(80,80,80)",
}
const littleMsjBase = {
    fontSize: 8,
    fontWeight: "500",
    color: "rgb(80,80,80)",
}
const textLittleBase = {
    fontSize: 13,
    fontWeight: "700",
    color: 'rgb(212, 141, 140)',
    textAlign: "center",
    width: 47,
}
const errorOk = {
    fontSize: 12,
    marginBottom: 4
}
const title = {
    color: 'rgb(202, 131, 130)',
    fontWeight: "600",
}
const textBase = {
    textAlign: "center",
    fontSize: 16,
    marginTop: 2,
    marginBottom: 15,
    color: "dimgrey",
    marginHorizontal: 7
}
const nameBase = {
    fontSize: 22,
    fontWeight: 'bold'
}
const inputForm = {
    borderColor: "rgb(194, 161, 138)",
    borderWidth: 1,
    borderStyle: "solid",
    width: 250,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 18,
}
const titleBrow = {
    fontSize: 18,
    fontWeight: "500",
    color: "rgb(194, 161, 138)",
}
const medium = {
    fontSize: 12,
    marginTop: -2,
    marginBottom: 6
}
const imageUserBase = {
    height: 35,
    width: 35,
    objectFit: "cover",
}
const imageIconsBase = {
    height: 60,
    width: 60,
    objectFit: "cover",
    opacity: 0.6,
}
const imageBase = {
    borderRadius: 3,
    objectFit: "cover"
}

export const style = StyleSheet.create({

    //_____________BUTTONS______________

    button: {
        ...buttons
    },
    buttonFino: {
        ...buttons,
        paddingVertical: 3,
        marginBottom: 3
    },
    buttonPage: {
        ...buttons,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    buttonPageNoSelected: {
        ...buttonsNoSelect,
        marginVertical: 5,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    buttonOrderUser: {
        ...buttons,
        width: 173,
        paddingVertical: 2,
        marginVertical: 2,
        borderRadius: 3,
        marginHorizontal: 2
    },
    buttonInstagram: {
        ...buttons,
        width: 150,
        backgroundColor: "rgb(193, 53, 132)",
        paddingVertical: 8
    },
    buttonWhatsapp: {
        ...buttons,
        width: 150,
        backgroundColor: "rgb(37, 211, 102)",
        paddingVertical: 8
    },
    buttonHome: {
        ...buttons,
        width: 150,
    },
    buttonFilterTurn: {
        ...buttons,
        width: 114,
        paddingHorizontal: 2
    },
    buttonFilterTurnSelect: {
        ...buttonsNoSelect,
        width: 114,
        paddingHorizontal: 2,
        marginVertical: 5
    },
    buttonStadistic: {
        ...buttons,
        width: 120
    },
    buttonNotification: {
        ...buttons,
        width: 95,
        paddingHorizontal: 5
    },
    buttonNotifNotSelect: {
        ...buttonsNoSelect,
        width: 95,
        paddingHorizontal: 5
    },
    littleButton: {
        ...buttons,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginHorizontal: 1,
        marginVertical: 1,
        backgroundColor: 'rgb(205, 181, 197)',
    },
    buttonServ: {
        ...buttonsNoSelect,
        backgroundColor: 'rgba(252, 181, 180, 0.7)',
        borderRadius: 0,
        width: 216,
        marginHorizontal: 1,
        marginVertical: 1,
        height: 40,
        paddingHorizontal: 2,
        paddingVertical: 1,
        justifyContent: "center"
    },
    buttonDuration: {
        ...buttons,
        paddingHorizontal: 10,
    },
    buttonNoSelect: {
        ...buttonsNoSelect
    },
    buttonDurationNoSelect: {
        ...buttonsNoSelect,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonAlert: {
        ...buttonsNoSelect,
        backgroundColor: 'rgb(252, 181, 180)',
    },

    //_______________CARS_______________

    cardUsers: {
        ...cards
    },
    cardUser: {
        ...cards,
        alignItems: "flex-start",
    },
    cardModalUserTurns: {
        ...cards,
        ...border,
        paddingHorizontal: 15
    },
    cardModalUserTurns2: {
        ...cards,
        ...border,
    },
    cardModalUserTurns3: {
        ...cards,
        ...border,
        paddingHorizontal: 3,
        width: 300,
        marginVertical: 2,
        paddingVertical: 2
    },
    cardAgenda: {
        ...cards,
        ...border,
        paddingHorizontal: 15,
        alignItems: "flex-start"
    },
    cardUserTurns: {
        ...cards,
        width: 149,
        marginHorizontal: 0,
        marginLeft: 20
    },
    cardModalStadistic: {
        ...cards,
        backgroundColor: 'rgb(255,255,255)',
        marginVertical: 30,
        paddingVertical: 30
    },
    cardStadistic: {
        ...cards,
        alignItems: "flex-start",
    },
    cardUsersRegis: {
        ...cards,
        marginHorizontal: 25
    },
    cardService: {
        ...cards,
        marginHorizontal: 10
    },
    cardTurn: {
        ...cards,
        height: 106,
        width: 110,
        marginHorizontal: 4,
        marginVertical: 4,
        backgroundColor: 'rgba(240,255,240,0.8)',
    },
    cardTurnBlockDay: {
        ...cards,
        height: 93,
        width: 110,
        marginHorizontal: 4,
        marginVertical: 4,
        backgroundColor: 'rgba(240,255,240,0.8)',
    },
    cardTurnConf: {
        ...cards,
        backgroundColor: 'rgb(255,255,255)',
        height: 415,
        width: 312,
    },
    cardTurnOc: {
        ...cards,
        height: 106,
        width: 110,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 4,
        marginVertical: 4
    },
    cardTurnOcBlockDay: {
        ...cards,
        height: 93,
        width: 110,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 4,
        marginVertical: 4
    },
    cardConfTurn: {
        ...inputForm,
        alignItems: "center",
        paddingVertical: 3,
        width: 140,
        marginHorizontal: 4
    },
    alerta: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        paddingHorizontal: 25
    },
    cardPutSer: {
        ...cards,
        width: 312,
    },
    containerHomeVideo: {
        alignItems: "center",
        backgroundColor: "white",
        height: 600
    },

    //________________TEXT________________

    class: {
        ...border,
        fontSize: 20,
        borderWidth: 3,
        width: 35,
        height: 35,
        borderRadius: 20,
        paddingHorizontal: 6,
        paddingVertical: 3,
        fontWeight: "700",
        color: 'rgb(212, 141, 140)',
    },
    propertyUser: {
        ...border,
        borderWidth: 5,
        borderRadius: 100,
        paddingHorizontal: 9,
        paddingVertical: 5,
        alignItems: "center",
    },
    propertyUserSmall: {
        ...border,
        borderWidth: 3,
        borderRadius: 100,
        paddingHorizontal: 7,
        paddingVertical: 4,
        alignItems: "center",
    },
    propertyUserOpac: {
        borderColor: 'rgba(252, 181, 180, 0.3)',
        borderWidth: 5,
        borderStyle: "solid",
        borderRadius: 100,
        paddingHorizontal: 9,
        paddingVertical: 5,
        alignItems: "center",
    },
    propertyText: {
        ...propertyTextBase,
        fontSize: 28,
        width: 70,
        textAlign: "center"
    },
    propertyTextLong: {
        ...propertyTextBase,
        fontSize: 28,
    },
    propertyTextFilter: {
        ...propertyTextBase,
    },
    propertyTextSmall: {
        ...propertyTextBase,
        width: 40,
        textAlign: "center"
    },
    propertyTextMedium: {
        ...propertyTextBase,
        width: 70,
        textAlign: "center"
    },
    propertyTextLittle: {
        ...propertyTextBase,
        fontSize: 17,
        textAlign: "center"
    },
    propertyTextLittleLimit: {
        fontSize: 17,
        ...propertyTextBase,
        textAlign: "center",
        width: 80,
    },
    propertyTextLittleLimit3: {
        ...textLittleBase,
    },
    propertyTextLittleLimit4: {
        ...textLittleBase,
        width: 19,
    },
    propertyTextLittleLimit2: {
        ...propertyTextBase,
        fontSize: 17,
        textAlign: "center",
        width: 35,
    },
    propertyTextFilterOpac: {
        fontSize: 20,
        fontWeight: "600",
        color: 'rgba(212, 141, 140, 0.3)',
    },
    littleMsj: {
        ...littleMsjBase,
    },
    littleMediumMsj: {
        ...littleMsjBase,
        fontSize: 11,
        marginTop: -2,
        marginBottom: -3
    },
    mediumMsj: {
        ...msj,
        ...medium
    },
    mediumMsj2: {
        ...msj,
        ...medium,
        textAlign: "center"
    },
    mediumHome: {
        ...msj,
        ...medium,
        marginBottom: 0,
        textAlign: "center"
    },
    mediumBlue: {
        ...msj,
        ...medium,
        color: "rgb(80,80,240)",
        marginBottom: 0,
        textAlign: "center"
    },
    mediumText: {
        ...msj,
        fontSize: 14,
        textAlign: "center"
    },
    titleTurnUser: {
        fontSize: 20,
        color: 'rgb(202, 131, 130)',
        marginBottom: 15
    },
    titleBig: {
        ...title,
        fontSize: 26,
        marginBottom: 8
    },
    titleTurnUser2: {
        ...title,
        fontSize: 22,
        marginBottom: 15,
        width: 215
    },
    titleTurnUser3: {
        ...title,
        fontSize: 18,
    },
    userCredits: {
        fontSize: 20,
        marginTop: -43,
        marginLeft: -1,
        fontWeight: "700",
        color: "rgb(210, 174, 104)"
    },
    creditsNumber: {
        fontSize: 18,
        color: "rgb(210, 174, 109)",
        marginRight: -16,
        marginLeft: 6,
        fontWeight: "600",
        zIndex: 1,
        marginTop: 3
    },
    creditsVip: {
        fontSize: 10,
        fontWeight: "600",
        zIndex: 1,
        marginTop: -13,
        marginLeft: 18
    },
    error: {
        ...errorOk,
        color: "rgb(194, 161, 138)",
    },
    ok: {
        ...errorOk,
        color: "green",
    },
    msjNotification: {
        fontSize: 11,
        color: "rgb(194, 161, 138)",
    },
    titlePropForm: {
        ...titleBrow,
        marginLeft: 20,
        backgroundColor: "rgb(255,250,250)",
        marginBottom: -6,
        zIndex: 1,
    },
    titleDateTurn: {
        ...titleBrow,
    },
    titleDateTurn2: {
        ...titleBrow,
        color: 'rgb(212, 141, 140)',
    },
    titleStadistic: {
        fontSize: 20,
        fontWeight: "500"
    },
    textRed: {
        fontSize: 12,
        color: "red"
    },
    textgreen: {
        fontSize: 12,
        color: "green"
    },
    priceServ: {
        fontSize: 18,
        color: "green",
        marginVertical: 10
    },
    propTurn: {
        fontSize: 18,
        fontWeight: "500",
        color: "rgb(194, 161, 138)",
    },
    titleServ: {
        fontSize: 22,
        fontWeight: "600"
    },
    titleHome: {
        fontSize: 24,
        color: "dimgrey"
    },
    textInfo: {
        fontSize: 15,
        fontWeight: "bold",
    },
    text: {
        ...textBase,
    },
    textPutSer: {
        ...textBase,
        marginBottom: 2,
    },
    name: {
        ...nameBase,
    },
    nameUser: {
        ...nameBase,
        width: 265,
        marginBottom: 5
    },
    titleDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "darkslateblue"
    },
    message: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: "center"
    },
    buttonNot: {
        fontSize: 7,
        marginBottom: 15,
        marginLeft: -6,
        zIndex: 1
    },
    //________________IMPUTS______________

    inputImage: {
        ...inputForm,
        height: 160,
        alignItems: "center"
    },
    inputText: {
        ...inputForm,
        height: 38,
        paddingHorizontal: 10,
    },
    inputTextDescription: {
        ...inputForm,
        height: 138,
        paddingHorizontal: 10,
        textAlign: "center"
    },
    inputTextMed: {
        ...inputForm,
        height: 60,
        paddingHorizontal: 6,
        flexDirection: "row"
    },
    searchUser: {
        ...inputForm,
        marginVertical: 10,
        height: 40,
        width: 150,
        paddingHorizontal: 10
    },

    //________________IMAGE______________

    viewPassword: {
        position: "absolute",
        height: 20,
        width: 26,
        opacity: 0.4,
        left: 220,
        top: -29
    },
    backgroundImage: {
        position: "absolute",
        height: 595,
        width: 360,
        objectFit: "cover",
    },
    imageLupa: {
        height: 24,
        width: 23,
        objectFit: "cover",
    },
    imageUserList: {
        ...imageUserBase,
    },
    imageUserListOpac: {
        ...imageUserBase,
        opacity: 0.3,
    },
    imageOjo: {
        ...imageUserBase,
        width: 47,
    },
    imageOjoOpac: {
        ...imageUserBase,
        width: 47,
        opacity: 0.3,
    },
    image: {
        ...imageBase,
        height: 100,
        width: 100,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    imagePutSer: {
        ...imageBase,
        height: 80,
        width: 80,
        marginHorizontal: 4,
    },
    imageHome: {
        ...imageBase,
        height: 330,
        width: 240,
        marginHorizontal: 4,
    },
    imageServ: {
        ...imageBase,
        height: 216,
        width: 216,
        marginHorizontal: 3,
    },
    imageServ2: {
        ...imageBase,
        height: 105,
        width: 105,
        marginBottom: 4,
    },
    imageLogo: {
        ...imageBase,
        height: 105,
        width: 200,
        marginVertical: 15,
    },
    imageBlockPag: {
        height: 91,
        width: 90,
        objectFit: "cover",
        opacity: 0.8,
        marginVertical: 18
    },
    imageVerified: {
        height: 23,
        width: 23,
        objectFit: "cover",
        marginVertical: 4,
    },
    imageIcons: {
        ...imageIconsBase,
        marginVertical: 18
    },
    imageIconsStadistic: {
        ...imageIconsBase,
        marginVertical: 10,
        marginHorizontal: 25
    },
    imageIconsTurn: {
        ...imageIconsBase,
    },
    imageCam: {
        ...imageIconsBase,
        height: 64,
        width: 84,
        marginVertical: 20
    },
    imageIconsTurnCalendar: {
        ...imageIconsBase,
        height: 28,
        width: 28,
    },
    imageDetail: {
        height: 330,
        width: 330,
        objectFit: "cover",
        marginHorizontal: 7,
        marginVertical: 10,
        borderRadius: 10
    },
    imageDelete: {
        height: 130,
        width: 160,
        objectFit: "cover",
        marginHorizontal: 4,
        position: "absolute",
        top: -270,
        left: 60
    },
    video: {
        width: 300,
        height: 300,
    },
    imageHomeLogo: {
        width: 227,
        height: 119,
        marginLeft: 1,
        marginTop: 80,
        marginBottom: 50,
        alignSelf: "center"

    },
    imageSocial: {
        width: 25,
        height: 25,
        marginRight: 10
    },
})
