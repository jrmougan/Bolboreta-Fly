const Amadeus = require('amadeus');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;

const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});

console.log(a);
const offerPrice = async (req, res, next) => {
    try {
        // Recogemos los datos de la petición
        const data = req.body;

        // Los insertamos en la búsqueda
        const { result } = await amadeus.shopping.flightOffers.princing.post(
            JSON.stringify(data)
        );

        // DE OTRA MANERA POR PROBAR
        let [flightOffers] = req.body;

        const { Result } = await amadeus.booking.flightOffers.pricing.post(
            JSON.stringify({
                data: {
                    type: 'flight-offers',
                    flightOffers: [flightOffers],
                },
            })
        );

        // Mostramos el resultado
        res.send({
            status: 'ok',
            data: Result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = offerPrice;
