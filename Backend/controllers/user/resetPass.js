const getDB = require('../../database/getDB');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const resetPass = async (req, res, next) => {

    let connection;

    try {
        connection = await getDB();


        const { recovercode, newpassword } = req.body;


        if (!recovercode || !newpassword) {
            const error = new Error(' Falta el código de repuperación o la contraseña');
            error.httpStatus = 404;
            throw error;
        }

        const [user] = await connection.query(`
        SELECT id FROM user WHERE recover_code = ?
        `,
            [recovercode]);

        if (user.length < 1) {
            const error = new Error('Código de recuperación incorrecto');
            error.httpStatus = 404;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(newpassword, saltRounds);

        await connection.query(`
        UPDATE user SET password = ? , recover_code = NULL, modifyDate = ?  WHERE id = ?
        `,
            [hashedPassword, new Date(), user[0].id
            ]
        );

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada'
        });



    } catch (error) {
        next(error);


    } finally {
        if (connection) connection.release();
    }
};

module.exports = resetPass;