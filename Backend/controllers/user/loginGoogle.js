const { OAuth2Client } = require('google-auth-library');
const getDB = require('../../database/getDB');

const client = new OAuth2Client(process.env.APP_GOOGLE_CLIENTE_ID);

const loginGoogle = async (req, res, next) => {
    let connection;
    connection = await getDB();

    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.APP_GOOGLE_CLIENTE_ID
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
            `INSERT INTO  user (name_user, lastname, email , password, createDate  ) VALUES(?,?,?,?,?)`,
            [
                given_name,
                family_name,
                email,
                email,
                new Date(),

            ]
        );
    }

    res.status(201);
    res.json('token');
}

module.exports = loginGoogle;
