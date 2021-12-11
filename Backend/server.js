require('dotenv').config();
const express = require('express');

const { PORT } = process.env;

const app = express();

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

const { newUser, activeUser } = require('./controllers/user/index');

/**
 * ###############################
 * ## Controladores de reservas ##
 * ###############################
 */

const { newBooking } = require('./controllers/booking/index');

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
app.put('/user/:userId/edit');
app.delete('/user/:userId/delete');
app.put('/user/:userId/recover');
app.get('/register/validate/:registration_code', activeUser);
app.post('/login');

/**
 * ########################
 * ## Endpoints reservas ##
 * ########################
 */

app.post('/booking/newBooking', newBooking);
app.get('/booking/:bookingId/getBookings');
app.get('/booking/:bookingId/getBooking');

/**
 * #########################
 * ## Endpoints pasajeros ##
 * #########################
 */

app.post('/booking/:bookingId/newPassenger', newBookingPassenger);
app.get('/booking/:bookingId/getAllPassanger');
app.put('/booking/:bookingId/passenger/:idPassenger/edit');
app.get('/booking/:boookingId/passenger/:idPassenger/getPassengerData');
app.delete('/booking/:bookingId/passenger/:idPassenger/delete');

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
