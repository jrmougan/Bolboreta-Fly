const getDB = require('../../database/getDB');
const Amadeus = require('amadeus');

const { AMADEUS_ID, AMADEUS_SECRET } = process.env;
const amadeus = new Amadeus({
    clientId: AMADEUS_ID,
    clientSecret: AMADEUS_SECRET,
});

const advanceSearch = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            returnDate,
            numAdults,
            numChilds,
            travelClass,
            connections,
            blacklistedInEUAllowed,
            maxprice,
            incluiedCheckedBagsOnly,
            maxFlightTime,
           
        } = req.body;

        //comprobamos que los viajeros mayores de 2 años no son mas de 9
        if (Number(numAdults) + Number(numChilds) > 9) {
            const error = new Error('No puedes insertar mas de 9 pasajeros');
            error.httpStatus = 416;
            throw error;
        }

        // Guardamos en la base de datos la busqueda( por si se ha logueado en esta pagina)
      /*  if (iduser !== undefined) {
            await connection.query(
                `
                INSERT INTO search (searchDate , origin , destination , departureDate , id user)
                VALUES (? ,? , ? , ? , ?)
                `,
                [
                    new Date(),
                    origin,
                    destinationLocationCode,
                    departureDate,
                    iduser,
                ]
            );
        }*/

        //Creamos array de oiginDestination

        let originDestination = [];
        
        if(destinationLocationCode > 0){
            for(let i = 1; i <= destinationLocationCode ; i++){
                destinationLocationCode.push({
                    id:i,
                    originLocationCode,
                    destinationLocationCode,
                    departureDateTimeRange:{
                    dateTimeRange:{date:departureDate},},
                    arrivalDateTimeRange:{
                    dateTimeRA
                    }
                })
            }
        }
         

        //creamos array travels para mandarle a Amadeus

        let travelers = [];
       
        //adultos
        if (numAdults > 0) {
            for (let j = 1; j <= numAdults; j++) {
                travelers.push({
                    id: j,
                    travelerType: 'ADULT',
                });
               
        }
    }
        //niños
        if (numChilds > 0) {
            for (let i = 1; i <= numChilds; i++) {
                travelers.push({
                    id: i,
                    travelerType: 'CHILD',
                });
                
            }
        }

        //creamos objeto de searchCriteria

        let searchCriteria = {
            maxPrice: maxprice,
            PriceOptins: {
                incluiedCheckedBagsOnly,
            },
            flightFilters: {
                maxFlightTime,
                carrierRestrictions: { blacklistedInEUAllowed },
                cabinRestriction: { travelClass },
                connectionRestiction: { maxNumberofConnections: connections },
            },
        };

        //Creamos body para mandaserlo a amadeus:

        let searchAdvancebody = {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            returnDate,
            travelers,
            searchCriteria,
        };

        //lo pasamos a json
        const jsonBody = JSON.stringify(searchAdvancebody);

        let { result } = await amadeus.shopping.flightOffersSearch.post(
            jsonBody
        );

        res.send({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = advanceSearch;
