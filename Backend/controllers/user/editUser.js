const getDB = require('../../database/getDB');
const { format, parseISO } = require('date-fns');
const { generateRandomString, mailVerify } = require('../../helpers');

const editUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { iduser } = req.params;
        console.log(req.body);
        const {
            newname,
            newlastname,
            newlastname2,
            newbirthdate,
            newbio,
            newaddress,
            newemail,
        } = req.body;

        const [user] = await connection.query(
            `SELECT name_user, lastname, lastname2, birthdate, bio, address, email, avatar FROM user WHERE id = ?`,
            [iduser]
        );

        let message = 'El usuario se ha actualizado';

        //email

        if (newemail && newemail !== user[0].email) {
            const [email] = await connection.query(
                `
             SELECT id FROM user WHERE email = ?`,
                [newemail]
            );
            if (email.length > 0) {
                const error = new Error(
                    'Ese email ya existe en nuestra base de datos'
                );
                error.httpStatus = 409;
                throw error;
            }
        }

        //mandar codigo de registro si ha cambiado el email
        if (newemail && newemail !== user[0].email) {
            const registration_code = generateRandomString(40);

            await connection.query(
                `UPDATE user SET email = ?, registration_code = ? , active = false WHERE id = ?`,
                [newemail, registration_code, iduser]
            );

            await mailVerify(newemail, registration_code);

            message +=
                ' Le hemos enviado un código a su nuevo email para validar el cambio de email.';
        }

        // Actualizamos todo lo que ha podido guardar el usuario

        const formatnewbirthdate = format(parseISO(newbirthdate), 'yyyy-MM-dd');

        await connection.query(
            `
         UPDATE user SET name_user = ?, lastname = ?, lastname2 = ?, bio = ?, address = ?, birthdate = ? , modifyDate = ?  WHERE id = ?
         `,
            [
                newname || user[0].name_user,
                newlastname || user[0].lastname,
                newlastname2 || user[0].lastname2,
                newbio || user[0].bio,
                newaddress || user[0].address,
                formatnewbirthdate || user[0].birthdate,
                new Date(),
                iduser,
            ]
        );

        res.send({
            status: 'ok',
            message,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUser;
