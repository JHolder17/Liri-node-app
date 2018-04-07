//read and set any environment variables with the dotenv package
require("dotenv").config();

//import the keys.js file and store it in a variable
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify);

switch (process.argv[2]) {
    case "my-tweets":
        var params = { JosephXholder: 'nodejs' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
            console.log(response);
        });
        break;
    case "spotify-this-song":
        spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data);
        });
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
}