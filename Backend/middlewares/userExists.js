const getDB = require('../database/getDB');

const userExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { iduser } = req.params;
        let user;


        if (!isNaN([iduser])) {
            [user] = await connection.query(

                `SELECT id FROM user WHERE id = ? AND deleted = false`,
                [iduser]

            );
        }
        else {
            [user] = await connection.query(`
        SELECT id  FROM user WHERE email = ? AND deleted= false
        `,
                [iduser]
            );



        }


        if (user.length < 1) {
            const error = new Error('El usuario no existe');
            error.httpStatus = 404;
            throw error;
        }

        next();

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;
