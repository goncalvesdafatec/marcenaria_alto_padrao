const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: 'marcenaria_alto_padrao',

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,

    timezone: '-03:00'
});

// Teste de conexão
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log(' Banco de dados conectado com sucesso!');
        connection.release();
    } catch (error) {
        console.error(' Erro ao conectar ao MySQL:', error.message);
    }
})();

module.exports = pool;