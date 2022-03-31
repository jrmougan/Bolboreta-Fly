const getDB = require('../../database/getDB');

const getFlightsIds = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { bookingId } = req.params;

        const [flightsIds] = await connection.query(
            `SELECT ternario.flight_id, flight.duration FROM passenger_rel_flight_rel_booking as ternario LEFT JOIN flight ON ternario.flight_id=flight.id WHERE ternario.booking_id=?;`,
            [bookingId]
        );

        res.send({
            status: 'ok',
            data: [flightsIds],
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getFlightsIds;
