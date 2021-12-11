
const getDB = require ('../../database/getDB');

const { generateRandomString, sendMail} = require ('../../helpers');

const recoveyPass = async (req, res, next) => {

    let connection;

    try {
        
        connection = await getDB();

        const {email} = req.body ;

        if(!email){
            const error = new Error ('No has introducido ningun email')
            error.httpStatus = 400 ;
            throw error;
        }

        const [user] = await connection.query (`
        SELECT id FROM user WHERE email = ?
        `,
        [email]
        );

        if(user.length > 0) {
            const recoverCode = generateRandomString(40);
            const emailBody = `Se ha solicitado la recuperación de su contraseña en Bolboreta Flight
            Este es el código de recuperacion de contraseña : ${recoverCode}.
            Si no has sido tu, ignora este email`;
        
        await sendMail({
            to:email,
            subject:'Recuperación de contraseña',
            body: emailBody,

        });

        await connection.query( `
        UPDATE user SET recoverCode = ? , modifiedAt = ? , WHERE email = ?        
        `,
        [recoverCode , new Date(), email]);
    }

        res.send({
            status:'ok',
            message: ' Si el email exite, se enviará un email para la recuperación de la contraseña, sino está en bandeja de entrada, pruebe en spam'
        });

    } catch (error) {
        next(error)
        
    }finally {
        if(connection) connection.release();
    }
};

module.exports = recoveyPass ;
