const getDB = require('../../database/getDB');

const getPassengerData = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idPassenger, bookingId } = req.params;

        const [passengerData] = await connection.query(
            `SELECT  name_passenger,
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
                    emailcontact
            FROM passenger WHERE id=? AND id_booking=?`,
            [idPassenger, bookingId]
        );
        console.log(idPassenger, bookingId);
        console.log(passengerData);

        const allPassengerData = {
            name_passenger: passengerData[0].name_passenger,
            lastname: passengerData[0].lastname,
            lastname2: passengerData[0].lastname2,
            address: passengerData[0].address,
            phone: passengerData[0].phone,
            code_phone: passengerData[0].code_phone,
            email: passengerData[0].email,
            birthdate: passengerData[0].birthdate,
            documentype: passengerData[0].documentype,
            document: passengerData[0].document,
            issuancecountry: passengerData[0].issuancecountry,
            validitycountry: passengerData[0].validitycountry,
            birthplace: passengerData[0].birthplace,
            gender: passengerData[0].gender,
            namecontact: passengerData[0].namecontact,
            emailcontact: passengerData[0].emailcontact,
        };
        res.send({
            status: 'ok',
            message: 'Aquí tiene los datos',
            data: { allPassengerData },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getPassengerData;
