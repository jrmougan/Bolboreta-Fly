const getDB = require('../../database/getDB');

const getFlightDurationByNumber = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { bookingId, flightNumber } = req.params;

        const [duration] = await connection.query(
            `SELECT flight.duration FROM passenger_rel_flight_rel_booking as ternario LEFT JOIN flight ON ternario.flight_id=flight.id WHERE ternario.booking_id=? AND flight.flight_num=?;`,
            [bookingId, flightNumber]
        );

        res.send({
            status: 'ok',
            data: [duration],
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getFlightDurationByNumber;
