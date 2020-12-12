const mongoose = require("mongoose");
const shortId = require("shortid");
const nanoid = require("nanoid");

const urlDbSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortendUrl: {
        type: String,
        required: true,
        default: nanoid.nanoid()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }

});

// Name of the model here should be a singular of the collections name and 
// and with a capital letter
// `Url` for `urls`
module.exports = mongoose.model("Url", urlDbSchema);