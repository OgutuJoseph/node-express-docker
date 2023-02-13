const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5001;


/** Connecting to db */
// mongoose.connect('mongodb://username:password@host:port/database?options...')

// mongoose
//     .connect('mongodb://root:password@172.18.0.2:27017/?authSource=admin')
//     .then(() => console.log('Successfully connected to the database.'))
//     .catch((e) => console.log(e))

// pointing to the host / ip based on docker-compose configuration
mongoose
    .connect('mongodb://root:password@mongo:27017/?authSource=admin')
    .then(() => console.log('Successfully connected to the mongo database.'))
    .catch((e) => console.log(e))

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