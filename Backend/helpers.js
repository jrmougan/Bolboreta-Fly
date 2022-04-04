const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const sharp = require('sharp');
const { ensureDir, unlink } = require('fs-extra');
const uuid = require('uuid');

const { SENDGRID_API_KEY, SENDGRID_FROM, PUBLIC_HOST_FRONT, UPLOAD_DIRECTORY } =
    process.env;

// ruta directorio donde guardar avatar

const uploadDir = path.join(__dirname, UPLOAD_DIRECTORY);

sgMail.setApiKey(SENDGRID_API_KEY);

//Encriptación de la contraseña

async function hashedPassword(password, saltRounds) {
    return await bcrypt.hash(password, saltRounds);
}

// cadena de texto aleatoria //

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

//enviar mail //

async function sendMail({ to, subject, body }) {
    try {
        const msg = {
            to,
            from: SENDGRID_FROM,
            subject,
            text: body,
            html: `
            <div>
            <h1>${subject}</h1>
            <p>${body}</p>
            </div>`,
        };

        await sgMail.send(msg);
    } catch (_) {
        throw new Error(
            'No se ha podido enviar el Email, compruebe que está todo bien'
        );
    }
}

// enviar email de verificación //

async function mailVerify(email, registration_code) {
    const bodyemail = `
        Para activar tu registro en Bolboreta Flight, 
        pulsa el link siguiente para verificar tu email:
        <a href="${PUBLIC_HOST_FRONT}register/validate/${registration_code}"> Pulsa aqui </a>`;
    await sendMail({
        to: email,
        subject: 'Activación registro de Bolboreta Flight',
        body: bodyemail,
    });
}

//guardar foto/avatar

async function savePhoto(image, maxwidth) {
    try {
        await ensureDir(uploadDir);

        const sharpImage = sharp(image.data);

        const infoImage = await sharpImage.metadata();

        // Todas las fotos/avatares van a tener un tamaño máximo.
        if (infoImage.width > maxwidth) {
            sharpImage.resize(maxwidth);
        }

        // Rotar imagen.
        sharpImage.rotate();

        //Nombre único para cada foto/avatar.
        const imgName = uuid.v4() + '.jpg';

        //ruta absoluta foto/avatar
        const imagePath = path.join(uploadDir, imgName);

        //Guardamos foto/avatar
        await sharpImage.toFile(imagePath);

        return imgName;
    } catch (_) {
        throw new Error('Error al procesar la imagen');
    }
}

//Borrar foto/Avatar

async function deletePhoto(photoname) {
    try {
        if (!photoname.includes('http')) {
            const photoPath = path.join(uploadDir, photoname);

            await unlink(photoPath);
        }
    } catch (_) {
        throw new Error(
            'No se ha podido eliminar la foto/avatar del servidor.'
        );
    }
}

module.exports = {
    hashedPassword,
    generateRandomString,
    mailVerify,
    savePhoto,
    deletePhoto,
    sendMail,
};
