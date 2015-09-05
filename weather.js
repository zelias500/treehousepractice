// takes input from command line for finding temperature


var temp = require('./forecast.js');

// var zips = process.argv.slice(2);
var zips = process.argv.slice(2);

// console.log(zips);
for (var i = zips.length - 1; i >= 0; i--) {
	temp.forecast(zips[i]);
};

// zips.forEach(console.log());
// zips.forEach(temp.getWeather);
