const store = require('./store');

class PlayList  {
    constructor(){}

    async createPlaylist(data) {
        return new Promise((resolve, reject) => {
            if (!data.userId) {
                reject('No user is logged in')
            } else if(!data._id) {
                console.error('Id for playlist wasnt generated');
                reject('Internal server error');
            }
            if (!data.alias) {
                data.alias = 'Default Playlist'
            } 
            // create playlist   
            store.createPlaylist(data)
                .then(() => {
                    resolve('Playlist created')
                }) 
                .catch(error => {
                    console.error(error);
                    reject('Internal server error')
                })
        })
    }

    async addSong(data) {
        return new Promise((resolve, reject) => {
            if(!data.playlistId || !data.songId) {
                return reject('Incomplete information')
            }
            // add song
            store.addSong(data)
                .then((data) => {
                    resolve('song added')
                })
                .catch((error) => {
                    console.error(error);
                    reject('Internal server error')
                })
        })
    }

    async getPlaylists (data) {
        return new Promise((resolve, reject) => {
            if(!data.userId) {
                reject('No user is logged in')
            } else {
                // retreive user playlists
                let filter = {userId: data.userId};
                store.retreivePlaylists(filter)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        console.error(error);
                        reject('Internal server Error');
                    })
            }
        })
    }
}

module.exports = PlayList;