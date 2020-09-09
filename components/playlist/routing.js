const express = require('express');
const Router = express.Router();
const response = require('../../network/response');
const mongoose = require('mongoose');
const playController = require('./controller');
const Playlist = new playController();

Router.post('/create', (req, res) => {
    // create playlist
    const data = {
        alias: req.body.alias,
        userId: req.session.userId,
        _id: new mongoose.Types.ObjectId().toString()
    }
    Playlist.createPlaylist(data)
        .then(data => response.success(req, res, data, 201))
        .catch(error => response.error(req, res, error, 500))
})

Router.post('/:playlistId/add-song/', (req, res) => {
    // add songs to specific playlists
    const data = {
        playlistId: req.params.playlistId,
        songId: req.body.songId
    }
    Playlist.addSong(data)
        .then(data => response.success(req, res, data, 201))
        .catch(error => response.error(req, res, error, 500))
})

Router.get('/', (req, res) => {
    // add songs to specific playlists
    const data = {
        userId: req.session.userId
    }
    Playlist.getPlaylists(data)
        .then(data => response.success(req, res, data, 201))
        .catch(error => response.error(req, res, error, 500))
})


module.exports = Router;