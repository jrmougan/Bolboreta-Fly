const getDB = require('../../database/getDB');
const { savePhoto, deletePhoto } = require('../../helpers');

// Modificación Avatar.

const editAvatar = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { iduser } = req.params;

        //no ha enviado foto o avatar

        if (!(req.files && req.files.avatar)) {
            const error = new Error('No has insertado foto/avatar');
            error.httpStatus = 400;
            throw error;
        }

        const [user] = await connection.query(
            `
       SELECT avatar FROM user WHERE id = ?
       `,
            [iduser]
        );

        //Eliminanos foto/avatar si existe

        if (user[0].avatar) {
            await deletePhoto(user[0].avatar);
        }

        // Guardamos avatar en disco

        const newAvatar = await savePhoto(req.files.avatar, 300);

        await connection.query(
            `
          UPDATE user SET avatar = ?, modifyDate = ? WHERE id = ?
          `,
            [newAvatar, new Date(), iduser]
        );

        res.send({
            status: 'ok',
            message: 'Avatar actualizado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editAvatar;
