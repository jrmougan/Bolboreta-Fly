const getDB = require('../../database/getDB');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');


const loginUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { email, password } = req.body;

    // comprobar si falta algún campo

    if (!email || !password) {
      const error = new Error('No has escrito el email o la contraseña');
      error.https = 400;
      throw error;
    }
    //comprbar si el email existe
    const [ user ] = await connection.query(
      `SELECT id , rol , password, active FROM user WHERE email = ?`,
      [email]
    );

    // comprobamos que la contraseña sea correcta

    let validPassword = false;
    if (user.length > 0) {
      validPassword = await bcryp.compare(password, user[0].password);
    }


    if (user.length < 1 || !validPassword) {
      const error = new Error('Email o contraseña incorrecto');
      error.https = 401;
      throw error;
    }

    // comprobamos si el cliente ha validado su registro o no

    if (!user[0].active) {
      const error = new Error('Usuario no ha validado su registro');
      error.httpStatus = 401;
      throw error;
    }
    
    const tokenInfo = {
      id: user[0].id,
      rol: user[0].rol,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET,{expiresIn:'10d'});

    res.send({
      status: 'ok',
      data: { token,},
    });



  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }

};

module.exports = loginUser;
