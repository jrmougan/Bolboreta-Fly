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
       
        const {iduser} = req.body ;

        if(Number(adults) > 9 ){

            const error = new Error ('No puedes insertar mas de 9 pasajeros');
            error.httpStatus = 416;
            throw error;
        }
        

        if(iduser !== undefined){
            await connection.query(`
            INSERT INTO search (searchDate , origin , destination , departureDate , id user)
            VALUES (? ,? , ? , ? , ?)
            `,
            [
                new Date(),
                origin ,
                destination ,
                departuredate,
                iduser,
            ]);
        }
    
         
      const  result = await amadeus.shopping.flightOffersSearch.get ({
        
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departuredate,
            returnDate: returndate,
            adults: adults
                       
        });
       
    
       
        
    
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