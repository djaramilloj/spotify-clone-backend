const fs = require('fs')
const csv = require('csv-parser')
const store = require('../components/songs/store');
const mongoose = require('mongoose');
const db = require('../auth/mongo');

db(process.env.MONGO_URI);

const songs = [];

// fs.createReadStream(__dirname + '/songs_data.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     songs.push(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//     const genres = songs.map(r => r.genre)
//     .reduce((rta, genre) => {
//       if(rta[genre]) {
//         rta[genre] = rta[genre] + 1
//       } else {
//         rta[genre] = 1
//       }
//       return rta;
//     }, {})
    
//     setGenre(genres)
//   });


// async function setGenre(genres) {
//   Object.keys(genres).forEach(async (k) => {
//     const data = {
//       _id: new mongoose.Types.ObjectId().toString(),
//       genre: k
//     }
//     await store.createGenre(data);
//   })
// }


fs.createReadStream(__dirname + '/songs_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    songs.push(row);
  })
  .on('end', async () => {
    console.log('CSV file successfully processed');
    const genres = await store.getGenres();
    
    //const genresFiltered = genres.map(g => g.genre);
    const songsFiltered = songs.map(s => {
      let rta;
      for (let g of genres) {
        if(s.genre === g.genre) {
          rta = {...s, genreId: g._id}
        }
      }
      return rta
    })
    
    songsFiltered.forEach(async (song) => {
      let data = {
        _id: new mongoose.Types.ObjectId().toString(),
        artist: song.Artist,
        song: song.Song,
        genreId: song.genreId,
        duration: song.duration
      }
      await store.createSong(data);
    })
  });



