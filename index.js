const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
const port = process.env.PORT || 5001;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`



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


/** Routes */
app.get('/', (req, res) => {
    // res.send('<h2>:: !! ::Node Docker:: !! :</h2>')
    // res.send(`
    // <h2>:: !! ::Node Docker:: !! ::</h2>
    // <br />
    // <h4>Development</h4>
    // `)
    res.send(`
    <h2>:: !! ::Node Docker:: !! ::</h2>
    <br />
    <h4>Production</h4>
    `)
})

app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
});