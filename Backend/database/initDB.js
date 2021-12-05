const getDB = require('./getDB');

async function main() {
  let connection;
  try {
    connection = await getDB();

        // Borramos las tablas si existen

        await connection.query('DROP TABLE IF EXISTS itinerary_rel_flight');
        await connection.query('DROP TABLE IF EXISTS passenger_rel_flight');
        await connection.query('DROP TABLE IF EXISTS flight');
        await connection.query('DROP TABLE IF EXISTS itinerary');
        await connection.query('DROP TABLE IF EXISTS passenger');
        await connection.query('DROP TABLE IF EXISTS booking');
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
            rol TINYINT NOT NULL,
            avatar VARCHAR(255),
            birthdate DATE,
            active BOOLEAN NOT NULL default false,
            registration_code VARCHAR(100),
            recover_code VARCHAR(100),
            deleted BOOLEAN default false
            )`);

        console.log('Tabla de usuarios creada');

    console.log('Tabla de usuarios creada');

    await connection.query(`CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            booking_code VARCHAR(50) NOT NULL,
            creation_date DATETIME NOT NULL,
            payment_method TINYINT NOT NULL,
            final_price INT unsigned,
            currency TINYINT,
            canceled BOOLEAN NOT NULL default(false),
            oneway BOOLEAN NOT NULL,
            id_user int NOT NULL,
            FOREIGN KEY (id_user) REFERENCES user(id)
            );`);

    console.log('Tabla Booking Creada');

    await connection.query(`CREATE TABLE passenger (
            id INT PRIMARY KEY auto_increment,
            name_passenger VARCHAR (50) NOT NULL ,
            lastname VARCHAR (255) NOT NULL ,
            lastname2 VARCHAR (255) NOT NULL ,
            typephone VARCHAR (50) ,
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

    await connection.query(`CREATE TABLE itinerary(
            id INT PRIMARY KEY AUTO_INCREMENT,
            duration VARCHAR(50) NOT NULL,
            code_origin CHAR(5) NOT NULL,
            code_destiny CHAR(5) NOT NULL,
            stops TINYINT,
            id_booking INT NOT NULL,
            FOREIGN KEY (id_booking) REFERENCES booking(id)
            )`);

    console.log('Tabla itinerary creada');

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
