const auth = require('../components/auth/routing');
const playlist = require('../components/playlist/routing');
const songs = require('../components/songs/routing');

const routes = (app) => {
    app.use('/auth', auth);
    app.use('/playlist', playlist);
    app.use('/songs', songs);
}

module.exports = routes;