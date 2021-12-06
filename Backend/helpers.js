const bcrypt = require('bcrypt');
const crypto = require('crypto');
const format = require('date-fns');

//Encriptación de la contraseña

async function hashedPassword(password, saltRounds) {
    return await bcrypt.hash(password, saltRounds);
}

//cadena de texto aleatoria

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

// Estructura de la fecha

function formatDate(date) {
    return format(date, 'yyy-MM-dd HH:mm:ss');
}

module.exports = {
    hashedPassword,
    generateRandomString,
    formatDate,
};
