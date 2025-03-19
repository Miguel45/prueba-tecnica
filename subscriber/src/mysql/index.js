const mysql = require('mysql2/promise') // Usamos la versión promesa de mysql2

// Configuración de MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST || 'mysql', // Nombre del servicio en Docker Compose
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'mydb',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig)

// Función para conectar a MySQL y crear la tabla si no existe
const connectDB = async () => {
  try {
    const connection = await pool.getConnection()
    await connection.query(`
      CREATE TABLE IF NOT EXISTS random_numbers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        randomNumber INT,
        squaredRandomNumber INT,
        timestamp TIMESTAMP
      )
    `)
    console.log('[SUBSCRIBER] MySQL Connected')
    connection.release() // Liberar la conexión
  } catch (err) {
    console.error('[SUBSCRIBER] MySQL Error:', err.message)
    setTimeout(connectDB, 5000) // Reintenta cada 5 segundos
  }
}

// Iniciar la conexión a MySQL
connectDB()

// Exportar el pool de conexiones
module.exports = {
  pool,
}