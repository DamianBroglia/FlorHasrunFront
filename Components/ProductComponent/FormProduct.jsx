import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity, FlatList, Image, ScrollView, Alert, ImageBackground } from 'react-native';
import { uploadImage, loadImageFromGalery, deleteImageCloudinary } from '../../Utils/helpers';
import { useDispatch } from 'react-redux';
import { getAllViewServi } from '../../Redux/actions/serviceActions';
import axios from "axios"
import { validateProduct } from './validateProduct';
import { style } from '../Styles';
import { ModalAlert } from '../ModalAlert';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;


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
                // Alert.alert("No puedes subir mas de 10 imagenes")
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
            // Alert.alert("Faltan completar campos o algun campo fue completado de manera erronea")
        } else {
            try {
                const newProduct = await axios.post(`${API_URL}products`, product)
                if (newProduct) {
                    // Alert.alert("Producto creado con exito")
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
        <View>
            <ImageBackground style={style.backgroundImage} source={require("../../assets/Fondo.png")} />
            <ScrollView>
                <View style={style.cardUsersRegis}>
                    <View style={{ alignItems: "flex-start", marginTop: 15 }}>
                        <Text style={style.titlePropForm}>Nombre:</Text>
                        <TextInput
                            style={style.inputText}
                            placeholder='Nombre del Producto'
                            onChangeText={name => setProduct({ ...product, name })}
                            defaultValue={product.name}
                        >
                        </TextInput>
                    </View>

                    {errors.name ? <Text style={style.error}>{errors.name}</Text> : <Text style={style.ok}>✔Nombre</Text>}



                    <View style={{ alignItems: "flex-start" }}>
                        <Text style={style.titlePropForm}>Imagenes:</Text>


                        <View style={style.inputImage}>
                            {imageUrl.length > 0 ?
                                <FlatList
                                    horizontal
                                    data={imageUrl}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onLongPress={() => deletePhoto(item)}>
                                            <Image style={style.image} source={{ uri: item }} />
                                        </TouchableOpacity>
                                    }
                                /> :
                                <Image style={style.imageCam} source={require("../../assets/Camara.png")} />
                            }

                            <TouchableOpacity style={style.button} onPress={postImage}>

                                <Text style={style.buttonText} >Cargar Imagen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {errors.image ? <Text style={style.error}>{errors.image}</Text> : <Text style={style.ok}>✔Imagenes</Text>}


                    <View style={{ alignItems: "flex-start" }}>
                        <Text style={style.titlePropForm}>Descripción breve:</Text>
                        <TextInput
                            style={style.inputText}
                            placeholder='Descripcion breve'
                            onChangeText={minimalDescription => setProduct({ ...product, minimalDescription })}
                            defaultValue={product.minimalDescription}
                        >
                        </TextInput>
                    </View>
                    {errors.minimalDescription ? <Text style={style.error}>{errors.minimalDescription}</Text> : <Text style={style.ok}>✔Descripción breve </Text>}


                    <View style={{ alignItems: "flex-start" }}>
                        <Text style={style.titlePropForm}>Descripción:</Text>
                        <TextInput
                            multiline={true}
                            style={style.inputTextDescription}
                            placeholder='Descripcion'
                            onChangeText={description => setProduct({ ...product, description })}
                            defaultValue={product.description}
                        >
                        </TextInput>
                    </View>
                    {errors.description ? <Text style={style.error}>{errors.description}</Text> : <Text style={style.ok}>✔Descripción</Text>}



                    <View style={{ alignItems: "flex-start" }}>
                        <Text style={style.titlePropForm}>Duración:</Text>
                        <View style={style.inputTextMed}>
                            {product.duration === "30" ?
                                <TouchableOpacity style={style.buttonDuration} onPress={() => { setProduct({ ...product, duration: "30" }) }}>
                                    <Text style={style.buttonText}>30 min </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={style.buttonDurationNoSelect} onPress={() => { setProduct({ ...product, duration: "30" }) }}>
                                    <Text style={style.buttonText}>30 min </Text>
                                </TouchableOpacity>

                            }
                            {product.duration === "60" ?
                                <TouchableOpacity style={style.buttonDuration} onPress={() => { setProduct({ ...product, duration: "60" }) }}>
                                    <Text style={style.buttonText}>60 min </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={style.buttonDurationNoSelect} onPress={() => { setProduct({ ...product, duration: "60" }) }}>
                                    <Text style={style.buttonText}>60 min </Text>
                                </TouchableOpacity>

                            }
                            {product.duration === "90" ?
                                <TouchableOpacity style={style.buttonDuration} onPress={() => { setProduct({ ...product, duration: "90" }) }}>
                                    <Text style={style.buttonText}>90 min </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={style.buttonDurationNoSelect} onPress={() => { setProduct({ ...product, duration: "90" }) }}>
                                    <Text style={style.buttonText}>90 min </Text>
                                </TouchableOpacity>

                            }

                        </View>
                    </View>

                    {errors.duration ? <Text style={style.error}>{errors.duration}</Text> : <Text style={style.ok}>✔Duración</Text>}


                    <View style={{ alignItems: "flex-start" }}>
                        <Text style={style.titlePropForm}>Precio:</Text>
                        <TextInput
                            style={style.inputText}
                            placeholder='Precio'
                            onChangeText={price => setProduct({ ...product, price })}
                            defaultValue={product.price}
                        >
                        </TextInput>
                    </View>
                    {errors.price ? <Text style={style.error}>{errors.price}</Text> : <Text style={style.ok}>✔Precio</Text>}

                    <View style={{ marginVertical: 15 }}>
                        <TouchableOpacity style={style.button} onPress={postProduct}>
                            <Text style={style.buttonText}>Crear Producto</Text>
                        </TouchableOpacity>
                    </View>
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