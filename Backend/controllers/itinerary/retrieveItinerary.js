const Amadeus = require('amadeus');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;

const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});

const retrieveItinerary = async (req, res, next) => {
    try {
        const { bookingCode } = req.params;
        const code =
            bookingCode.replace('=', '%3D') && bookingCode.replace('/', '%2F');

        const { result } = await amadeus.booking.flightOrder(code).get();

        res.send({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = retrieveItinerary;
