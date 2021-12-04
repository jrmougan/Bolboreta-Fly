const getDB = require('../database/getDB.js');

const newPassenger = async (req, res, next) => {
  let connection;

  try {
    res.send(`
            status: 'ok',
            message: 'El pasajero ha sido creado con éxito'
        `);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newPassenger;
