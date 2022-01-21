const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printTimes } = require('./printTimes');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes);
  })
  .catch(error => {
    console.log('ERROR: ', error.message);
  });