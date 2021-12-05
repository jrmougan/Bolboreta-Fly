const getDB = require('../database/getDB.js');

const newPassenger = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Sacamos información para posteriormente utilizarla para buscar/rellenar en la base datos
    const { id_booking } = req.query;

    const {
      name,
      lastname,
      lastname2,
      phone,
      email,
      birthdate,
      documentype,
      document,
    } = req.body;

    const dateOfCreation = new Date();

    // Encontramos el id del pasajero en cuestión
    const [idPassenger] = await connection.query(
      `
      SELECT id FROM passenger WHERE  id_booking = ? AND document = ?;`,
      [id_booking, document]
    );

    // Si este pasajero ya existe, presentamos error 409
    if (idPassenger > 0) {
      const error =
        new Error(`El pasajero ${name} ${lastname} ya existe en la reserva
      ${id_booking}`);
      error.httpStatus = 418;
      throw error;
    }

    // Tras comprobar que el usuario no exite previamente, procedemos a insertar
    // sus datos en nuestgra BBDD
    await connection.query(
      `INSERT INTO passenger(name, lastname,lastname2,documentype,document,email,phone)
      VALUES(?,?,?,?,?,?,?)`,
      [name, lastname, lastname2, documentype, document, email, phone]
    );

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
