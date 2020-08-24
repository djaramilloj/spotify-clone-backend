const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    genreId: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
})


const model = mongoose.model('songs', mySchema);
module.exports = model;