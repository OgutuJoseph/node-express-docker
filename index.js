const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// configs
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const port = process.env.PORT || 5001;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis")

// let redisClient = createClient({ 
//     legacyMode: true,
//     host: REDIS_URL,
//     port: REDIS_PORT
// });
let redisClient = createClient({ 
    legacyMode: true,
    url: 'redis://redis:6379'
});
redisClient.connect().catch(console.error)


/** Connecting to db */
// mongoose.connect('mongodb://username:password@host:port/database?options...')

// mongoose
//     .connect('mongodb://root:password@172.18.0.2:27017/?authSource=admin')
//     .then(() => console.log('Successfully connected to the database.'))
//     .catch((e) => console.log(e))


// repeatedly try to connect to the mongo until it is done
const connectWithRetry = () => {

    // pointing to the host / ip based on docker-compose configuration
    mongoose
        .connect(
            mongoUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => console.log('Successfully connected to the mongo database.'))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 5000)
        })
};
connectWithRetry();

/** Middlewares */
// trust proxy
app.enable('trust proxy');
// redis
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: false,
        secret: SESSION_SECRET,
        resave: false,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httponly: true,
            maxAge: 30000000
        }
    
    })
  )
// To allow requests' body to be processed <for express to take body of request and attach it to request that controller has access to> )
app.use(express.json()); 


/** Routers */
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes')

/** Routes */
app.get('/api/v1', (req, res) => {
    // res.send('<h2>:: !! ::Node Docker:: !! :</h2>')
    // res.send(`
    // <h2>:: !! ::Node Docker:: !! ::</h2>
    // <br />
    // <h4>Development</h4>
    // `)
    res.send(`
    <h2>:: !! ::Node Docker:: !! ::</h2>
    <br />
    <h4>Development</h4>
    `)
    console.log('scale up ran');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
});