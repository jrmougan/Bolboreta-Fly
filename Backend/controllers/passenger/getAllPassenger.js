const getDB = require('../../database/getDB');

const getAllPassanger = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { bookingId } = req.params;
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getAllPassanger;
