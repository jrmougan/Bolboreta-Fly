const bcrypt = require('bcrypt');
const crypto = require('crypto');

//Encriptación de la contraseña

async function hashedPassword(password, saltRounds) {
    return await bcrypt.hash(password, saltRounds);
}

//cadena de texto aleatoria

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}
module.exports = { hashedPassword, generateRandomString };
