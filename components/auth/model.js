const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})


const model = mongoose.model('users', mySchema);
module.exports = model;