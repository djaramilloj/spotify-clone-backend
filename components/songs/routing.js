const express = require('express');
const Router = express.Router();
const response = require('../../network/response');
const songController = require('./controller');
const Song = new songController();


Router.get('/', (req, res) => {
    const data = {
        song: req.body.song
    }
    Song.getSongs(data)
        .then(data => {
            response.success(req, res, data, 200)
        }) 
        .catch(error => response.error(req, res, error, 200)) 
})

module.exports = Router;