const Amadeus = require('amadeus');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;
const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});

const seatMap = async (req, res, next) => {
    try {
        // Conseguimos la información necesaria para pedir los asientos
        let { data } = req.body;

        //  Realizamos la petición y guardamos el resultado
        const { result } = await amadeus.shopping.seatmaps.post(
            JSON.stringify({
                data: data,
            })
        );

        // Mostramos el resultado
        res.send({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = seatMap;
