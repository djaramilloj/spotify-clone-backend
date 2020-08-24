const SongModel = require('./model');

const retreiveSongs = async (filterSong) => {
    const response = await SongModel.find(filterSong);
    return response;
}


module.exports = {
    retreiveSongs,
}