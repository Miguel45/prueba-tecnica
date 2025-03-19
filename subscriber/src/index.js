const mqtt = require('mqtt')
const { pool } = require('./mysql')
//const { add, get } = require("./firebase");
require('dotenv').config()
console.log('[SUBSCRIBER] START!')

// Función para esperar a que MySQL esté listo
const waitForMySQL = async () => {
  let isConnected = false
  while (!isConnected) {
    try {
      const connection = await pool.getConnection()
      console.log('[SUBSCRIBER] MySQL Connected')
      connection.release()
      isConnected = true
    } catch (err) {
      console.error('[SUBSCRIBER] MySQL Error:', err.message)
      console.log('[SUBSCRIBER] Reintentando en 5 segundos...')
      await new Promise(resolve => setTimeout(resolve, 5000)) // Espera 5 segundos
    }
  }
}

waitForMySQL().then(() => {
  const client = mqtt.connect(process.env.MOSQUITTO_URL || 'mqtt://mosquitto')
  client.on('connect', () => {
    console.log('[SUBSCRIBER] CONNECTED!')
    client.subscribe(process.env.MOSQUITTO_PUBLISHER_TOPIC)
  })

  client.on('message', async (topic, message) => {
    //Lee y pasa a entero en base 10 el contenido
    const randomNumber = parseInt(message.toString(), 10)
    //Eleva al cuadrado el contenido
    const squaredRandomNumber = randomNumber ** 2
    //Obtiene una instantánea del instante de lectura para diferenciarlo
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    //FIREBASE CODE
    /*
        const data = {
            squaredRandomNumber,
            timestamp
        };
    
        add(process.env.FIREBASE_COLLECTION, data);
    
        get(process.env.FIREBASE_COLLECTION);
        */
    try {
      const [result] = await pool.query(
        'INSERT INTO random_numbers ( randomNumber, squaredRandomNumber, timestamp) VALUES (?, ?, ?)',
        [randomNumber, squaredRandomNumber, timestamp]
      )
      console.log(
        `[SUBSCRIBER] guardado correctamente: ${randomNumber}² = ${squaredRandomNumber}`
      )
    } catch (err) {
      console.error('[SUBSCRIBER] Error en BD:', err.message)
    }

    try {
      const [data] = await pool.query('SELECT * FROM random_numbers WHERE 1;')
      console.log(`[SUBSCRIBER] DB actual: ${JSON.stringify(data, null, 2)}`)
    } catch (err) {
      console.error('[SUBSCRIBER] Error en BD:', err.message)
    }
  })
})
