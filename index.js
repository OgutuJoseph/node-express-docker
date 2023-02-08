const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5001;

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