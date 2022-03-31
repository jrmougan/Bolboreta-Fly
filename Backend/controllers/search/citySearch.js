const Amadeus = require('amadeus');
const { AMADEUS_ID, AMADEUS_SECRET } = process.env;

const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});

const citySearch = async (req, res, next) => {
    try {
        const { keyword, id } = req.query;

        let result;

        if (id) {
            console.log(id);
            const { result } = await amadeus.referenceData.location(id).get();
            res.send({
                status: 'ok',
                data: result,
            });
        } else {
            const { result } = await amadeus.referenceData.locations.get({
                keyword: keyword,
                subType: 'CITY',
                view: 'LIGHT',
            });

            res.send({
                status: 'ok',
                data: result,
            });
        }
    } catch (error) {
        next(error);
    }
};
module.exports = citySearch;
