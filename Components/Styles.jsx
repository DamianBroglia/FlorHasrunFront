import { StyleSheet } from 'react-native';


const buttons = {
    backgroundColor: 'rgb(252, 181, 180)',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 15,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 3,
    marginVertical: 5
}
const buttonsNoSelect = {
    backgroundColor: "rgba(252, 181, 180, 0.3)",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginHorizontal: 3
}
const cards = {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 6,
    marginVertical: 8,
    // shadowColor: '#000',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 3,
    alignItems: "center",
    marginHorizontal: 20
}
const topBorderContainer = {
    borderTopColor: "darkslateblue",
    borderStyle: "solid",
    borderTopWidth: 1,
}
const borderRightLeft = {
    borderRightColor: "darkslateblue",
    borderStyle: "solid",
    borderLeftWidth: 1,
    borderLeftColor: "darkslateblue",
    borderRightWidth: 1,
}
const borderBottom = {
    borderStyle: "solid",
    borderBottomColor: "darkslateblue",
    borderBottomWidth: 1,
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
const textTurn = {
    ...borderBottom,
    ...topBorderContainer,
    fontSize: 28,
    fontWeight: "500",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    color: "forestgreen",
    textAlign: "center",
    marginTop: 10
}
const textTurnbig = {
    fontSize: 44,
    fontWeight: "700",
    marginHorizontal: 14,
    paddingVertical: 10,
    color: "forestgreen",
    textAlign: "center",
    marginTop: 15,
    borderBottomColor: "forestgreen",
    borderBottomWidth: 2,
    borderTopColor: "forestgreen",
    borderTopWidth: 2
}
const titleBrow = {
    fontSize: 18,
    fontWeight: "500",
    color: "rgb(194, 161, 138)",
}

export const style = StyleSheet.create({

    //_____________BUTTONS______________

    button: {
        ...buttons
    },
    // buttonFacebook: {
    //     ...buttons,
    //     width: 305,
    //     backgroundColor:"rgb(59, 89, 152)"
    // },
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
        ...buttons,
        width: 75,
        marginHorizontal: 1,
        marginVertical: 1,
        height: 35,
        paddingHorizontal: 2,
        paddingVertical: 1,
        justifyContent: "center"
    },
    buttonTextServ: {
        color: '#FFF',
        fontSize: 11,
        textAlign: 'center',
        fontWeight: "500"
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
        // marginTop:10
    },

    //_______________CARS_______________

    containerStadistic: {
        ...topBorderContainer,
        marginTop: 10,
        alignItems: "center",
        paddingTop: 10
    },
    infoStadisticDay: {
        ...borderBottom,
        marginBottom: 4,
        paddingBottom: 4,
        alignItems: "center"
    },
    cardUsers: {
        ...cards
    },
    cardUser: {
        ...cards,
        alignItems: "flex-start",
    },
    cardModalUserTurns: {
        ...cards,
        // marginHorizontal: 5,
        borderColor:"rgb(252, 181, 180)",
        borderStyle:"solid",
        borderWidth:2,
        paddingHorizontal:15
    },
    cardModalUserTurns2: {
        ...cards,
        // marginHorizontal: 5,
        borderColor:"rgb(252, 181, 180)",
        borderStyle:"solid",
        borderWidth:2,
     
    },
    cardAgenda: {
        ...cards,
        // marginHorizontal: 5,
        borderColor:"rgb(252, 181, 180)",
        borderStyle:"solid",
        borderWidth:2,
        paddingHorizontal:15,
        alignItems:"flex-start"
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
    cardAdminControl: {
        ...cards,
        height: 150,
        width: 150,
        objectFit: "cover",
    },
    containerServ: {
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "seashell"
    },
    secondContainer: {
        ...topBorderContainer,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 45,
        justifyContent: "center",
        marginBottom: 10
    },
    thirdContainer: {
        marginHorizontal: 5,
        alignItems: "center",
        padding: 10,
        marginVertical: 4,
    },
    thirdContainerCenter: {
        marginHorizontal: 10,
        alignItems: "center",
        padding: 10,
        marginVertical: 4,
        ...borderRightLeft,

    },
    containerEstadistica: {
        ...topBorderContainer,
        ...borderBottom,
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 5,
        paddingVertical: 3,

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
    // cardTurn: {
    //     ...cards,
    //     height: 415,
    //     width: 312,
    // },
    cardTurnConf: {
        ...cards,
        backgroundColor: 'rgb(255,255,255)',
        height: 415,
        width: 312,
    },
    // cardTurnConf: {
    //     ...cards,
    //     position: "absolute",
    //     backgroundColor: 'rgb(255,255,255)',
    //     height: 415,
    //     width: 312,
    // },
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
    // cardTurnOc: {
    //     ...cards,
    //     height: 415,
    //     width: 312,
    //     backgroundColor: 'rgba(255,255,255,0.3)',
    // },
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

    class:{
        fontSize:20,
        borderColor:'rgb(252, 181, 180)',
        borderWidth:3,
        borderStyle:"solid",
        width:35,
        height:35,
        borderRadius:20,
        paddingHorizontal:6,
        paddingVertical:3,
        fontWeight:"700",
        color:'rgb(212, 141, 140)',
        // marginRight:14
    },
    propertyUser:{
        borderColor:'rgb(252, 181, 180)',
        borderWidth:5,
        borderStyle:"solid",
        borderRadius:100,
        paddingHorizontal:9,
        paddingVertical:5,
        alignItems:"center",
        // backgroundColor:"rgba(252, 181, 180, 0.3)"
    },
    propertyUserSmall:{
        borderColor:'rgb(252, 181, 180)',
        borderWidth:3,
        borderStyle:"solid",
        borderRadius:100,
        paddingHorizontal:7,
        paddingVertical:4,
        alignItems:"center",
        // backgroundColor:"rgba(252, 181, 180, 0.3)"
    },
    propertyUserOpac:{
        borderColor:'rgba(252, 181, 180, 0.3)',
        borderWidth:5,
        borderStyle:"solid",
        borderRadius:100,
        paddingHorizontal:9,
        paddingVertical:5,
        alignItems:"center",
        // backgroundColor:"rgba(252, 181, 180, 0.3)"
    },
    propertyText:{
        fontSize:28,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
        width:60,
        textAlign:"center"
    },
    propertyTextLong:{
        fontSize:28,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
    },
    propertyTextFilter:{
        fontSize:20,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
    },
    propertyTextSmall:{
        fontSize:20,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
        width:40,
        textAlign:"center"
    },
    propertyTextMedium:{
        fontSize:20,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
        width:70,
        textAlign:"center"
    },
    propertyTextLittle:{
        fontSize:17,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
        textAlign:"center"
    },
    propertyTextLittleLimit:{
        fontSize:17,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
        textAlign:"center",
        width:80,
    },
    propertyTextLittleLimit3:{
        fontSize:13,
        fontWeight:"700",
        color:'rgb(212, 141, 140)',
        textAlign:"center",
        width:47,
    },
    propertyTextLittleLimit4:{
        fontSize:13,
        fontWeight:"700",
        color:'rgb(212, 141, 140)',
        textAlign:"center",
        width:18,
    },
    propertyTextLittleLimit2:{
        fontSize:17,
        fontWeight:"800",
        color:'rgb(212, 141, 140)',
        textAlign:"center",
        width:35,
    },
    propertyTextOpac:{
        fontSize:28,
        fontWeight:"800",
        color:'rgba(212, 141, 140, 0.3)',
    },
    propertyTextFilterOpac:{
        fontSize:20,
        fontWeight:"600",
        color:'rgba(212, 141, 140, 0.3)',
    },

    littleMsj:{
        fontSize:8,
        fontWeight:"500",
        color:"rgb(80,80,80)",
    },
    littleMediumMsj:{
        fontSize:11,
        fontWeight:"500",
        color:"rgb(80,80,80)",
        marginTop:-2,
        marginBottom:-3
    },
    mediumMsj:{
        fontSize:12,
        fontWeight:"600",
        color:"rgb(80,80,80)",
        marginTop:-2,
        marginBottom:6
    },
    mediumText:{
        fontSize:14,
        fontWeight:"600",
        color:"rgb(80,80,80)",
        textAlign:"center"
    },

    titleTurnUser:{
        fontSize:20,
        color:'rgb(202, 131, 130)',
        marginBottom:15
    },
    titleBig:{
        fontSize:26,
        color:'rgb(202, 131, 130)',
        marginBottom:8,
        fontWeight:"600"
    },
    titleTurnUser2:{
        fontSize:22,
        color:'rgb(202, 131, 130)',
        marginBottom:15,
        fontWeight:"600",
        width:215
    },

    userCredits:{
        fontSize:20,
        marginTop:-43,
        marginLeft:-1,
        fontWeight:"700",
        color:"rgb(210, 174, 104)"
    },

    text: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 2,
        marginBottom: 15,
        color: "dimgrey",
        marginHorizontal: 7
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
        // color: "rgb(210, 174, 109)",
        fontWeight: "600",
        zIndex: 1,
        marginTop: -13,
        marginLeft: 18
    },

    error: {
        fontSize: 12,
        color: "rgb(194, 161, 138)",
        marginBottom: 4
    },
    msjNotification: {
        fontSize: 11,
        color: "rgb(194, 161, 138)",
    },
    ok: {
        fontSize: 12,
        color: "green",
        marginBottom: 4
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
        color:'rgb(212, 141, 140)',
    },
    titleStadistic: {
        fontSize: 20,
        fontWeight: "500"
    },
    totalStadistic: {
        fontSize: 23,
        fontWeight: "600"
    },
    future: {
        fontSize: 16,
        fontWeight: "400",
        color: "green"
    },
    textRed: {
        fontSize: 12,
        color: "red"
    },
    textgreen: {
        fontSize: 12,
        color: "green"
    },
    stadisticInfo: {
        fontSize: 16,
        fontWeight: "500",
    },
    priceServ: {
        fontSize: 18,
        color: "green",
        marginVertical: 10
    },
    priceServTurns: {
        fontSize: 18,
        color: "green",
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
    msjHome: {
        textAlign: "center",
        fontSize: 12,
        color: "firebrick",
        marginHorizontal: 12,
        marginBottom: 20
    },
    totals: {
        fontSize: 18,
        fontWeight: "bold",
        color: "darkslateblue"
    },
    textInfo: {
        fontSize: 15,
        fontWeight: "bold",
    },
    textNotification: {
        fontSize: 16,
        fontWeight: "bold",
        // marginHorizontal:27
    },
    textInfoCenter: {
        ...borderRightLeft,
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 3,
        paddingHorizontal: 3
    },
    textHome: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 2,
        marginBottom: 15,
        color: "dimgrey",
        marginHorizontal: 7
    },
    textPutSer: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        color: "dimgrey",
        marginHorizontal: 7
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    nameUser: {
        fontSize: 22,
        fontWeight: 'bold',
        width:265,
        marginBottom:5
    },
    titleInfo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "darkslateblue"
    },
    titleDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "darkslateblue"
    },
    phoneNumber: {
        fontSize: 16,
        marginBottom: 4,
    },
    message: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: "center"
    },
    textHoursGreen: {
        ...textTurn,
        borderBottomColor: "green",
        borderTopColor: "green"
    },
    textHoursRed: {
        ...textTurn,
        borderBottomColor: "red",
        borderTopColor: "red",
        color: "red"
    },

    text2: {
        ...textTurnbig,
    },
    text2b: {
        ...textTurnbig,
        color: "red",
        borderBottomColor: "red",
        borderTopColor: "red"
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

    imageCam: {
        height: 64,
        width: 84,
        objectFit: "cover",
        opacity: 0.6,
        marginVertical: 20
    },
    image: {
        height: 100,
        width: 100,
        objectFit: "cover",
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 3
    },
    imageTurn: {
        height: 80,
        width: 80,
        objectFit: "cover",
        marginVertical: 30,
        marginHorizontal: 5,
        borderRadius: 3,
        opacity: 0.6,

    },
    imagePutSer: {
        height: 80,
        width: 80,
        objectFit: "cover",
        marginHorizontal: 4,
        borderRadius: 3
    },
    imageLupa: {
        height: 24,
        width: 23,
        objectFit: "cover",
    },
    imageUserList: {
        height: 35,
        width: 35,
        objectFit: "cover",
        // marginRight:14
    },
    imageUserListOpac: {
        height: 35,
        width: 35,
        objectFit: "cover",
        opacity: 0.3,
        // marginRight:14
    },
    imageOjo: {
        height: 35,
        width: 47,
        objectFit: "cover",
        // marginRight:14
    },
    imageOjoOpac: {
        height: 35,
        width: 47,
        objectFit: "cover",
        opacity: 0.3,
        // marginRight:14
    },
    imageHome: {
        height: 330,
        width: 240,
        objectFit: "cover",
        marginHorizontal: 4,
        borderRadius: 3
    },
    imageServ: {
        height: 216,
        width: 216,
        objectFit: "cover",
        marginHorizontal: 3,
        borderRadius: 3
    },
    imageServ2: {
        height: 105,
        width: 105,
        objectFit: "cover",
        marginBottom: 4,
        borderRadius: 3
    },
    imageIcons: {
        height: 60,
        width: 60,
        objectFit: "cover",
        opacity: 0.6,
        marginVertical: 18
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

    imageIconsStadistic: {
        height: 60,
        width: 60,
        objectFit: "cover",
        opacity: 0.6,
        marginVertical: 10,
        marginHorizontal: 25
    },
    imageIconsTurnCalendar: {
        height: 28,
        width: 28,
        objectFit: "cover",
        opacity: 0.6,
    },
    imageIconsTurn: {
        height: 60,
        width: 60,
        objectFit: "cover",
        opacity: 0.6,
    },
    imageLogo: {
        height: 105,
        width: 200,
        objectFit: "cover",
        marginVertical: 15,
        borderRadius: 3
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
