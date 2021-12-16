const getDB = require('../../database/getDB');

const getBookings = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        // Obtenemos el usuario objeto de consulta para conseguir sus reservas
        const { userId } = req.params;

        const [bookings] = await connection.query(
            `
            SELECT DISTINCT b.id_user as userid,f.id as flightid, b.id as bookingid, f.departure_code, f.arrival_code, b.booking_code, ternaria.departure_time, ternaria.arrival_time 
            FROM booking b 
            LEFT JOIN passenger_rel_flight_rel_booking ternaria ON ternaria.booking_id = b.id 
            LEFT JOIN flight f ON f.id = ternaria.flight_id 
            WHERE b.id_user=?
            ;`,
            [userId]
        );
        let bookingData = [];
        for (let i = 0; i < bookings.length; i++) {
            if (i === 0) {
                bookingData.push(bookings[i]);
            }

            if (i !== 0 && !bookingData[0]) {
                if (
                    bookingData[bookingData.length - 1].bookingid ===
                    bookings[i].bookingid
                ) {
                    bookingData.push(bookings[i]);
                    console.log('Cualquier cosa');
                }
            }
            console.log(bookingData);
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
