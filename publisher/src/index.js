const { CronJob } = require('cron')
const mqtt = require('mqtt')
require('dotenv').config()
console.log('[PUBLISHER] START!')

const client = mqtt.connect(process.env.MOSQUITTO_URL || 'mqtt://mosquitto')
client.on('connect', () => {
  console.log('[PUBLISHER] Connected!')
  //Genera un número aleatorio en este caso cada segundo y lo publica, pueden modificarse los parámetros en .env
  const job = new CronJob(
    process.env.CRON_TIME,
    function () {
      const randomNumber = Math.floor(Math.random() * 100) + 1
      client.publish(process.env.MOSQUITTO_PUBLISHER_TOPIC, `${randomNumber}`)
      console.log('[PUBLISHER] Success: ', randomNumber)
    },
    null,
    true,
    'Europe/Madrid'
  )
})
client.on('error', (err) => {
    console.error('[PUBLISHER] MQTT Error:', err)
  })
  
  client.on('close', () => {
    console.log('[PUBLISHER] MQTT Connection closed')
  })
  
  client.on('offline', () => {
    console.log('[PUBLISHER] MQTT Client is offline')
  })