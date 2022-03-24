const getDB = require('../../database/getDB');

const getFlightId = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { bookingId, flightNumber } = req.params;

        const [flightId] = await connection.query(
            `SELECT DISTINCT ternario.flight_id FROM passenger_rel_flight_rel_booking as ternario LEFT JOIN flight ON ternario.flight_id=flight.id WHERE ternario.booking_id=? AND flight.flight_num=?;`,
            [bookingId, flightNumber]
        );

        res.send({
            status: 'ok',
            data: [flightId],
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = getFlightId;
