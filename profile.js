var http = require('http');

// print out message
function printMessage(username, badgeCount, points){
	var message = username + " has " + badgeCount +" total badge(s) and "+points+" points in JavaScript";
	console.log(message);
}


// print out error messages
function printError(error){
	console.error(error.message);
}


function get(username){
	// Connect to API URL (http://teamtreehouse.com/username.json)
	var request = http.get('http://teamtreehouse.com/'+username+'.json', function(response){
		var body = "";

		// Read the data
		response.on('data', function(chunk){
			body+=chunk;
		});

		// Parse the data

		response.on('end', function(){
			if (response.statusCode === 200){
				try {
					var profile = JSON.parse(body);
					// Print the data
					printMessage(username, profile.badges.length, profile.points.JavaScript)
				} catch(error) {
					// Parse Error
					printError(error);
				}
			} else {
				// Status Code Error
				printError({message: "There was an error getting the profile for "+username+". ("+http.STATUS_CODES[response.statusCode] +")"});
			}
		})


	})
// Connection error
request.on("error", printError);
};

// need to export the "get" function
module.exports.get = get;
