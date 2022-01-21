const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    const stringIP = JSON.parse(body).ip;
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when trying to fetch IP. See details: ${body}`), null);
      return;
    }
    callback(null, stringIP);
  });
};

const fetchCoordsByIP = function(IP, callback) {
  request('https://api.freegeoip.app/json/?apikey=8ea48fb0-7a4e-11ec-8f0f-9b35908274f8', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when trying to fetch IP. See details: ${body}`), null);
      return;
    }
    const coords = {};
    coords.latitude = JSON.parse(body)['latitude'];
    coords.longitude = JSON.parse(body)['longitude'];
    callback(null, coords);
    return;
  });
};

const fetchFlyoverTimes = function(coordinates, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`StatusCode: ${response.statusCode} when trying to retrieve the flyover times, more details here: ${body}`), null);
      return;
    }
    let times = JSON.parse(body).response;
    callback(null, times);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, IP) => {
    if (error) {
      //console.log('it didnt work :(', error);
      return callback (error, null);
    }
    //console.log('it worked :) returned IP: ', IP);

    fetchCoordsByIP(IP, (error, data) => {
      if (error) {
        //console.log(`Could not retrieve coordinates: ${error}`);
        return callback (error, null);
      }
      //console.log('Coordinates fetched: ', data);

      fetchFlyoverTimes(data, (error, times) => {
        if (error) {
          //console.log('unsuccessful: ', error);
          return callback (error, null);
        }
        //console.log('success! The flyover times are: ', times);
        callback(null, times);
      });
    });
  });
};




module.exports = { nextISSTimesForMyLocation };