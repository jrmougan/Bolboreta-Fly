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
        const creation_date = data.associatedRecords[0].creationDate;
        const finalPrice = data.flightOffers[0].price.total;
        const currency = data.flightOffers[0].price.currency;

        // Comprobamos si la reserva ya existe

        const [bookingExists] = await connection.query(
            'SELECT id FROM booking WHERE booking_code = ?',
            [bookingId]
        );

        // Insertamos la reserva en caso de que no exista
        if (bookingExists.lenght === 0) {
            await connection.query(
                'INSERT INTO booking (booking_code, creation_date, payment_method, complete, final_price, currency, canceled, oneway, id_user) VALUES (?,?,?,?,?,?,?,?,?)',
                [bookingId, creation_date, 0, 0, finalPrice, currency, 0, 0, 2]
            );
        }
        //Datos de vuelos
        const itineraries = data.flightOffers[0].itineraries;

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
                let [flightExists] = await connection.query(
                    'SELECT id FROM flight WHERE flight_num = ? AND carrier_code = ?',
                    [flight_num, carrier_code]
                );

                const flightExistsLenght = Object.keys(flightExists).length;

                // En caso de que no exista lo insertamos
                if (flightExistsLenght === 0) {
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
                    //console.log(flight_insert);
                }
                //console.log(flight_exists);

                //Insertamos Pasajeros y con sus relaciones reserva y vuelo
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
