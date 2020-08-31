const store = require('./store');

class Songs  {
    constructor(){}

    async getSongs(data) {
        return new Promise((resolve, reject) => {
            let filter;
            if (!data.song) {
                filter = {};
            } else {
                filter = {song: data.song};
            }
            store.retreiveSongs(filter)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject('Internal server error');
                })
        })
    }

    async getSongsListenedByUser(data) {
        return new Promise((resolve, reject) => {
            if (!data.userId) {
                return reject('User is not logged in')
            }
            store.getRecordsOfUser(data)
                .then(data => {
                    if(data === {}) {
                        resolve('this user has not songs records, they should listen more music')
                    } else {
                        resolve(data);
                    }
                })
                .catch(error => {
                    console.error(error);
                    reject('Internal server error');
                })
        })
    }

    async getAllRecords() {
        return new Promise((resolve, reject) => {
            store.getAllRecords()
                .then(data => {
                    if(data === {}) {
                        resolve('No user has ever listened to any song')
                    } else {
                        resolve(data);
                    }
                })
                .catch(error => {
                    console.error(error);
                    reject('Internal server error');
                })
        })
    }

    async setRecordOfPlaySong (data) {
        return new Promise((resolve, reject) => {
            if(!data.userId) {
                return reject('User is not logged in')
            }

            if (!data.songId) {
                return reject('song played couldnt be recorded')
            }
            
            store.countPlaySong(data)
                .then(data => {
                    console.log(data);
                    resolve('song listened');
                })
                .catch(error => {
                    console.error(error);
                    reject('Internal server error');
                })
        })
    }
}

module.exports = Songs;