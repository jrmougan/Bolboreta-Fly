const getDB = require('../../database/getDB');

const getBookings = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        // Obtenemos el usuario objeto de consulta para conseguir sus reservas
        const { userId } = req.params;

        const [bookings] = await connection.query(
            `
            SELECT DISTINCT b.id_user as userid, b.id as bookingid, b.destination_code,b.departure_code, b.booking_code, ternaria.departure_time, ternaria.arrival_time 
            FROM booking b 
            LEFT JOIN passenger_rel_flight_rel_booking ternaria ON ternaria.booking_id = b.id 
            LEFT JOIN flight f ON f.id = ternaria.flight_id 
            WHERE b.id_user=?
            ;`,
            [userId]
        );

        // Estructuramos las reservas en un array de objetos
        let bookingData = [];
        for (const booking of bookings) {
            const findIndex = bookingData.findIndex(
                (e) => e.bookingId === booking.bookingid
            );
            if (findIndex === -1) {
                bookingData.push({
                    bookingId: booking.bookingid,
                    bookingObject: [booking],
                });
            } else {
                bookingData[findIndex].bookingObject.push(booking);
            }
        }
        res.send({
            status: 'ok',
            data: bookingData,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getBookings;
