

// takes a ZIP code
// returns the weather in that current ZIP code with a call to the
// API at forecast.io

// forecast.io API takes lat/long, not ZIP codes, so we need an API to 
// convert that too
// can use google maps geocoding API for conversion

var https = require('https');
var zipcode = "10028";
var gmaps = 'https://maps.googleapis.com/maps/api/geocode/json?address='

// for parsing data
var parseLocation = function(body){
	try {
		var latLong = JSON.parse(body);
		// console.log(latLong.results[0].geometry.location.lng);
		var lat = latLong.results[0].geometry.location.lat;
		var lng = latLong.results[0].geometry.location.lng;
		// console.log("latitude: "+lat+", longitude: "+lng);
		console.log([lat, lng]);
		return [lat, lng];

	} catch (error){
		// Parse error
		console.error(error.message);
	}
	
}

var getLocation = function(zipcode){
	var lat = 0;
	var lng = 0;

	var request = https.get(gmaps+zipcode, function(response){
		var body = "";

		// read data
		response.on('data', function(chunk){
			body += chunk;
		});

		response.on('end', function(){
			if (response.statusCode === 200){
				return parseLocation(body);
			} else {
				// status code error
				console.error({message: 'Status Code Error: '+https.STATUS_CODES[response.statusCode]})
			}
		});
	});

	request.on("error", function(error){
		console.error(error.message);

	// return lat, lng;
	})

};

module.exports.getZip = getLocation;

// getLocation("10028");
