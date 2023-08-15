const regexImage = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;
const regexAnyLetter = /[a-z]/i;
const regexAllNumbers = /^[0-9]+$/;
const regexAllLetter = /^[A-Za-z]+$/;

export function validateUser(user) {
    const errors = {};
    const { name, lastname, celNumber,  password} = user

    if (!name || !regexAnyLetter.test(name)) errors.name = 'hace falta un nombre';

    if (!lastname || !regexAnyLetter.test(lastname)) errors.lastname = 'hace falta un apellido';
        
    if(!regexAllNumbers.test(celNumber)) errors.celNumber = 'Debe ser un numero!';

    if (!celNumber )  errors.celNumber = 'hace falta un numero de celular';

    if (!password) errors.password = "hace falta una contraseña"

    return errors;
}