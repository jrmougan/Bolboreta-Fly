const getDB = require('../../database/getDB');

const newUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { email, password } = req.body;

    const [user] = await connection.query(
      `
        SELECT id FROM user WHERE email = ?`,
      [email]
    );

    if (user.length > 0) {
      const error = new Error('Este email ya está en nuestra base de datos');
      error.httpStatus = 409;
      throw error;
    }

    await connection.query(
      `
        INSERT INTO user(name, lastname, lastname2, email, password, bio, avatar) VALUES (?,?,?,?,?,?,?)`,
      [name, lastname, lastname2, email, password, bio, avatar]
    );

    res.send({
      status: 'ok',
      message:
        'Usuario registrado. Te hemos mandado un código a tu email, abrelo para activarlo',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.relase();
  }
};

module.exports = newUser;
