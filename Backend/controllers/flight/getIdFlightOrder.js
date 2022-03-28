const getDB = require('../../database/getDB');

const getIdFlightOrder = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { bookingId } = req.params;

        const [booking_code] = await connection.query(
            `SELECT booking.booking_code FROM booking WHERE booking.id=?;`,
            [bookingId]
        );

        res.send({
            status: 'ok',
            data: [booking_code],
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getIdFlightOrder;
