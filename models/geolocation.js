const mongoose = require('../database/index');

const GeolocationSchema = mongoose.Schema({
    country: {
        type: String
    },
    region: {
        type: String
    },
    city: {
        type: String
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    },
    query: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Geolocation = mongoose.model('Geolocation', GeolocationSchema)

module.exports = Geolocation; 