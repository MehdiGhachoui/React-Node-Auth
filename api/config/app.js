const PROTOCOL = 'http'
const HOSTNAME = 'localhost'
const PORT = 4000
const ENV = 'development'


module.exports = process.env = {

  NODE_ENV : ENV ,
  APP_PORT : PORT,
  APP_HOSTNAME : HOSTNAME,
  APP_PROTOCOL : PROTOCOL,
  APP_SECRET : '4d2ca599b4189f74a771f44b8a8d06f572208b5649f5ae216f8e94612a267ff0' ,
  APP_ORIGIN : `${PROTOCOL}://${HOSTNAME}:${PORT}`,
  IN_PROD : ENV === 'production'

}
