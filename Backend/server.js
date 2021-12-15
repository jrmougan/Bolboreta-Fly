require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');

const { PORT } = process.env;

const app = express();

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
} = require('./controllers/user/index');

/**
 * ###############################
 * ## Controladores de reservas ##
 * ###############################
 */

const { newBooking, getBookings } = require('./controllers/booking/index');

/**
 * ###############################
 * ##  Controladores pasajeros  ##
 * ###############################
 */

const { newBookingPassenger } = require('./controllers/passenger/index');
const { is } = require('express/lib/request');

// Middleware que deserializa un body en formato "raw".
app.use(express.json());

// Middleware que deserializa un body en formato "form-data".
app.use(fileUpload());

/**
 * ########################
 * ## Endpoints usuarios ##
 * ########################
 */

//Crear nuevo usuario

app.post('/register', newUser);
app.put('/user/:iduser/edit', userExists, isAuth, caneditUser, editUser);
app.delete('/user/:iduser/delete', userExists, isAuth, caneditUser, deleteUser);
app.put('/user/:iduser/recover', userExists, isAuth, caneditUser, recoveryPass);
app.get('/register/validate/:registration_code', activeUser);
app.post('/login', loginUser);
app.put('/user/:iduser/avatar', userExists, isAuth, caneditUser, editAvatar);
app.get('/user/:iduser', userExists, isAuth, getUser);
app.post('/user/:iduser/resetpass', userExists, isAuth, caneditUser, resetPass);
app.post('/user/:iduser/editpass', userExists, isAuth, caneditUser, editPass);
/**
 * ########################
 * ## Endpoints reservas ##
 * ########################
 */

app.post('/booking/newBooking', newBooking);
app.get('/booking/:userId/getBookings', getBookings);
app.get('/booking/:bookingId/getBooking');

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
