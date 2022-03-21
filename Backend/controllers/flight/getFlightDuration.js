const getDB = require('../../database/getDB');

const getFlightDuration = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { flightId } = req.params;

        const [duration] = await connection.query(
            `SELECT flight.duration FROM flight  WHERE flight.id=?;`,
            [flightId]
        );

        res.send({
            status: 'ok',
            data: [duration],
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = getFlightDuration;
