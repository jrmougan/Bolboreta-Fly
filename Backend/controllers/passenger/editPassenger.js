const getDB = require('../../database/getDB');
const { formatDate } = require('../../helpers');

const editPassenger = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { bookingId } = req.params;

        const {
            name_passenger,
            lastname,
            lastname2,
            address,
            phone,
            code_phone,
            email,
            birthdate,
            documentype,
            document,
            issuancecountry,
            validitycountry,
            birthplace,
            gender,
            namecontact,
            emailcontact,
        } = req.body;

        const idPassenger = await connection.query(
            `
            SELECT id FROM passenger WHERE id_booking = ? AND document=?; 
        `,
            [bookingId, document]
        );

        await connection.query(
            `
                 UPDATE passenger SET
                     name_passenger=?,
                     lastname=?,
                     lastname2=?,
                     address=?,
                     phone=?.
                     code_phone=?,
                     email=?,
                     birthdate=?,
                     documentype=?,
                     document=?,
                     issuancecountry=?,
                     validitycountry=?,
                     birthplace=?,
                     gender=?,
                     namecontact=?,
                     emailcontact=?

        WHERE id=?`,
            [
                name_passenger,
                lastname,
                lastname2,
                address,
                phone,
                code_phone,
                email,
                birthdate,
                documentype,
                document,
                issuancecountry,
                validitycountry,
                birthplace,
                gender,
                namecontact,
                emailcontact,
                idPassenger,
            ]
        );

        res.send({
            status: 'ok',
            message: ' Se han realizado las modificaciones con éxito.',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editPassenger;
