require('dotenv').config();
const express = require('express');

const app = express();

const { PORT } = process.env;

/**
 * #################
 * ## Middlewares ##
 * #################
 */

const { userExists, isAuth, caneditUser } = require('./middlewares/index');

/**
 * ###############################
 * ## Controladores de usuarios ##
 * ###############################
 */

const { newUser, activeUser, loginUser, editUser, editAvatar } = require('./controllers/user/index');

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
app.put('/user/:iduser/edit', userExists, isAuth, caneditUser, editUser);
app.delete('/user/:iduser/delete');
app.put('/user/:iduser/recover');
app.get('/register/validate/:registration_code', activeUser);
app.post('/login', loginUser);
app.put('/user/:iduser/avatar', userExists, isAuth, caneditUser, editAvatar);

/**
 * ########################
 * ## Endpoints reservas ##
 * ########################
 */

app.post('/booking/newBooking/itinerary/:idItinerary');
app.get('/booking/:bookingId/getBookings');
app.get('/booking/:bookingId/getBooking');

/**
 * #########################
 * ## Endpoints pasajeros ##
 * #########################
 */

app.post('/booking/newPassenger', newBookingPassenger);
app.get('/booking/:bookingId/getAllPassanger');
app.put('/booking/:bookingId/passenger/:idPassenger/edit');
app.get('/booking/:bookingId/passenger/:idPassenger/getPassengerData');
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
