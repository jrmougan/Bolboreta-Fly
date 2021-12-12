const getDB = require('../../database/getDB');

const activeUser = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { registration_code } = req.params;

        //comprobación de usuarios pendientes de activar
        const [user] = await connection.query(
            `SELECT id FROM user WHERE registration_code= ?`,
            [registration_code]
        );

        if (user.length < 1) {
            const error = new Error(
                'No hay usuarios pendientes de activar su registro'
            );
            error.httpStatus = 404;
            throw error;
        }
        //activación de usuario. y borrado de codigo de registro
        await connection.query(
            `UPDATE user SET active = true, registration_code = NULL WHERE registration_code = ?`,
            [registration_code]
        );

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = activeUser;
