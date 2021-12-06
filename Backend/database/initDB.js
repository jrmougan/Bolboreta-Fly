const getDB = require('./getDB');
const faker = require('faker/locale/es');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { format } = require('date-fns');

// Función para formatear una fecha.
function formatDate(date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss');
}

async function main() {
    let connection;
    try {
        connection = await getDB();

        // Borramos las tablas si existen

        await connection.query('DROP TABLE IF EXISTS itinerary_rel_flight');
        await connection.query('DROP TABLE IF EXISTS passenger_rel_flight');
        await connection.query('DROP TABLE IF EXISTS flight');
        await connection.query('DROP TABLE IF EXISTS passenger');
        await connection.query('DROP TABLE IF EXISTS booking');
        await connection.query('DROP TABLE IF EXISTS itinerary');
        await connection.query('DROP TABLE IF EXISTS user');

        await connection.query(`CREATE TABLE user(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name_user VARCHAR(60) NOT NULL,
            lastname VARCHAR(60) NOT NULL,
            lastname2 VARCHAR(60),
            bio VARCHAR(5000),
            address VARCHAR(255),
            email VARCHAR(70) NOT NULL,
            password VARCHAR(255) NOT NULL,
            rol TINYINT NOT NULL DEFAULT 1,
            avatar VARCHAR(255),
            birthdate DATE,
            active BOOLEAN NOT NULL default false,
            registration_code VARCHAR(100),
            recover_code VARCHAR(100),
            deleted BOOLEAN default false
            )`);

        console.log('Tabla de usuarios creada');

        await connection.query(`CREATE TABLE itinerary(
            id INT PRIMARY KEY AUTO_INCREMENT,
            duration VARCHAR(50) NOT NULL,
            code_origin CHAR(5) NOT NULL,
            code_destiny CHAR(5) NOT NULL,
            stops TINYINT
            )`);

        console.log('Tabla itinerary creada');

        await connection.query(`CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            booking_code VARCHAR(50) NOT NULL,
            creation_date DATETIME NOT NULL,
            payment_method TINYINT,
            complete BOOLEAN NOT NULL default(false),
            final_price FLOAT unsigned,
            currency TINYINT,
            canceled BOOLEAN NOT NULL default(false),
            oneway BOOLEAN NOT NULL,
            id_user int NOT NULL,
            id_itinerary int NOT NULL,
            FOREIGN KEY (id_user) REFERENCES user(id),
            FOREIGN KEY (id_itinerary) REFERENCES itinerary(id)
            );`);

        console.log('Tabla Booking Creada');

        await connection.query(`CREATE TABLE passenger (
            id INT PRIMARY KEY auto_increment,
            name_passenger VARCHAR (50) NOT NULL ,
            lastname VARCHAR (255) NOT NULL ,
            lastname2 VARCHAR (255) NOT NULL ,
            typephone VARCHAR (50) ,
            address VARCHAR(255) NOT NULL,
            phone VARCHAR (50) NOT NULL ,
            code_phone VARCHAR (10) NOT NULL,
            email VARCHAR (10) NOT NULL ,
            birthdate VARCHAR (250) NOT NULL ,
            documentype VARCHAR(25) NOT NULL,
            document VARCHAR(50) NOT NULL ,
            issuancedate DATETIME NOT NULL,
            expiredate DATETIME NOT NULL,
            issuancecountry VARCHAR(50) NOT NULL,
            validitycountry VARCHAR (50) NOT NULL,
            birthplace VARCHAR(50) NOT NULL,
            gender ENUM('MALE', 'FEMALE', 'UNSPECIFIED', 'UNDISCLOSED') NOT NULL,
            namecontact VARCHAR(50) NOT NULL,
            emailcontact VARCHAR(50) NOT NULL,
            id_booking INT NOT NULL ,
            FOREIGN KEY (id_booking) REFERENCES booking(id)
            );`);

        console.log('Tabla Passenger creada');

        await connection.query(`CREATE TABLE flight (
            id int PRIMARY KEY AUTO_INCREMENT,
            cod_aerolinea varchar(50) NOT NULL,
            codigo_origen varchar(10) NOT NULL,
            codigo_destino varchar(10) NOT NULL,
            terminal_origen char(5),
            fecha_salida datetime NOT NULL,
            fecha_llegada datetime NOT NULL,
            codigo_avion char(10) NOT NULL,
            num_vuelo char(10) NOT NULL
            );`);

        console.log('Tabla flight creada');

        await connection.query(`CREATE TABLE passenger_rel_flight (
            idpassenger INT NOT NULL,
            FOREIGN KEY (idpassenger) REFERENCES passenger(id),
            idflight INT NOT NULL,
            FOREIGN KEY (idflight) REFERENCES flight(id),
            seat VARCHAR(3) NOT NULL,
            PRIMARY KEY (idpassenger, idflight)
            );`);

        console.log('Tabla passenger_rel_flight creada');

        await connection.query(`CREATE TABLE itinerary_rel_flight (
            flight_id int NOT NULL,
            itinerary_id int NOT NULL,
            foreign key(flight_id) references flight(id),
            foreign key(itinerary_id) references itinerary(id),
            PRIMARY KEY (flight_id, itinerary_id)
        );`);

        console.log('Tabla itinerary_rel_flight creada');

        // Inserciones de datos

        //usuario admin

        // Datos de faker.
        const email = faker.internet.email();
        const name_user = faker.name.findName();
        const password = await bcrypt.hash('123456', saltRounds);
        const bio = faker.lorem.words(12);
        const avatar = faker.lorem.word(1);
        const lastname = faker.name.firstName();
        const lastname2 = faker.name.firstName();

        await connection.query(
            `
                    INSERT INTO user(name_user, lastname, lastname2, email, password, bio, avatar, rol) VALUES (?,?,?,?,?,?,?,?)`,
            [name_user, lastname, lastname2, email, password, bio, avatar, 0]
        );

        //usuarios
        const num_usuarios = 10;

        for (let index = 0; index < num_usuarios; index++) {
            // Datos de faker.
            const email = faker.internet.email();
            const name_user = faker.name.findName();
            const password = await bcrypt.hash('123456', saltRounds);
            const bio = faker.lorem.words(12);
            const avatar = faker.lorem.word(1);
            const lastname = faker.name.firstName();
            const lastname2 = faker.name.firstName();

            await connection.query(
                `
            INSERT INTO user(name_user, lastname, lastname2, email, password, bio, avatar) VALUES (?,?,?,?,?,?,?)`,
                [name_user, lastname, lastname2, email, password, bio, avatar]
            );
        }

        // Generar itinerario

        const num_itinerario = 10;

        for (let i = 0; i < num_itinerario; i++) {
            const duration = faker.datatype.number(10);
            const code_origin = faker.datatype.number(3);
            const code_destiny = faker.datatype.number(3);
            const stops = faker.datatype.number({
                min: 0,
                max: 2,
            });

            await connection.query(
                `INSERT INTO itinerary (duration, code_origin, code_destiny, stops) VALUES (${duration}, ${code_origin}, ${code_destiny}, ${stops});`
            );
        }

        // Generar reservas
        const num_reservas = 10;

        for (let i = 0; i < num_reservas; i++) {
            const booking_code = faker.datatype.number(10);
            const creation_date = formatDate(
                new Date(faker.datatype.datetime())
            );
            const payment_method = faker.datatype.number({
                min: 0,
                max: 2,
            });
            const final_price = faker.datatype.number(8);
            const currency = faker.datatype.number({
                min: 0,
                max: 2,
            });
            const id_user = faker.datatype.number({
                min: 1,
                max: 10,
            });

            const id_itinerary = faker.datatype.number({
                min: 1,
                max: 10,
            });

            await connection.query(`
            INSERT INTO booking (booking_code, creation_date, payment_method, final_price, currency, oneway,id_user, id_itinerary) 
            VALUES (${booking_code},"${creation_date}",${payment_method},${final_price},${currency},false,${id_user},${id_itinerary});`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        // Si existe una conexión con la base de datos la liberamos.
        if (connection) connection.release();
        // Cerramos el proceso actual.
        process.exit(0);
    }
}

main();
