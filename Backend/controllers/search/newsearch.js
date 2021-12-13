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

        const {origin , destination, departuredate , returndate , adults } = req.body;
        let result ;
        //vuelos sólo ida

        if(!returndate){
        
       result = amadeus.shopping.flightOffersSearch.get ({
        
            originLocationCode: [origin],
            destinationLocationCode: [destination],
            departureDate: [departuredate],
            adults: [adults]
                       
        });
       
    
    }else 
        //vuelos multiples destinos

     if (!destination){

        
       result = amadeus.shopping.flightDestinationsSearch.get ({

            originLocationCode: [origin],
            
            departureDate: [departuredate],
          
            
        });

    }else 

    //Vuelos ida y vuelta

     { result = amadeus.shopping.flightOffersSearch.get({

        originLocationCode: [origin],
        destinationLocationCode: [destination],
        departureDate: [departuredate],
        returnDate: [returndate],
        adults:[adults]
       });
       
    }
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