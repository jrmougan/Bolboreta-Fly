require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Variable que almacenará el pool de conexiones.
let pool;

// Función que retorna una conexión a la base de datos.
const getDB = async () => {
    // Si no hay una conexión...
    if (!pool) {
        // Creamos un grupo de conexiones
        pool = mysql.createPool({
            connectionLimit: 10,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            timezone: 'Z',
        });
    }

    // Ejecutamos el método "getConnection" de dicho pool y retornamos
    // una conexión que este libre.
    return await pool.getConnection();
};

module.exports = getDB;