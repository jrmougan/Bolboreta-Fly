const Amadeus = require('amadeus');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;

const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET
});


const citySearch = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const { result } = await amadeus.referenveData.locations.get({
            keyword: keyword,
            subType: 'CITY',
            view: 'LIGHT'
        });
        res.send({
            status: 'ok',
            data: result,
        })

    } catch (error) {
        next(error);

    }
}
module.export = citySearch;