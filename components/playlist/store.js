const PlaylistModel = require('./model');

const createPlaylist = async (playlistData) => {
    const playlist = new PlaylistModel(playlistData);
    await playlist.save();
}

const addSong = async (songData) => {
    const foundPlaylist = await PlaylistModel.findOne({
        _id: songData.playlistId, 
  });
  foundPlaylist.songs.push(songData.songId);
  const updatedPlaylist = await foundPlaylist.save();
  return updatedPlaylist;
}

const retreivePlaylists = async (filter) => {
    const response = await PlaylistModel.find(filter);
    return response;
}

module.exports = {
    createPlaylist,
    addSong,
    retreivePlaylists
}