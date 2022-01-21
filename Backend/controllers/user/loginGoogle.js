/* const { OAuth2Client } = require('google-auth-library');
const Connection = require('mysql2/typings/mysql/lib/Connection');
const client = new OAuth2Client(process.env.APP_GOOGLE_CLIENTE_ID);

const loginGoogle = server.post('https://api/v1/auth/google') async (req, res, next) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.APP_GOOGLE_CLIENTE_ID
    });
    const { name, email } = ticket.getPayload();
    const [user] = await connection.query(
        `SELECT id FROM user WHERE email = ?`,
        [email]
    );
    if (user.length > 0) {
        await connection.query(
            `UPDATE user SET name_user:'name', avatar:'picture' WHERE email = ?`,
            [email]
        );
    }
    if (user.length < 1) {
        await connection.query(
            `INSERT INTO  user (name_user, email , createDate , avatar ) VALUES(?,?,?,?)`,
            [
                name,
                email,
                new Date(),
                picture,
            ]
        );
    }
}
res.status(201);
res.json(user);
}

module.exports = loginGoogle;*/
