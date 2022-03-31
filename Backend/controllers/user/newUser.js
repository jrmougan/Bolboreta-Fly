const { hash } = require('bcrypt');
const getDB = require('../../database/getDB');
const {
    hashedPassword,
    generateRandomString,
    mailVerify,
} = require('../../helpers');

const newUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const {
            name_user,
            lastname,
            bio,
            birthdate,
            email,
            password,
            confirmpassword,
        } = req.body;

        // Comprobamos que no faltan ningun dato
        if (
            !name_user ||
            !lastname ||
            !email ||
            !password ||
            !confirmpassword ||
            !birthdate ||
            !bio
        ) {
            const error = new Error('Faltan campos por rellenar');
            error.httpStatus = 400;
            throw error;
        }

        //confirmamos que la contraseña se aigual las dos veces
        if (password !== confirmpassword) {
            const error = new Error('Las contraseñas tienen que ser igual');
            error.httpStatus = 400;
            throw error;
        }

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
            `INSERT INTO user(name_user, lastname,  email, password, birthdate, bio, rol, registration_code, createDate) VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                name_user,
                lastname,
                email,
                await hashedPassword(password, 10),
                birthdate,
                bio,
                1,
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
