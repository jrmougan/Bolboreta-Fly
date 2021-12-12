# Bolboreta-Fly

## Estructura del repositorio

    .
    ├── Backend
    ├── Frontend
    └── README.md

## Backend

### BBDD

- [x] Definir que datos queremos guardar
- [x] Definir las Entidades
- [x] Definir los campos de cada entidad
- [x] Definir las relaciones de las entidades
- [x] Diseñar las tablas en SQL
- [x] Crear el Script SQL para generar la BBDD
- [ ] Definir los datos maestros (Provincias, Localidades, ...)
- [ ] Generar datos aleatorios con Faker mediante NodeJS

### Base del proyecto Backend

- [x] Inicializar el proyecto npm
- [ ] Configurar ESLINT/Prettier y definir el formato a utilizar
- [ ] Crear la estructura (Controladores/Middlewares/server.js/helpers.js,...)
- [ ] Crear las estructuras de comentarios para la organización de los archivos JS
- [ ] Crear los Endpoints necesarios

### APIS Externas

(TO-DO)

### Endpoints

#### Usuario (Marta)

- [x] Crear un usuario ('post', /register)
- [ ] Modificar usuario ('put', /user/:userId/edit)
- [ ] Borrar usuario ('delete', /user/:userId/delete)
- [ ] Recuperar contraseña ('put', /user/:userID/recover)
- [ ] Activar usuario ('get', /user/activate/:userID/:activationCode)
- [ ] Login usuario ('post', /user/login)

#### Pasajero (Eduardo)

- [x] Añadir pasajero ('post', /booking/:bookingId/passenger/new)
- [ ] Obtener pasajeros de reserva ('get', /booking/:bookingId/getAllPassanger)
- [ ] Editar pasajero ('put', /booking/:bookingId/passenger/:idPassenger/edit)
- [ ] Obtener datos pasajero ('get', /booking/:boookingId/passenger/:idPassenger/getPassengerData)
- [ ] Borrar pasajero ('delete', /booking/:bookingId/passenger/:idPassenger/delete)

#### Reserva (Jesús)

- [ ] Nueva reserva ('post', /booking/newBooking/itinerary/:idItinerary)
- [ ] Obtener Reservas ('get' /booking/:bookingId/getBookings)
- [ ] Obtener Datos Reserva ('get', /booking/:bookingId/getBooking)

#### Itinerario

- [ ] GuardarItinerario ()

#### Flight

- [ ]

#### MIDDLEWARES

- [ ] isAuth
- [ ] userExist
- [ ] canEditUser
- [ ] canViewBooking

....
-- TODO --

### Validaciones de datos

(TO-DO)

## Frontend

(TO-DO)
