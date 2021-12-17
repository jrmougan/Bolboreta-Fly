const getDB = require('../../database/getDB');

const getBookings = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { bookingId } = req.params;

        const [booking] = await connection.query(
            `
        SELECT DISTINCT b.booking_code AS 'Code', b.final_price, b.currency, ternario.flight_id, f.departure_code, f.arrival_code,f.duration, f.flight_num, b.creation_date
        FROM booking b
        LEFT JOIN passenger_rel_flight_rel_booking AS ternario ON b.id=ternario.booking_id
        LEFT JOIN flight as f ON ternario.flight_id=f.id
        WHERE booking_id=?
        `,
            [bookingId]
        );

        res.send({
            status: 'ok',
            data: booking,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getBookings;
