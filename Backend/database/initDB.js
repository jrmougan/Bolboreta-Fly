const getDB = require('./getDB');

async function main() {
    let connection;
    try {
        connection = await getDB();

        // Borramos las tablas si existen

        await connection.query('DROP TABLE IF EXISTS user');
        await connection.query('DROP TABLE IF EXISTS passenger');
        await connection.query('DROP TABLE IF EXISTS booking');
        await connection.query('DROP TABLE IF EXISTS itinerary');
        await connection.query('DROP TABLE IF EXISTS flight');
        await connection.query('DROP TABLE IF EXISTS passenger_rel_flight');
        await connection.query('DROP TABLE IF EXISTS itinerary_flight');

        console.log('Tablas eliminadas');

        await connection.query(`CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            booking_code VARCHAR(50) NOT NULL,
            creation_date DATETIME NOT NULL,
            payment_method TINYINT NOT NULL,
            final_price INT unsigned,
            currency TINYINT,
            canceled BOOLEAN NOT NULL default(false),
            oneway BOOLEAN NOT NULL
            );`)

        console.log('Tabla Booking Creada');

        await connection.query(`CREATE TABLE passenger (
            id INT PRIMARY KEY auto_increment,
            name VARCHAR (50) NOT NULL ,
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
            idbooking INT NOT NULL ,
            FOREIGN KEY (idbooking) REFERENCES booking(id)
            );`);

        console.log('Tabla Passenger creada');

            


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