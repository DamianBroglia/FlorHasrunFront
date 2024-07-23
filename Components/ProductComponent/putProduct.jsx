
import React, { useState } from 'react';
import { TextInput, ScrollView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, loadImageFromGalery, deleteImageCloudinary } from '../../Utils/helpers';
import { getAllViewServi, getServiceId } from '../../Redux/actions/serviceActions';
import axios from "axios";
import { ModalAlert } from '../ModalAlert';
import { style } from '../Styles';
const regexAllNumbers = /^[0-9]+$/;
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

const PutProduct = () => {
    const service = useSelector((state) => state.services.detail)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState({
        name: false,
        image: false,
        minimalDescription: false,
        description: false,
        duration: false,
        price: false,
    })

    const [product, setProduct] = useState({
        productId: service.id,
        name: "",
        image: "",
        minimalDescription: "",
        description: "",
        duration: "",
        price: "",
    })

    const [imagen, setImagen] = useState([...service.image])
    const [imageChange, setImageChange] = useState(false)
    const [noMoreImage, setNoMoreImage] = useState(false)
    const [minImage, setMinImage] = useState(false)
    const [deletedImage, setDeletedImage] = useState(false)
    const [priceInteger, setPriceInteger] = useState(false)
    const [serviceChanged, setServiceChanged] = useState(false)

    const postImage = async () => {
        try {
            if (imagen.length < 10) {
                const imagenUri = await loadImageFromGalery([1, 1])
                const urlImage = await uploadImage(imagenUri.image)
                setImagen([...imagen, urlImage])
                setImageChange(true)
            } else {
                setNoMoreImage(true)
                // Alert.alert("No puedes subir mas de 10 imagenes")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletePhoto = (item) => {
        setImagen(
            imagen.filter(e => e !== item)
        )
        deleteImageCloudinary(item)
        // Alert.alert("Imagen eliminada con exito")
        setDeletedImage(true)
        setImageChange(true)
    }

    const saveChange = async () => {
        if (imageChange) {
            if (imagen.length < 3) {
                // Alert.alert("El servicio debe tener al menos 3 imagenes descriptivas")
                setMinImage(true)
            } else {
                setProduct(product.image = imagen)
            }
        }
        if (product.price) {
            if (!regexAllNumbers.test(product.price)) {
                // Alert.alert("Recuerda que el precio debe ser un numero entero")
                setPriceInteger(true)
            }
        }
        try {
            const newProduct = await axios.put(`${API_URL}products`, product)
            if (newProduct.data) {
                // Alert.alert("Producto modificado con exito")
                setServiceChanged(true)
                setProduct({
                    productId: service.id,
                    name: "",
                    image: "",
                    minimalDescription: "",
                    description: "",
                    duration: "",
                    price: ""
                })
                setImagen([])
                dispatch(getAllViewServi())
                dispatch(getServiceId(product.productId))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const hideAlert = () => {
        setNoMoreImage(false)
        setMinImage(false)
        setDeletedImage(false)
        setPriceInteger(false)
        setServiceChanged(false)
    };

    return (
        <ScrollView>
            <View style={{ alignItems: "center" }}>
                <View style={style.cardPutSer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={style.titleDate}>Nombre</Text>
                        <Text style={style.titleStadistic}>{service.name}</Text>
                    </View>
                    {product.name ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.titleDate}>Nuevo Nombre</Text>
                            <Text style={style.titleStadistic}>{product.name}</Text>
                        </View> : null
                    }

                    <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, name: true })}>
                        <Text style={style.buttonText}> Editar </Text>
                    </TouchableOpacity>

                    {edit.name ?
                        <View>
                            <TextInput
                                style={style.loginInput}
                                placeholder='Nuevo nombre...'
                                onChangeText={name => setProduct({ ...product, name })}
                                defaultValue={product.name}
                            >
                            </TextInput>
                            <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, name: false })}>
                                <Text style={style.buttonText}> Ok </Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>


                <View style={style.cardPutSer}>
                    <Text style={style.titleDate}>Imagenes:</Text>
                    <FlatList
                        horizontal
                        data={imagen}
                        renderItem={({ item }) =>
                            <TouchableOpacity onLongPress={() => deletePhoto(item)}>
                                <Image style={style.imagePutSer} source={{ uri: item }} />
                            </TouchableOpacity>
                        }
                    />
                    <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, image: true })}>
                        <Text style={style.buttonText}> Editar </Text>
                    </TouchableOpacity>
                    {edit.image ?
                        <View>
                            <TouchableOpacity style={style.button} onPress={postImage}>
                                <Text style={style.buttonText}> Agregar imagen </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, image: false })}>
                                <Text style={style.buttonText}> Ok </Text>
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>


                <View style={style.cardPutSer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={style.titleDate}>Descripción corta</Text>
                        <Text style={style.textPutSer}>{service.minimalDescription}</Text>
                    </View>
                    {product.minimalDescription ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.titleDate}>Nueva descripción corta</Text>
                            <Text style={style.textPutSer}>{product.minimalDescription}</Text>
                        </View> : null
                    }
                    <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, minimalDescription: true })}>
                        <Text style={style.buttonText}> Editar </Text>
                    </TouchableOpacity>
                    {edit.minimalDescription ?
                        <View>
                            <TextInput
                                style={style.loginInput}
                                placeholder='Nuevo descripción minima...'
                                onChangeText={minimalDescription => setProduct({ ...product, minimalDescription })}
                                defaultValue={product.minimalDescription}
                            >
                            </TextInput>
                            <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, minimalDescription: false })}>
                                <Text style={style.buttonText}> Ok </Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                </View>


                <View style={style.cardPutSer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={style.titleDate}>Descripción</Text>
                        <Text style={style.textPutSer}>{service.description}</Text>
                    </View>
                    {product.description ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.titleDate}>Nueva descripción</Text>
                            <Text style={style.textPutSer}>{product.description}</Text>
                        </View> : null
                    }
                    <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, description: true })}>
                        <Text style={style.buttonText}> Editar </Text>
                    </TouchableOpacity>
                    {edit.description ?
                        <View>
                            <TextInput
                                multiline={true}
                                style={style.loginInputDescription}
                                // placeholder={service.description}
                                onChangeText={description => setProduct({ ...product, description })}
                                defaultValue={service.description}

                            >
                            </TextInput>
                            <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, description: false })}>
                                <Text style={style.buttonText}> Ok </Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>

                <View style={style.cardPutSer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={style.titleDate}>Duración</Text>
                        <Text style={style.textInfo}>{service.duration} minutos</Text>
                    </View>
                    {product.duration ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.titleDate}>Nueva duración</Text>
                            <Text style={style.textInfo}>{product.duration} minutos</Text>
                        </View> : null
                    }
                    <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, duration: true })}>
                        <Text style={style.buttonText}> Editar </Text>
                    </TouchableOpacity>
                    {edit.duration ?
                        <View>
                            <View style={style.loginInputMed}>
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
                            <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, duration: false })}>
                                <Text style={style.buttonText}> Ok </Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>

                <View style={style.cardPutSer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={style.titleDate}>Precio</Text>
                        <Text style={style.priceServ}>$ {service.price}</Text>
                    </View>
                    {product.price ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={style.titleDate}>Nuevo precio</Text>
                            <Text style={style.priceServ}>$ {product.price}</Text>
                        </View> : null
                    }
                    <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, price: true })}>
                        <Text style={style.buttonText}> Editar </Text>
                    </TouchableOpacity>
                    {edit.price ?
                        <View>
                            <TextInput
                                style={style.loginInput}
                                placeholder='Nuevo precio...'
                                onChangeText={price => setProduct({ ...product, price })}
                                defaultValue={product.price}
                            >
                            </TextInput>
                            <TouchableOpacity style={style.button} onPress={() => setEdit({ ...edit, price: false })}>
                                <Text style={style.buttonText}> Ok </Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>

                <TouchableOpacity style={style.button} onPress={saveChange}>
                    <Text style={style.buttonText}> Guardar Cambios </Text>
                </TouchableOpacity>

                <ModalAlert
                    isVisible={noMoreImage}
                    onClose={hideAlert}
                    title="Lo sentimos..."
                    message="No puede subir mas de 10 imagenes"
                />
                <ModalAlert
                    isVisible={minImage}
                    onClose={hideAlert}
                    title="Atencion!"
                    message="El minimo de imagenes de un servivio debe ser 3"
                />
                <ModalAlert
                    isVisible={deletedImage}
                    onClose={hideAlert}
                    title="Imagen eliminada!"
                    message="La imagen ha sido eliminada con exito"
                    type="ok"
                />
                <ModalAlert
                    isVisible={priceInteger}
                    onClose={hideAlert}
                    title="Atención!"
                    message="El precio debe ser un numero entero"
                />
                <ModalAlert
                    isVisible={serviceChanged}
                    onClose={hideAlert}
                    title="Servicio modificado!"
                    message="El servicio ha sido modificado con exito"
                    type="ok"
                />
            </View>
        </ScrollView>
    );
}


export default PutProduct;