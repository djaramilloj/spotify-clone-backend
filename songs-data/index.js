const fs = require('fs')
const csv = require('csv-parser')
const input = require('./songs_data.csv')

const songs = [];

fs.createReadStream('data.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });