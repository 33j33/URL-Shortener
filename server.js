const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const urlModel = require('./models/url.js');
const app = express()


// Needed to parse contents inside POST / PUT body when sent as JSON object
// parse application/json
app.use(express.json());

// Needed to parse contents inside POST / PUT body when sent as string or array
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

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
app.set('views', './views');

// Serving up the static server files
app.use(express.static('public'));

// Getting all urls saved in `urls` collection 
app.get('/', async (req, res) => {
    const urls = await urlModel.find();
    res.render('index', { urls });
})

// POST request
// Clients send a url to shorten using post request from the form
// and the following function handles it.
app.post('/shortenUrl', async (req, res) => {
    try {
        await urlModel.create({ fullUrl: req.body.fullUrl })
        res.redirect('/');
    }
    catch (err) {
        res.sendStatus(400);
    }
})

// GET request 
// returning the full Url according to shortend Url passed in the request params
app.get('/:shortendUrl', async (req, res) => {

    const url = await urlModel.findOne({ shortendUrl: req.params.shortendUrl });
    if (url == null) {
        // url not found hence send 404
        return res.sendStatus(404);
    }
    url.clicks++;
    await url.save();
    res.redirect(url.fullUrl);
})