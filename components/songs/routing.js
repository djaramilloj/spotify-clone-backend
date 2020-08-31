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
        .catch(error => response.error(req, res, error, 500)) 
})

Router.post('/:songId', (req, res) => {
    // listen to a song
    const data = {
        userId: req.session.userId,
        songId: req.params.songId,
    }
    Song.setRecordOfPlaySong(data)
        .then(data => {
            response.success(req, res, data, 201)
        }) 
        .catch(error => response.error(req, res, error, 500)) 
})

Router.get('/records', (req, res) => {
    // get the records of songs listened by any user
    const data = {
        userId: req.session.userId,
    }
    Song.getSongsListenedByUser(data)
        .then(data => {
            response.success(req, res, data, 200)
        }) 
        .catch(error => response.error(req, res, error, 500)) 
})

Router.get('/all-records', (req, res) => {
    // for data science purposes
    Song.getAllRecords()
        .then(data => {
            response.success(req, res, data, 200)
        }) 
        .catch(error => response.error(req, res, error, 500)) 
})

module.exports = Router;