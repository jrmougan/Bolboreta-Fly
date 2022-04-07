const getDB = require('../../database/getDB');

const { generateRandomString, sendMail } = require('../../helpers');

const { PUBLIC_HOST_FRONT } = process.env;

const recoveryPass = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { email } = req.body;

        if (!email) {
            const error = new Error('No has introducido ningun email');
            error.httpStatus = 400;
            throw error;
        }

        const [user] = await connection.query(
            `
        SELECT id FROM user WHERE email = ?
        `,
            [email]
        );

        if (user.length > 0) {
            const recoverCode = generateRandomString(40);
            const emailBody = `Se ha solicitado la recuperación de su contraseña en Bolboreta Flight.<br/>
            Este es el código de recuperacion de contraseña : ${recoverCode}. <br/>
             Copialo y pegalo en el siguiente enlace :
             <a href="${PUBLIC_HOST_FRONT}resetpass"> Recupera Tu contraseña </a> . <br/>
            Si no has sido tu, ignora este email`;

            await sendMail({
                to: email,
                subject: 'Recuperación de contraseña',
                body: emailBody,
            });

            await connection.query(
                `
        UPDATE user SET recover_Code = ? , modifyDate = ?  WHERE email = ?        
        `,
                [recoverCode, new Date(), email]
            );
        }

        res.send({
            status: 'ok',
            message:
                ' Si el email existe, se enviará un email para la recuperación de la contraseña, si no está en bandeja de entrada, pruebe en spam',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = recoveryPass;
