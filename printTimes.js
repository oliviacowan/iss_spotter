const printTimes = function(passTimes) {
  for (pass of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass on ${dateAndTime} for a duration of ${duration} seconds.`);
  }
}

module.exports = { printTimes };