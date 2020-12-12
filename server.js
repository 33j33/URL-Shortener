const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const urlModel = require('./models/url.js');
const app = express()


// Needed to accept contents inside POST body
app.use(express.json());

// Connect to Mongoose
const mongodbURI = process.env.DB_URI;
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Connection to DB established and Server is running");
        })
    })
    .catch((err) => {
        console.log(err)
    })

// We don't want server to listen for requests before the connection to the database has been established
// Hence we enclose the app.listen inside the then() so that it runs only when the 
// connection is successfully established
// mongoose.connect returns a promise.

// Setting the view enginer as 'ejs'
app.set('view engine', 'ejs');

// Serving up the static server files
app.use(express.static('public'));

// Getting all urls saved in `urls` collection 
app.get('/', async (req, res) => {
    const urls = await urlModel.find();
    res.render('index', { urls });
})

// POST request
// Sending a url to shorten using post request
app.post('/shortenUrl', async (req, res) => {
    try {
        await urlModel.create({ fullUrl: req.body.fullUrl })
        console.log(req.body.fullUrl)
        res.status(201).redirect('/');
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})