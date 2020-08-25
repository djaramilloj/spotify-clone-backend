const SongModel = require('./model');
const GenreModel = require('./modelGenre');

const retreiveSongs = async (filterSong) => {
    const response = await SongModel.find(filterSong);
    return response;
}

// functions to save songs
const createSong = async (data) => {
    const song = new SongModel(data);
    await song.save();
}

const createGenre = async (data) => {
    const genre = new GenreModel(data);
    await genre.save();
}

const getGenres = async () => {
    const response = await GenreModel.find();
    return response;
}

module.exports = {
    retreiveSongs,
    createGenre,
    getGenres,
    createSong
}