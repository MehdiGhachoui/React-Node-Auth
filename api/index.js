const   express  = require("express")
const   mongoose = require('mongoose')
const   cookieParser = require('cookie-parser')
const   session  = require('express-session')
const   redis =  require('redis')
const   cors = require('cors')


const   {MONGO_URI , MONGO_OPTIONS} = require('./config/db')
const   {APP_PORT} = require('./config/app')



const   app  = express() ;


// Database connection
mongoose.connect(MONGO_URI, MONGO_OPTIONS)


// BodyParser
app.use(express.json())


app.use(cookieParser());


// Redis Connection
//const RedisStore = connectRedis(session)

//const client =  redis.createClient(REDIS_OPTIONS)

//const store = new RedisStore({ client })

app.use(cors())

//  Express Session
app.use (session({
        secret : "keyboard cat",
        resave: true,
        saveUninitialized: true
    })
);


// Routes
app.use(require('./routes/signup'))

app.use(require('./routes/signin'))

app.use(require('./routes/reset'))

app.use(require('./routes/verify'))

app.use(require('./routes/google'))

app.use(require('./routes/facebook'))



// Create Server
app.listen(APP_PORT, () => console.log(`Running on port ${APP_PORT} !`))
