require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { PORT } = process.env;

const app = express();
app.use(cors());

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

const {
    newUser,
    activeUser,
    loginUser,
    editUser,
    editAvatar,
    getUser,
    recoveryPass,
    resetPass,
    editPass,
    deleteUser,
    loginGoogle,
} = require('./controllers/user/index');

app.use(cors());

/**
 * ###############################
 * ## Controladores de reservas ##
 * ###############################
 */

const {
    offerPrice,
    newSearch,
    advanceSearch,
    seatMap,
    citySearch,
} = require('./controllers/search/index');

const {
    newBooking,
    getBookings,
    getBooking,
} = require('./controllers/booking/index');

/**
 * ###############################
 * ##  Controladores pasajeros  ##
 * ###############################
 */

const { newBookingPassenger } = require('./controllers/passenger/index');
const { is } = require('express/lib/request');

/**
 * #################################
 * ##  Controladores Itinerarios  ##
 * #################################
 */

const { retrieveItinerary } = require('./controllers/itinerary/index');

/**
 * ############################
 * ##  Controladores Vuelos  ##
 * ############################
 */
const {
    getIdFlightOrder,
    getFlightsIds,
    getFlightDurationByNumber,
    getFlightDuration,
} = require('./controllers/flight/index');

// Middleware que deserializa un body en formato "raw".
app.use(express.json());

// Middleware que deserializa un body en formato "form-data".
app.use(fileUpload());

app.use(express.static('static'));

/**
 * ########################
 * ## Endpoints usuarios ##
 * ########################
 */

app.post('/register', newUser);
app.put('/user/:iduser/edit', userExists, isAuth, caneditUser, editUser);
app.delete('/user/:iduser/delete', userExists, isAuth, caneditUser, deleteUser);
app.put('/recover', recoveryPass);
app.get('/register/validate/:registration_code', activeUser);
app.post('/login', loginUser);
app.put('/user/:iduser/avatar', userExists, isAuth, caneditUser, editAvatar);
app.get('/user/:iduser', userExists, isAuth, getUser);
app.post('/resetpass', resetPass);
app.post('/user/:iduser/editpass', userExists, isAuth, caneditUser, editPass);
app.post('/login_google', loginGoogle);

/**
 * ########################
 * ## Endpoints reservas ##
 * ########################
 */

app.get('/flight/:idFlight/duration', getFlightDuration);
app.get('/search', newSearch);
app.get('/citysearch', citySearch);
app.post('/advancesearch', advanceSearch);
app.post('/booking/newBooking', isAuth, newBooking);
app.get('/booking/:userId/getBookings', getBookings);
app.get('/booking/:bookingId/getBooking', getBooking);
app.post('/pricing', offerPrice);
app.post('/seatmap', seatMap);
app.get('/booking/retrieveBooking/:bookingCode', retrieveItinerary);
app.get('/booking/:bookingId/getIdFlightOrder', getIdFlightOrder);
app.get('/booking/:bookingId/getFlightsIds', getFlightsIds);
app.get('/flight/:bookingId/:flightNumber', getFlightDurationByNumber);

/**
 * #########################
 * ## Endpoints pasajeros ##
 * #########################
 */

app.post('/booking/:bookingId/newPassenger', newBookingPassenger);
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
