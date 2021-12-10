
const getDB = require('../database/getDB');

const caneditUser = async (req, res, next) => {

    let connection ;

    try {
        connection = await getDB();

        const {iduser} = req.params;

        const idReqUser = req.userAuth.id;

        if(Number(iduser) !== idReqUser){
            const error = new Error ('No puedes editar este usuario. No tienes permiso ');
            error.httpStatus = 403;
            throw error;
        }

        next();

    } catch (error) {
        next(error);
        
    } finally {
        if(connection) connection.release();
    }
};

module.exports = caneditUser;