

var https = require('https');
// var zip = require('./getZip.js');
var forecast =  'https://api.forecast.io/forecast/a8272b62db3a9ce18fd1a1263fa0064c/'
// var lat = 40.77664120000001
// var lng = -73.9521468

var getForecast = function(locArr) {
// var getForecast = function(lat, lng) {

	var request = https.get(forecast+locArr[0]+","+locArr[1], function(response){
		var body = "";

		// console.log(forecast+lat+","+lng);

		// read
		response.on('data', function(chunk){
			body += chunk;
		});

		// console.log(typeof body);

		// parse
		response.on('end', function(){
			if (response.statusCode === 200){
				try {
					var weather = JSON.parse(body);
					var temp = weather.currently.temperature;
					var loc = weather.timezone;
					console.log("Current temp is "+weather.currently.temperature+" degrees Fahrenheit");
					return weather.currently.temperature;
				} catch (error) {
					console.error(error.message);
				}
			} else {
				console.error({message: 'Status Code Error: '+https.STATUS_CODES[response.statusCode]})
			}
		});

	});

	request.on('error', function(error){
		console.error(error.message);
	})
}

module.exports.getForecast = getForecast;

// getForecast(lat, lng);

// var test = getForecast("10028", zip.getZip);

// console.log(test);

