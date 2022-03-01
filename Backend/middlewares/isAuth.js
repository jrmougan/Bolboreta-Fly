const getDB = require('../database/getDB');
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {

    let connection;

    try {

        connection = await getDB();

        const { authorization } = req.headers;

        console.log(authorization)

        if (!authorization) {
            const error = new Error('No hay autorizacion');
            error.httpSatus = 401;
            throw error;
        }

        let tokeninfo;


        try {
            tokeninfo = jwt.verify(authorization, process.env.SECRET);


        } catch (_) {
            const error = new Error('El token no es válido');
            error.httpSatus = 401;
            throw error;

        }

        const [user] = await connection.query(`
        SELECT  active, deleted FROM user WHERE id = ?
        `,
            [tokeninfo.id]);

        if (!user[0].active || user[0].deleted) {
            const error = new Error('Usuario borrado o no activado');
            error.httpSatus = 401;
            throw error;
        }

        req.userAuth = tokeninfo;

        next();

    } catch (error) {
        next(error)

    } finally {
        if (connection) connection.release();
    }
};
module.exports = isAuth;