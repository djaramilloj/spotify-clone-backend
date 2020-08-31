const SongModel = require('./model');
const GenreModel = require('./modelGenre');
const RecordModel = require('./modelRecord');

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

const countPlaySong = async (data) => {
    let filterSong = {_id:data.songId};
    let songFound = await SongModel.findOne(filterSong);
    if (!songFound.count) {
        songFound.count = 1;
        await songFound.save();
    } else {
        songFound.count += 1;
        await songFound.save();
    }
    let recordFilter = {userId: data.userId};
    let recordFound =  await RecordModel.findOne(recordFilter);
    if (!recordFound) {
        // user is listening its first song
        const arraySongs = [{
            songId: data.songId
        }]
        const dataNewRecord = {
            userId: data.userId,
            songs: arraySongs
        }
        const record = new RecordModel(dataNewRecord);
        await record.save();
        return record;
    } else {
        recordFound.songs.push({songId: data.songId});
        await recordFound.save();
        return recordFound;
    }
}


const getRecordsOfUser = async (data) => {
    let filter = {userId: data.userId};
    let recordFound =  await RecordModel.findOne(filter);
    return recordFound || {};
}

const getAllRecords = async () => {
    const response = await RecordModel.find();
    return response || {};
}

module.exports = {
    retreiveSongs,
    createGenre,
    getGenres,
    createSong,
    countPlaySong,
    getRecordsOfUser,
    getAllRecords
}