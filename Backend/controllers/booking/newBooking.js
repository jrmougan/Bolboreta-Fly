const getDB = require('../../database/getDB');
const { sendMail } = require('../../helpers');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;
const Amadeus = require('amadeus');
const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});
const newBooking = async (req, res, next) => {
    let connection;

    try {
        const id_user = req.userAuth.id;
        const { itinerary, travelers } = req.body;

        if (!itinerary || !travelers) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

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

        const { data } = result;

        // Guardamos en la base de datos los datos de la reserva
        const bookingId = data.id;
        const creation_date = data.associatedRecords[0].creationDate;
        const finalPrice = data.flightOffers[0].price.total;
        const currency = data.flightOffers[0].price.currency;

        connection = await getDB();

        // Insertamos la reserva en caso de que no exista

        const [booking] = await connection.query(
            'INSERT INTO booking (booking_code, creation_date, payment_method, complete, final_price, currency, canceled, oneway, id_user) VALUES (?,?,?,?,?,?,?,?,?)',
            [
                bookingId,
                creation_date,
                0,
                0,
                finalPrice,
                currency,
                0,
                0,
                id_user,
            ]
        );
        //Guardamos el id de insercción de la reserva
        const insertIdBooking = booking.insertId;

        // Recorremos los pasajeros e insertamos los vuelos y sus relaciones

        const arrayInsertTraveler = [];
        for (const traveler of travelers) {
            const name = traveler.name.firstName;
            const lastname = traveler.name.lastName;
            const document_number = traveler.documents[0].number;
            const type_document = traveler.documents[0].documentType;
            const birthdate = traveler.dateOfBirth;
            const gender = traveler.gender;
            const phone = traveler.contact.phones[0].number;
            const code_phone = traveler.contact.phones[0].countryCallingCode;
            const type_phone = traveler.contact.phones[0].deviceType;
            const email = traveler.contact.emailAddress;
            const inssuancedate = traveler.documents[0].issuanceDate;
            const expiryDate = traveler.documents[0].expiryDate;
            const nationality = traveler.documents[0].nationality;
            const issuanceCountry = traveler.documents[0].issuanceCountry;
            const validityCountry = traveler.documents[0].validityCountry;
            const birthplace = traveler.documents[0].birthPlace;
            const [insertPassenger] = await connection.query(
                `INSERT INTO passenger 
            (name_passenger, lastname, typephone, phone, code_phone, email,birthdate,documentype,document,issuancedate, expiredate, issuancecountry, validitycountry,birthplace,gender) VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,
                [
                    name,
                    lastname,
                    type_phone,
                    phone,
                    code_phone,
                    email,
                    birthdate,
                    type_document,
                    document_number,
                    inssuancedate,
                    expiryDate,
                    issuanceCountry,
                    validityCountry,
                    birthplace,
                    gender,
                ]
            );
            // Guardamos id de insercción del pasajero
            arrayInsertTraveler.push(insertPassenger.insertId);
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
                const carrier_code = flight.carrierCode;
                const flight_num = flight.number;

                // Consulta para comprobar si ya existe ese vuelo en base de datos
                let [flightExists] = await connection.query(
                    'SELECT id FROM flight WHERE flight_num = ? AND carrier_code = ?',
                    [flight_num, carrier_code]
                );
                let flightId;
                if (flightExists.length > 0) {
                    flightId = flightExists[0].id;
                }

                const flightExistsLenght = Object.keys(flightExists).length;

                // En caso de que no exista lo insertamos
                if (flightExistsLenght === 0) {
                    const [insertFlight] = await connection.query(
                        'INSERT INTO flight (carrier_code, departure_code, arrival_code, flight_num) VALUES (?,?,?,?)',
                        [carrier_code, departure_code, arrival_code, flight_num]
                    );
                    flightId = insertFlight.insertId;
                }

                // Creamos la relación de los pasajeros con la reserva y el vuelo
                await createRelation(
                    connection,
                    arrayInsertTraveler,
                    insertIdBooking,
                    flight,
                    flightId
                );
            }
        }
        //Enviamos mail de confirmación de reserva
        const confirmbody = `
        Tu reserva con id <b>${bookingId}</b> ha sido confirmada
        `;
        await sendMail({
            to: 'jrmougan@gmail.com',
            subject: 'RESERVA CONFIRMADA',
            body: confirmbody,
        });

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

async function createRelation(
    connection,
    travelers,
    bookingId,
    flightObject,
    flightId
) {
    //console.log(travelers);
    for (const traveler of travelers) {
        await connection.query(
            `INSERT INTO passenger_rel_flight_rel_booking 
        (flight_id, passenger_id, booking_id, departure_terminal, arrival_terminal, departure_time, arrival_time, aircraft_code, bags, seat)
                 VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                flightId,
                traveler,
                bookingId,
                flightObject.departure.terminal,
                flightObject.arrival.terminal,
                flightObject.departure.at,
                flightObject.arrival.at,
                flightObject.aircraft.code,
                null,
                null,
            ]
        );
    }
}
module.exports = newBooking;
