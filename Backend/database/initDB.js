const getDB = require('./getDB');
const faker = require('faker/locale/es');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const airports = require('./airports.json');

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

        await connection.query(
            'DROP TABLE IF EXISTS passenger_rel_flight_rel_booking'
        );
        await connection.query('DROP TABLE IF EXISTS flight');
        await connection.query('DROP TABLE IF EXISTS passenger');
        await connection.query('DROP TABLE IF EXISTS booking');
        await connection.query('DROP TABLE IF EXISTS search');
        await connection.query('DROP TABLE IF EXISTS user');

        await connection.query(`CREATE TABLE user(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name_user VARCHAR(60) NOT NULL,
            lastname VARCHAR(60),
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
            createDate DATE,
            modifyDate DATE,
            deleted BOOLEAN default false
            )`);

        console.log('Tabla de usuarios creada');

        await connection.query(`CREATE TABLE search(
            id INT PRIMARY KEY AUTO_INCREMENT,
            searchDate DATE NOT NULL,
            origin VARCHAR(100) NOT NULL,
            destination VARCHAR(100) ,
            departureDate DATE ,
            id_user INT NOT NULL,
            FOREIGN KEY (id_user) REFERENCES user(id)
        );`);
        console.log('tabla search creada');

        await connection.query(`CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            booking_code VARCHAR(50) NOT NULL,
            creation_date DATE NOT NULL,
            payment_method TINYINT,
            departure_code VARCHAR(50),
            destination_code VARCHAR(50),
            complete BOOLEAN NOT NULL default(false),
            final_price FLOAT unsigned,
            currency CHAR(10),
            canceled BOOLEAN NOT NULL default(false),
            oneway BOOLEAN NOT NULL,
            id_user int NOT NULL,
            FOREIGN KEY (id_user) REFERENCES user(id),
            departure_duration VARCHAR(50),
            return_duration VARCHAR(50),
            name VARCHAR(50),
            lastname VARCHAR(50),
            documentype VARCHAR(25),
            document VARCHAR(50),
            address VARCHAR(255),
            city VARCHAR(255),
            country VARCHAR(255),
            phone VARCHAR(12)
            );`);

        console.log('Tabla Booking Creada');

        await connection.query(`CREATE TABLE passenger (
            id INT PRIMARY KEY auto_increment,
            name_passenger VARCHAR (50) NOT NULL ,
            lastname VARCHAR (255) NOT NULL ,
            typephone VARCHAR (50) ,
            phone VARCHAR (50) NOT NULL ,
            code_phone VARCHAR (10) NOT NULL,
            email VARCHAR (100) NOT NULL ,
            birthdate VARCHAR (250) NOT NULL ,
            documentype VARCHAR(25) NOT NULL,
            document VARCHAR(50) NOT NULL ,
            issuancedate DATETIME NOT NULL,
            expiredate DATETIME NOT NULL,
            issuancecountry VARCHAR(50) NOT NULL,
            validitycountry VARCHAR(50) NOT NULL,
            birthplace VARCHAR(50) NOT NULL,
            gender ENUM('MALE', 'FEMALE', 'UNSPECIFIED', 'UNDISCLOSED') NOT NULL,
            namecontact VARCHAR(50),
            emailcontact VARCHAR(50)
            );`);

        console.log('Tabla Passenger creada');

        await connection.query(`CREATE TABLE flight (
            id int PRIMARY KEY AUTO_INCREMENT,
            carrier_code varchar(50) NOT NULL,
            departure_code varchar(10) NOT NULL,
            arrival_code varchar(10) NOT NULL,
            duration VARCHAR(50),
            flight_num char(10) NOT NULL
            );`);

        console.log('Tabla flight creada');

        await connection.query(`CREATE TABLE passenger_rel_flight_rel_booking (
            flight_id int NOT NULL,
            FOREIGN KEY (flight_id) REFERENCES flight(id), 
            passenger_id int NOT NULL,
            FOREIGN KEY (passenger_id) REFERENCES passenger(id),
            booking_id int NOT NULL,
            departure_terminal char(5),
            arrival_terminal char(5),
            departure_time datetime NOT NULL,
            arrival_time datetime NOT NULL,
            FOREIGN KEY (booking_id) REFERENCES booking(id),
            aircraft_code char(10) NOT NULL,
            bags int,
            seat VARCHAR(10),
            PRIMARY KEY (flight_id, passenger_id, booking_id)
            )`);

        console.log('Tabla passenger_rel_flight_rel_booking');

        // Inserciones de datos

        //usuario admin

        // Datos de faker.
        const email = faker.internet.email();
        const name_user = faker.name.firstName();
        const password = await bcrypt.hash('123456', saltRounds);
        const bio = faker.lorem.words(12);
        const avatar = faker.lorem.word(1);
        const lastname = faker.name.lastName();
        const lastname2 = faker.name.lastName();

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
            const name_user = faker.name.firstName();
            const password = await bcrypt.hash('123456', saltRounds);
            const bio = faker.lorem.words(12);
            const avatar = faker.lorem.word(1);
            const lastname = faker.name.lastName();
            const lastname2 = faker.name.lastName();

            await connection.query(
                `
            INSERT INTO user(name_user, lastname, lastname2, email, password, bio, avatar) VALUES (?,?,?,?,?,?,?)`,
                [name_user, lastname, lastname2, email, password, bio, avatar]
            );
        }

        // Generar reservas
        /*
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
                max: num_usuarios,
            });

            await connection.query(`
            INSERT INTO booking (booking_code, creation_date, payment_method, final_price, currency, oneway,id_user) 
            VALUES (${booking_code},"${creation_date}",${payment_method},${final_price},${currency},false,${id_user});`);
        }

        console.log('Reservas falsas insertadas');

        const num_passengers = 10;

        for (let i = 0; i < num_passengers; i++) {
            const name_passenger = faker.name.firstName();
            const lastname = faker.name.lastName();
            const lastname2 = faker.name.lastName();
            const typephone = faker.helpers.randomize(['home', 'mobile']);
            const address = faker.address.streetAddress(true);
            const code_phone = '34';
            const phone = faker.phone.phoneNumber();
            const email = faker.internet.email();
            const birthdate = formatDate(new Date(faker.date.past(100)));
            const documentype = 'DNI';
            const document = faker.datatype.number({
                min: 10000,
                max: 99999999,
            });
            const inssuancedate = formatDate(new Date(faker.date.past(10)));
            const expiredate = formatDate(new Date(faker.date.future(10)));
            const inssuancecountry = faker.address.country();
            const validitycountry = inssuancecountry;
            const birthplace = faker.address.city();
            const gender = faker.helpers.randomize([
                'MALE',
                'FEMALE',
                'UNSPECIFIED',
                'UNDISCLOSED',
            ]);
            const namecontact = faker.name.firstName() + faker.name.lastName();
            const emailcontact = faker.internet.email();
            const id_booking = faker.datatype.number({
                min: 1,
                max: num_reservas,
            });

            await connection.query(`INSERT INTO
            passenger (name_passenger, lastname, lastname2, typephone, address, code_phone, phone, email, birthdate, documentype, document, issuancedate, expiredate, issuancecountry, validitycountry, birthplace, gender, namecontact, emailcontact, id_booking) 
            VALUES
            ("${name_passenger}","${lastname}","${lastname2}","${typephone}","${address}","${code_phone}","${phone}","${email}","${birthdate}","${documentype}",${document},"${inssuancedate}","${expiredate}","${inssuancecountry}","${validitycountry}","${birthplace}","${gender}","${namecontact}","${emailcontact}", ${id_booking})`);
        }

        console.log('Pasajeros falsos insertados');

        // Insertamos vuelos

        const num_vuelos = 10;

        for (let i = 0; i < num_vuelos; i++) {
            await connection.query(
                `INSERT INTO flight (carrier_code, departure_code, arrival_code, duration, flight_num) 
                VALUES ("AF2",
                 "${airports[faker.datatype.number(airports.length)].iata}", "${
                    airports[faker.datatype.number(airports.length)].iata
                }", "PT11H15M", "772")`
            );
        }
        console.log('Vuelos falsos insertados');
        */
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
