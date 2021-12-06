const getDB = require('../../database/getDB');

const newBookingPassenger = async (req, res, next) => {
    let connection;

    try {
        // newPassenger controller added
        connection = await getDB();

        // Sacamos información para posteriormente utilizarla para buscar/rellenar en la base datos
        const { id_booking } = req.query;

        const {
            name_passenger,
            lastname,
            lastname2,
            phone,
            typephone,
            gender,
            address,
            email,
            birthdate,
            birthplace,
            documentype,
            document,
            issuancedate,
            expiredate,
            issuancecountry,
            validitycountry,
        } = req.body;

        const dateOfCreation = new Date();

        // Encontramos el id del pasajero en cuestión
        const [idPassenger] = await connection.query(
            `
      SELECT id FROM passenger WHERE  id_booking = ? AND document = ?;`,
            [id_booking, document]
        );

        // Si este pasajero ya existe, presentamos error 409
        if (idPassenger > 0) {
            const error =
                new Error(`El pasajero ${name_passenger} ${lastname} ya existe en la reserva
      ${id_booking}`);
            error.httpStatus = 418;
            throw error;
        }

        // Tras comprobar que el usuario no exite previamente, procedemos a insertar
        // sus datos en nuestgra BBDD
        await connection.query(
            `INSERT INTO bolboreta.passenger(name_passenger, lastname,lastname2,documentype,typephone, gender,address,email,birthdate,birthplace,document,issuancedate,expiredate,issuancecountry,validitycountry, phone,code_phone,namecontact,emailcontact)
            VALUES('Edu',1,2,3,4,'male',6,7,'1994/02/28',7,7,'1990/09/23','1990/09/23',7,7,7,2,1,1)`
            /* [
                name_passenger,
                lastname,
                lastname2,
                documentype,
                typephone,
                gender,
                address,
                email,
                birthdate,
                birthplace,
                document,
                issuancedate,
                expiredate,
                issuancecountry,
                validitycountry,
                phone,
                code_phone,
                namecontact,
                emailcontact
            ] */
        );

        res.send(`
            status: 'ok',
            message: 'El pasajero ha sido creado con éxito'
        `);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newBookingPassenger;
