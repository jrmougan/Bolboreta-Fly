const getDB = require('../../database/getDB');

const getBookings = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { bookingId } = req.params;

        const [booking] = await connection.query(
            `
                    SELECT DISTINCT b.booking_code AS 'Localizador',
                    COUNT(ternario.passenger_id) AS 'Pasajeros',
                    CONCAT(b.final_price,' ', + b.currency) AS 'Precio Final',
                    f.departure_code AS 'Salida',
                    f.arrival_code AS 'Llegada',
                    f.duration,
                    f.flight_num,
                    b.creation_date,
                    COUNT(ternario.passenger_id) AS 'Pasajeros'
        FROM booking b
        LEFT JOIN passenger_rel_flight_rel_booking AS ternario ON b.id=ternario.booking_id
        LEFT JOIN flight as f ON ternario.flight_id=f.id
        WHERE booking_id=?
        GROUP BY f.id;
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
