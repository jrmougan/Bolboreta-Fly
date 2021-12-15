const getDB = require('../../database/getDB');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;
const Amadeus = require('amadeus');
const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});
const getBookings = async (req, res, next) => {
    let connection;
    try {
        res.send({
            status: 'ok',
            data: 'result',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getBookings;
