const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    songs: {
        type: Array
    },
})


const model = mongoose.model('playlists', mySchema);
module.exports = model;