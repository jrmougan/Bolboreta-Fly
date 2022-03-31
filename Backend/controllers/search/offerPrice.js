const Amadeus = require('amadeus');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;

const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});

const offerPrice = async (req, res, next) => {
    try {
        let {
            data: { flightOffers },
        } = req.body;

        const { result } = await amadeus.shopping.flightOffers.pricing.post(
            JSON.stringify({
                data: {
                    type: 'flight-offers-pricing',
                    flightOffers: flightOffers,
                },
            })
        );
        console.log(result);

        // Mostramos el resultado
        res.send({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = offerPrice;
