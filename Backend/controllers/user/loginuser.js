const getDB = require('../../database/getDB');

const loginUser = (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('No has escrito el email o la contraseña');
      error.https = 400;
      throw error;
    }

    const { user } = await.connection.query(
      `SELECT id , rol , password FROM user WHERE email = ?`,
      [email]
    );

    if (user.lenght < 1) {
      const error = new Error('No existe ningún usuario con este email');
      error.https = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.relase();
  }
};

module.exports = loginUser;
