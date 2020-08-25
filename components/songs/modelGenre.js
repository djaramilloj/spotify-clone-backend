const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
})


const model = mongoose.model('genres', mySchema);
module.exports = model;