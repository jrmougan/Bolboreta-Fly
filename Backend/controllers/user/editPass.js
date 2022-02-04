const getDB = require('../../database/getDB');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const editPass = async (req, res, next) => {

    let connection;
    try {
        connection = await getDB();
        const { iduser } = req.params;
        const { oldpassword, newpassword, confirmnewpassword } = req.body;

        if (!oldpassword || !newpassword) {
            const error = new Error('Faltan campos');
            error.httpStatus = 404;
            throw error;
        }

        //comprobamos que la contraseñanueva sea la misma en password y confirmpassword
        if (newpassword !== confirmnewpassword) {
            const error = new Error('Las contraseñas tienen que ser igual');
            error.httpStatus = 400
            throw error;
        }



        const [user] = await connection.query(`
        SELECT password FROM user WHERE id = ?
        `,
            [iduser]
        );

        const valid = await bcrypt.compare(oldpassword, user[0].password);

        if (!valid) {
            const error = new Error('Contraseña no válida');
            error.httpStatus = 401;
            throw error;

        }

        const hashedPassword = await bcrypt.hash(newpassword, saltRounds);

        await connection.query(`
        UPDATE user SET password = ? , modifyDate = ? WHERE id = ?
        `,
            [hashedPassword, new Date(), iduser]);

        res.send({
            status: 'ok',
            message: 'El cambio de contraseña se ha actualizado correctamente',
        });


    } catch (error) {
        next(error);

    } finally {
        if (connection) connection.release();
    }
};

module.exports = editPass;