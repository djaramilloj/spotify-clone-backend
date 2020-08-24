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
}

module.exports = Songs;