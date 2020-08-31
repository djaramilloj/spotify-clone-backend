const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        requires: true
    },
})


const model = mongoose.model('records', mySchema);
module.exports = model;