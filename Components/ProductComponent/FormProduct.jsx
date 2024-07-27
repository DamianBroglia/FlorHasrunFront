import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList, Image, ScrollView, Alert, ImageBackground } from 'react-native';
import { uploadImage, loadImageFromGalery, deleteImageCloudinary } from '../../Utils/helpers';
import { useDispatch } from 'react-redux';
import { getAllViewServi } from '../../Redux/actions/serviceActions';
import axios from "axios"
import { validateProduct } from './validateProduct';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;


const FormProduct = ({ navigation }) => {
    const [product, setProduct] = useState({
        name: "",
        image: [],
        minimalDescription: "",
        description: "",
        duration: "",
        price: ""
    })
    const [imageUrl, setImageUrl] = useState([])
    const [errors, setErrors] = useState({})
    const [isAlert, setIsAlert] = useState(false)
    const [alertOk, setAlertOk] = useState(false)
    const [alertImg, setAlertImg] = useState(false)

    const dispatch = useDispatch()


    useEffect(() => {
        const errorsX = validateProduct(product, imageUrl)
        setErrors(errorsX)
    }, [product, imageUrl])


    const postImage = async () => {
        try {
            if (imageUrl.length < 10) {
                const imagenUri = await loadImageFromGalery([1, 1])
                const urlImage = await uploadImage(imagenUri.image)
                setImageUrl([...imageUrl, urlImage])
            } else {
                setAlertImg(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletePhoto = (item) => {
        setImageUrl(
            imageUrl.filter(e => e !== item)
        )
        deleteImageCloudinary(item)
    }

    const postProduct = async () => {
        setProduct(product.image = imageUrl || [])
        const AnyError = Object.values(errors)
        const errorArray = AnyError.filter(e => e !== "")
        if (errorArray.length > 0) {
            setIsAlert(true)
        } else {
            try {
                const newProduct = await axios.post(`${API_URL}products`, product)
                if (newProduct) {
                    setAlertOk(true)
                    setProduct({
                        name: "",
                        image: [],
                        minimalDescription: "",
                        description: "",
                        duration: "",
                        price: ""
                    })
                    setImageUrl([])
                    dispatch(getAllViewServi())
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const hideAlert = () => {
        setAlertImg(false);
        setAlertOk(false)
        setIsAlert(false)
    };

    return (
        <View style={style.baseContainer}>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/FondoGris.png")} />
            <ScrollView 
            style={{width:"95%"}}>
                <View style={style.fullWidthCard}>
                    <View style={{ alignItems: "flex-start", marginTop: 15, width:"75%" }}>
                        <Text style={style.bigText}>Nombre:</Text>
                        <TextInput
                            style={style.loginInput}
                            placeholder='Nombre del Producto'
                            onChangeText={name => setProduct({ ...product, name })}
                            defaultValue={product.name}
                        >
                        </TextInput>
                    </View>
                    {errors.name ? <Text style={style.smallText}>{errors.name}</Text> : <Text style={style.smallText}>✔Nombre</Text>}

                    <View style={{ alignItems: "flex-start", marginTop: 5, width:"75%" }}>
                        <Text style={style.bigText}>Imagenes:</Text>
                        <View style={{...style.loginInput, height:160, alignItems:"center", paddingStart:0}}>
                            {imageUrl.length > 0 ?
                                <FlatList
                                    horizontal
                                    data={imageUrl}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onLongPress={() => deletePhoto(item)}>
                                            <Image style={style.bigImage} source={{ uri: item }} />
                                        </TouchableOpacity>
                                    }
                                /> :
                                <Image style={{...style.bigImage, width: 95}} source={require("../../assets/Camara.png")} />
                            }
                            <TouchableOpacity style={style.mediumButton} onPress={postImage}>
                                <Text style={style.buttonText} >Cargar Imagen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {errors.image ? <Text style={style.smallText}>{errors.image}</Text> : <Text style={style.smallText}>✔Imagenes</Text>}


                    <View style={{ alignItems: "flex-start", marginTop: 5, width:"75%" }}>
                        <Text style={style.bigText}>Descripción breve:</Text>
                        <TextInput
                            style={style.loginInput}
                            placeholder='Descripcion breve'
                            onChangeText={minimalDescription => setProduct({ ...product, minimalDescription })}
                            defaultValue={product.minimalDescription}
                        >
                        </TextInput>
                    </View>
                    {errors.minimalDescription ? <Text style={style.smallText}>{errors.minimalDescription}</Text> : <Text style={style.smallText}>✔Descripción breve </Text>}
                    <View style={{ alignItems: "flex-start", marginTop: 5, width:"75%" }}>
                        <Text style={style.bigText}>Descripción:</Text>
                        <TextInput
                            multiline={true}
                            style={{...style.loginInput, height:140}}
                            placeholder='Descripcion'
                            onChangeText={description => setProduct({ ...product, description })}
                            defaultValue={product.description}
                        >
                        </TextInput>
                    </View>
                    {errors.description ? <Text style={style.smallText}>{errors.description}</Text> : <Text style={style.smallText}>✔Descripción</Text>}



                    <View style={{ alignItems: "flex-start", width:"75%", marginTop: 5 }}>
                        <Text style={style.bigText}>Duración:</Text>
                        <View style={style.buttonsHorizontalContainer}>
                            {product.duration === "30" ?
                                <TouchableOpacity style={{...style.mediumSmallButton, width:"30%"}} onPress={() => { setProduct({ ...product, duration: "30" }) }}>
                                    <Text style={style.buttonText}>30 min</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{...style.mediumSmallButtonX, width:"30%"}} onPress={() => { setProduct({ ...product, duration: "30" }) }}>
                                    <Text style={style.buttonText}>30 min</Text>
                                </TouchableOpacity>

                            }
                            {product.duration === "60" ?
                                <TouchableOpacity style={{...style.mediumSmallButton, width:"30%"}} onPress={() => { setProduct({ ...product, duration: "60" }) }}>
                                    <Text style={style.buttonText}>60 min</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{...style.mediumSmallButtonX, width:"30%"}} onPress={() => { setProduct({ ...product, duration: "60" }) }}>
                                    <Text style={style.buttonText}>60 min</Text>
                                </TouchableOpacity>

                            }
                            {product.duration === "90" ?
                                <TouchableOpacity style={{...style.mediumSmallButton, width:"30%"}} onPress={() => { setProduct({ ...product, duration: "90" }) }}>
                                    <Text style={style.buttonText}>90 min</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{...style.mediumSmallButtonX, width:"30%"}} onPress={() => { setProduct({ ...product, duration: "90" }) }}>
                                    <Text style={style.buttonText}>90 min</Text>
                                </TouchableOpacity>

                            }

                        </View>
                    </View>

                    {errors.duration ? <Text style={style.smallText}>{errors.duration}</Text> : <Text style={style.smallText}>✔Duración</Text>}


                    <View style={{ alignItems: "flex-start", width:"75%" }}>
                        <Text style={style.bigText}>Precio:</Text>
                        <TextInput
                            style={style.loginInput}
                            placeholder='Precio'
                            onChangeText={price => setProduct({ ...product, price })}
                            defaultValue={product.price}
                        >
                        </TextInput>
                    </View>
                    {errors.price ? <Text style={style.smallText}>{errors.price}</Text> : <Text style={style.smallText}>✔Precio</Text>}

                    
                        <TouchableOpacity style={{...style.mediumButton, marginVertical:15}} onPress={postProduct}>
                            <Text style={style.buttonText}>Crear Producto</Text>
                        </TouchableOpacity>
                    
                </View>
            </ScrollView>
            <ModalAlert
                isVisible={isAlert}
                onClose={() => hideAlert()}
                title="Atención!"
                message="Faltan completar algún campo para poder postear el servicio!"
            />
            <ModalAlert
                isVisible={alertOk}
                onClose={() => hideAlert()}
                title="Servivio creado!"
                message="El servivio ha sido creado exitosamente!"
                type="ok"
            />
            <ModalAlert
                isVisible={alertImg}
                onClose={() => hideAlert()}
                title="Lo sentimos...!"
                message="No puedes cargar mas de 10 imagenes"
            />
        </View>);
};


export default FormProduct;