const getDB = require('../../database/getDB');

const editUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id_user } = req.params;
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
