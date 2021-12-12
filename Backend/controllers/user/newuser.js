const { hash } = require('bcrypt');
const getDB = require('../../database/getDB');
const {
    hashedPassword,
    generateRandomString,
    mailVerify
  
    
} = require('../../helpers');


const newUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { name_user, lastname, lastname2, email, password, bio, birthdate} =
            req.body;

        const [user] = await connection.query(
            `
        SELECT id FROM user WHERE email = ?`,
            [email]
        );

        if (user.length > 0) {
            const error = new Error(
                'Este email ya está en nuestra base de datos'
            );
            error.httpStatus = 409;
            throw error;
        }

        const registration_code = generateRandomString(40);
         
        await connection.query(
            `INSERT INTO user(name_user, lastname, lastname2, email, password, bio, rol, birthdate, registration_code, createDate) VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                name_user,
                lastname,
                lastname2,
                email,
                await hashedPassword(password,10),
                bio,
                1,
                birthdate,
                registration_code,
                new Date(),
            ]
        );

        await mailVerify(email, registration_code);

        res.send({
            status: 'ok',
            message:
                'Usuario registrado. Te hemos mandado un código a tu email, abrelo para activarlo',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUser;
