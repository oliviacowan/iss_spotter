const { nextISSTimesForMyLocation } = require('./iss')
const { printTimes } = require('./printTimes');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log('Something went wrong: ', error);
    return;
  }
  printTimes(passTimes);
});



// fetchFlyoverTimes({ latitude: 49.5005, longitude: -117.2864 }, (error, times) => {
//   if (error) {
//     console.log('unsuccessful: ', error);
//     return;
//   }
//   console.log('success! The flyover times are: ', times);
// });

// fetchCoordsByIP('23.16.195.24', (error, data) => {
//   if (error) {
//     console.log(`Could not retrieve coordinates: ${error}`);
//      return;
//   }
//   console.log('Coordinates fetched: ', data);
// });

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log('it didnt work :(', error);
//     return;
//   }
//   console.log('it worked :) returned IP: ', IP);
// });

