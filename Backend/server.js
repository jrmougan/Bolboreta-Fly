require('dotenv').config();
const express = require('express');


const app = express();

const { PORT } = process.env;

/**
 * #################
 * ## Middlewares ##
 * #################
 */


/**
 * ###############################
 * ## Controladores de usuarios ##
 * ###############################
 */


/**
 * ###############################
 * ## Controladores de reservas ##
 * ###############################
 */



/**
 * ###############################
 * ##  Controladores pasajeros  ##
 * ###############################
 */


// Middleware que deserializa un body en formato "raw".
app.use(express.json());


/**
 * ########################
 * ## Endpoints usuarios ##
 * ########################
 */


/**
 * ########################
 * ## Endpoints reservas ##
 * ########################
 */


/**
 * #########################
 * ## Endpoints pasajeros ##
 * #########################
 */



/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */
 app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});


/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */
 app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});