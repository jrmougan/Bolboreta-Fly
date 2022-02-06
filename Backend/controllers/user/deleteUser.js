const getDB = require('../../database/getDB');
const { deletePhoto, generateRandomString } = require('../../helpers');

const deletPass = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { iduser } = req.params;

        const [user] = await connection.query(`
    SELECT id FROM user WHERE id = ?
    `,
            [iduser]);

        //borramos avatar
        if (user[0].avatar) {
            await deletePhoto(user[0].avatar);
        }

        //borramos datos de usuario
        await connection.query(`
        UPDATE user SET deleted = 1 , active = 0, modifyDate = ? WHERE id = ?
        `,
            [new Date(), iduser]);

        res.send({
            status: "ok",
            message: "Usuario eliminado",
        });

    } catch (error) {
        next(error);

    } finally {
        if (connection) connection.release();
    }

};

module.exports = deletPass;