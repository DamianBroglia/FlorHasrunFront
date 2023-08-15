import { Camera } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import { Alert } from "react-native"
import axios from "axios"
import { Cloudinary } from 'cloudinary-core';
const {
  API_KEY, API_SECRET
} = process.env;

export const loadImageFromGalery = async (array) => {
  const response = { status: false, image: null }
  const resultPermissions = await Camera.requestCameraPermissionsAsync();
  if (resultPermissions.status === "denied") {
    Alert.alert("Debes dar permiso para cargar imagenes desde tu dipositivo")
    return response
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: array
  })
  if (result.canceled) {
    return response
  }
  response.status = true
  response.image = result.uri
  return response
}

// export const uploadImage = (imageUri) => {
//     const formData = new FormData();
//     formData.append('file', {
//       uri: imageUri,
//       type: 'image/jpeg', 
//       name: 'image.jpg',
//     });
//     formData.append('upload_preset', 'Productos');

//     axios
//       .post('https://api.cloudinary.com/v1_1/dorovn0ym/image/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//       .then((response) => {
//         console.log('Imagen subida a Cloudinary:', response.data);
//         return response.data.secure_url
//       })
//       .catch((error) => {
//         console.log('Error al subir la imagen a Cloudinary:', error);
//       });
//   };

export const uploadImage = async (imageUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
  formData.append('upload_preset', 'Productos');
  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dorovn0ym/image/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    if (response.data) {
      console.log("Imagen subida a Cloudinary")
      return response.data.secure_url
    }
  } catch (error) {
    console.log("ocurrio un error:", error);
  }

};

// export const deleteImageCloudinary = async (publicId) => {
//   try {
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/dorovn0ym/delete_by_token`,
//       {
//         public_id: publicId,
//         token: `${API_SECRET}`,
//       }
//     );
//     console.log('Imagen eliminada de Cloudinary');
//   } catch (error) {
//     console.error('Error al eliminar la imagen de Cloudinary:', error);
//   }
// };

export const deleteImageCloudinary = async (imageUrl) => {
  try {
    const cloudinary = new Cloudinary({ cloud_name: 'dorovn0ym' });
    const publicId = cloudinary.url(imageUrl).public_id;

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dorovn0ym/delete_by_token`,
      {
        public_id: publicId,
        token: `${API_SECRET}`,
      }
    );
    console.log('Imagen eliminada de Cloudinary:', response.data);
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary:', error);
  }
};