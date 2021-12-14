const getDB = require ('../../database/getDB');
const Amadeus = require ('amadeus');
const {AMADEUS_ID, AMADEUS_SECRET} = process.env ;

const amadeus = new Amadeus ({
clientId: AMADEUS_ID,
clientSecret: AMADEUS_SECRET
});

const newSearch = async (req, res, next) => {
    let connection;
    try {

        connection = await getDB();

        const {origin , destination, departuredate , returndate , adults} = req.query;
        let result ;

        //vuelos sólo ida

        if(!returndate){
       
       result = await amadeus.shopping.flightOffersSearch.get ({
        
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departuredate,
            adults: adults
                       
        });
       
    
    } else {

        // Destinos baratos desde un aeropuerto(múltiples destinos)

     if (!destination  && !departuredate && !returndate && !adults){

        
       result = await amadeus.shopping.flightDestinations.get ({

            origin: origin,
                                  
        });

    } else 

    //Vuelos ida y vuelta

     { result = await amadeus.shopping.flightOffersSearch.get({

        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate:departuredate,
        returnDate: returndate,
        adults:adults
       });
       
    }}
       res.send({
           status:'ok',
           data: result
       });

    
    } catch (error) {

        next(error);
        
    }finally {
        if(connection) connection.release();
    }

};

module.exports = newSearch ;