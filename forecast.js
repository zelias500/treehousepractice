
// combines getZip and getForecast functions

var https = require('https');
// var zip = require('./getZip.js');
var forecast = require('./getForecast.js');
var gmaps = 'https://maps.googleapis.com/maps/api/geocode/json?address='
// var zipcode = 10028

// forecast.getForecast([40.77664120000001, -73.9521468]);

var getWeather = function(zipcode){
	var request = https.get(gmaps+zipcode, function(response){
		var body = "";

			// read zip data
			response.on('data', function(chunk){
				body += chunk;
			});

			// parse zip data
			response.on('end', function(){
				if (response.statusCode === 200){
					try {
						var latLong = JSON.parse(body);

						var lat = latLong.results[0].geometry.location.lat;
						var lng = latLong.results[0].geometry.location.lng;

						forecast.getForecast([lat,lng]);

					} catch (error){
						// Parse error
						console.error(error.message);
					}
					
				} else {
					// status code error
					console.error({message: 'Status Code Error: '+https.STATUS_CODES[response.statusCode]})
				}
			});
		});

		request.on("error", function(error){
			console.error(error.message);

		})
};

// getWeather(10028);

module.exports.forecast = getWeather;