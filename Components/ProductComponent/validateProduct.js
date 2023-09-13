const regexImage = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;
const regexAnyLetter = /[a-z]/i;
const regexAllNumbers = /^[0-9]+$/;
const regexAllLetter = /^[A-Za-z]+$/;

export function validateProduct(product, images) {
    const errors = {};
    const { name, minimalDescription, description, duration, price } = product

    if (!name) errors.name = 'hace falta un nombre';

    if (!images || images.length < 3) errors.image = "El servicio debe tener minimo 3 imagenes"

    if (!minimalDescription || !regexAnyLetter.test(minimalDescription)) errors.minimalDescription = 'tiene que haber una descripción';

    if (!description || !regexAnyLetter.test(description)) errors.description = 'tiene que haber una descripcion';

    if (!duration) errors.duration = "Debe tener una duración "

    if (!price || !regexAllNumbers.test(price)) errors.price = "El precio debe ser un numero entero"

    return errors;
}

