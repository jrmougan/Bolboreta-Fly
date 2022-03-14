const Amadeus = require('amadeus');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;

const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});

const retrieveItinerary = async (req, res, next) => {
    console.log(req);
    try {
        const { bookingCode } = req.params;
        console.log(bookingCode);

        const { result } = await amadeus.booking.flightOrder(bookingCode).get();

        res.send({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = retrieveItinerary;
