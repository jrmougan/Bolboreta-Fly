require('dotenv').config();
const express = require('express');

const app = express();

const { PORT } = process.env;

/**
 * #################
 * ## Middlewares ##
 * #################
 */

const { userExists } = require('./middlewares/index');

/**
 * ###############################
 * ## Controladores de usuarios ##
 * ###############################
 */

const { newUser } = require('./controllers/user/index');

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

const { newBookingPassenger } = require('./controllers/passenger/index');

// Middleware que deserializa un body en formato "raw".
app.use(express.json());

/**
 * ########################
 * ## Endpoints usuarios ##
 * ########################
 */

//Crear nuevo usuario

app.post('/register', newUser);

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

app.post('/booking/newPassenger', newBookingPassenger);

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
