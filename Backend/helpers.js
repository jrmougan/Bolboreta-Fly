const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDGRID_FROM, PUBLIC_HOST } = process.env;

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
        <a href="${PUBLIC_HOST}/register/validate/${registration_code}"> Pulsa aqui </a>`;
    await sendMail({
        to: email,
        subject: 'Activación registro de Bolboreta Flight',
        body: bodyemail,
    });
}

module.exports = { hashedPassword, generateRandomString, mailVerify };
