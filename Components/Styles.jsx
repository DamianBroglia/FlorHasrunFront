import { StyleSheet } from 'react-native';

const shadow = {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
}

const border = {
    borderColor: "rgb(203,171,148)",
    borderWidth: 2.5,
    borderStyle: "solid",
}

const button = {
    ...border,
    width: 180,
    height: 42,
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: "rgb(47,44,54)",
    alignItems: "center",
    justifyContent: "center"
}
const card = {
    ...border,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(47,44,54,0.8)",
}



export const style = StyleSheet.create({

    //////////////////////////////////////
    //                                  //
    //             IMAGES               //
    //                                  //
    //////////////////////////////////////

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
    },
    imageHomeLogo: {
        height: "22%",
        aspectRatio: 1.91,
        alignSelf: "center",
        marginTop: "4%",
        marginBottom: "6%"
    },
    veryBigImage: {
        width: 190,
        height: 190,
        objectFit: "cover",
        marginTop: "9%",
        marginBottom:"4%"
    },
    bigImage: {
        width: 72,
        height: 72,
        objectFit: "cover",
        marginTop: "9%",
        marginBottom:"4%"
    },
    mediumImage: {
        width: 50,
        height: 50,
        objectFit: "cover",
        marginTop: "9%"
    },
    smallImage: {
        width: 36,
        height: 36,
        objectFit: "cover",
    },
    usersImage: {
        width: "11%",
        aspectRatio:1,
        objectFit: "cover",
    },
    eyeImage: {
        width: 25,
        height: 20,
        objectFit: "cover",
    },
    imageServ: {
        borderRadius: 5,
        objectFit: "cover",
        width: "66%",
        aspectRatio: 1,
    },
    imageServ2: {
        borderRadius: 5,
        objectFit: "cover",
        width: "95%",
        aspectRatio: 1,
    },
    imageServ3: {
        borderRadius: 5,
        objectFit: "cover",
        width: "40%",
        aspectRatio: 1,
    },

    imageStack: {
        height: "90%",
        objectFit: "cover",
        aspectRatio: 2.5,
        // transform:[{ scaleX: -1 }]
    },
    imageStackLeft: {
        height: "90%",
        objectFit: "cover",
        aspectRatio: 2.5,
        transform: [{ scaleX: -1 }]
    },
    imageDelete:{
        width:222,
        height:180,
        position:"absolute",
        top:"15%",
        right:"5%",
        zIndex:1
    },
    //////////////////////////////////////
    //                                  //
    //             BUTTONS              //
    //                                  //
    //////////////////////////////////////

    veryBigButton: {
        ...button,
        ...shadow,
        width:250
    },
    bigButton: {
        ...button,
        ...shadow
    },
    mediumButton: {
        ...button,
        ...shadow,
        width: 160,
    },
    smallButton: {
        ...button,
        ...shadow,
        width: 120,
    },
    mediumSmallButton: {
        ...button,
        ...shadow,
        width: 107,
        marginBottom:3
    },
    mediumSmallButtonX: {
        ...button,
        borderColor: "rgba(203,171,148, 0.7)",
        backgroundColor: "rgb(27,24,34)",
        width: 107,
        marginBottom:3

    },
    verySmallButton: {
        ...button,
        ...shadow,
        width: 42,
    },

    ////////////////////////////////////
    //                                //
    //              TEXT              //
    //                                //
    ////////////////////////////////////

    buttonText: {
        color: "rgb(203,171,148)",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonTextX: {
        color: "rgba(203,171,148,0.7)",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    title: {
        fontSize: 22,
        fontWeight: "500",
        color: "rgb(203,171,148)",
        textAlign:"center"
    },
    VerybigText: {
        fontSize: 18,
        textAlign: "center",
        color: "rgb(233,201,178)",
    },
    bigText: {
        fontSize: 16,
        textAlign: "center",
        color: "rgb(233,201,178)",
    },
    mediumText: {
        fontSize: 14,
        textAlign: "center",
        color: "rgb(233,201,178)",
    },
    smallText: {
        fontSize: 12,
        textAlign: "center",
        color: "rgb(243,211,188)",
    },

    ////////////////////////////////////
    //                                //
    //             CARDS              //
    //                                //
    ////////////////////////////////////

    modalCard: {
        ...card,
        backgroundColor: "rgb(47,44,54)",
        top: "27%",
        position:"absolute",
        height: "40%",
        width: "94%",
        borderRadius: 25,
        justifyContent: "space-around",
        paddingVertical: "3%"
    },
    fullWidthCard: {
        ...card,
        width: "96%",
        marginVertical: 8,
        paddingVertical: 10
    },
    mediumCard: {
        ...card,
        width: "70%",
        height: "40%",
        justifyContent: "space-around"
    },
    turnCard: {
        ...card,
        width: "97%",
        aspectRatio:1,
        backgroundColor:"rgba(203,171,148,0.3)"
    },
    turnCardX: {
        ...card,
        width: "97%",
        aspectRatio:1,
        backgroundColor:"rgba(203,171,148,0.1)"
    },
    smallCard: {
        ...card,
        width: "40%",
        aspectRatio:1,
        // backgroundColor:"rgba(203,171,148,0.3)"
    },
    SmallMediumCard: {
        ...card,
        paddingVertical:8,
        width: "45%",
        // backgroundColor:"rgba(203,171,148,0.3)"
    },
    litleCard: {
        borderWidth: 1.5,
        borderColor: "rgb(203,171,148)",
        borderRadius: 10,
        width: "45%",
        alignItems: "center",
        backgroundColor: "rgba(203,171,148, 0.1)"
    },
    veryLitleCard: {
        borderWidth: 1.5,
        borderColor: "rgb(203,171,148)",
        borderRadius: 10,
        width: "30%",
        aspectRatio:1.6,
        alignItems: "center",
        backgroundColor: "rgba(203,171,148, 0.1)"
    },

    ////////////////////////////////////
    //                                //
    //           CONTAINERS           //
    //                                //
    ////////////////////////////////////


    baseContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    containerButtonsHome: {
        height: "68%",
        justifyContent: "space-between",
    },
    block: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(47,44,54,0.8)",
        position: "absolute"
    },
    imageContainerServ: {
        width: "96%",
        flexDirection: "row",
        marginVertical: 10
    },

    containerInput: {
        alignItems: "flex-start",
        marginBottom: 15,
        width: "70%"
    },
    eyeContainer: {
        position: "absolute",
        right: "5%",
        top: "50%"
    },
    turnContainer: {
        width: "33.3%",
        aspectRatio:1,
        alignItems:"center"
    },
    buttonsHorizontalContainer:{
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent:"space-around", 
        width:"100%", 
        marginVertical:5
    },
    calendar:{
        marginTop: 30, 
        marginHorizontal: 20,
        borderRadius: 8
    },
    //////////////////////////////////////
    //                                  //
    //             INPUTS               //
    //                                  //
    //////////////////////////////////////

    loginInput: {
        ...border,
        borderRadius: 10,
        borderWidth: 1.5,
        width: "100%",
        height: 38,
        backgroundColor: "rgba(203,171,148, 0.15)",
        paddingStart: 10,
        fontSize: 17,
        color: "rgb(253,221,198)",
    }
})
