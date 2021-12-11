const getDB = require('../../database/getDB');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;
const Amadeus = require('amadeus');
const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});
const newBooking = async (req, res, next) => {
    let connection;
    try {
        const { itinerary, travelers } = req.body;

        //Enviamos la petición a amadeus y almacenamos en result la respuesta con los datos de la reserva
        const { result } = await amadeus.booking.flightOrders.post(
            JSON.stringify({
                data: {
                    type: 'flight-order',
                    flightOffers: [itinerary],
                    travelers: travelers,
                },
            })
        );
        console.log(itinerary);
        const { data } = result;
        connection = await getDB();
        // Guardamos en la base de datos los datos de la reserva
        const bookingId = data.id;
        const finalPrice = data.flightOffers[0].price.total;
        const currency = data.flightOffers[0].price.currency;

        //Datos de vuelos
        const itineraries = data.flightOffers[0].itineraries;
        console.log(itineraries.lenght);
        //Bucle para los itinerarios
        for (const itinerary of itineraries) {
            //Bucle para los vuelos
            for (const flight of itinerary.segments) {
                //Guardamos los datos para insertar posteriormente
                const departure_code = flight.departure.iataCode;
                const arrival_code = flight.arrival.iataCode;
                const departure_date = flight.departure.at;
                const arrival_date = flight.arrival.at;
                const carrier_code = flight.carrierCode;
                const duration = flight.duration;
                const flight_num = flight.number;

                // Consulta para comprobar si ya existe ese vuelo en base de datos
                const [flight_exists] = await connection.query(
                    'SELECT id FROM flight WHERE flight_num = ? AND carrier_code = ?',
                    [flight_num, carrier_code]
                );

                // En caso de que no exista lo insertamos
                if (flight_exists.lenght === 0) {
                    await connection.query(
                        'INSERT INTO flight (carrier_code, departure_code, arrival_code, duration, flight_num) VALUES (?,?,?,?,?)',
                        [
                            carrier_code,
                            departure_code,
                            arrival_code,
                            'duration',
                            flight_num,
                        ]
                    );
                }
            }
        }

        res.send({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newBooking;
