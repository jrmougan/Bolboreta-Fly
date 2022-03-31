const { OAuth2Client } = require('google-auth-library');
const getDB = require('../../database/getDB');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.APP_GOOGLE_CLIENT_ID);

const loginGoogle = async (req, res, next) => {
    let connection;

    connection = await getDB();

    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        requireAudience: process.env.APP_GOOGLE_CLIENT_ID,
    });

    const { given_name, email, family_name } = ticket.getPayload();

    const [user] = await connection.query(
        `SELECT id FROM user WHERE email = ?`,
        [email]
    );

    if (user.length > 0) {
        await connection.query(
            `UPDATE user SET name_user='${given_name}' WHERE email = ?`,
            [email]
        );
    }
    if (user.length < 1) {
        await connection.query(
            `INSERT INTO  user (name_user, lastname, email , password, createDate , active  ) VALUES(?,?,?,?,?,?)`,
            [given_name, family_name, email, email, new Date(), 1]
        );
    }

    //comprbar si el email existe
    const [usergoogle] = await connection.query(
        `SELECT id , rol , password, active FROM user WHERE email = ?`,
        [email]
    );

    //Creamos nuestro propio token para enviarselo a nuestros middelwares y al frontend

    const tokenInfo = {
        id: usergoogle[0].id,
        rol: usergoogle[0].rol,
        active: 1,
    };

    const tokenGoogle = jwt.sign(tokenInfo, process.env.SECRET, {
        expiresIn: '10d',
    });

    res.status(201);
    res.json(tokenGoogle);
};

module.exports = loginGoogle;
