const getDB = require('../../database/getDB');

const getBookings = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        // Obtenemos el usuario objeto de consulta para conseguir sus reservas
        const { userId } = req.params;

        const [bookings] = await connection.query(
            `
            SELECT u.id AS ID_USUARIO, b.id AS ID_RESERVA,departure_terminal AS 'Desde',arrival_terminal AS 'A', booking_code AS 'Código de reserva', creation_date AS 'Fecha de creación', final_price AS 'Precio Final', departure_time AS 'Fecha de salida', arrival_time AS 'Fecha de llegada' 
            FROM user AS u INNER JOIN booking AS b 
            ON u.id= b.id_user
            INNER JOIN passenger_rel_flight_rel_booking AS ternario ON ternario.booking_id=b.id 
            WHERE u.id=2
            ;`,
            [userId]
        );

        res.send({
            status: 'ok',
            data: bookings,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getBookings;
