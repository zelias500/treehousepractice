// problem: we need a simple way to look
// at a user's badge count and JS points

// solution: use node.js to connect to treehouse
// API to get profile information to print out


var profile = require('./profile.js');

var users = process.argv.slice(2);

users.forEach(profile.get);



