const getDB = require('../../database/getDB');

const getFlightsIds = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { bookingId } = req.params;

        const [flightsIds] = await connection.query(
            `SELECT ternario.flight_id FROM passenger_rel_flight_rel_booking as ternario WHERE ternario.booking_id=?;`,
            [bookingId]
        );

        res.send({
            status: 'ok',
            data: [flightsIds],
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = getFlightsIds;
