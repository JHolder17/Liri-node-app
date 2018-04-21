require("dotenv").config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



switch (process.argv[2]) {
    case "my-tweets":
        var params = {
            screen_name: 'JosephXholder',
            count: 20
        };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error) {
                console.log("Error occurred: " + error);
            }
            for (i = 0; i < tweets.length; i++) {
                console.log("JosephXholder: " + tweets[i].text + " Created: " + tweets[i].created_at);
                console.log("--------------");
            }
        });
        break;
    case "spotify-this-song":
        var song = process.argv.slice(3).join(" ");
        if (song !== undefined) {
            spotify.search({ type: 'track', query: song }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var info = data.tracks.items
                console.log("\nArtist: " + info[0].artists[0].name +
                    "\nSong title: " + info[0].name +
                    "\nAlbum name: " + info[0].album.name +
                    "\nURL Preview: " + info[0].preview_url);
            });
            //get working doesn't enter script 
        } else {
            spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var info = data.tracks.items
                console.log("\nArtist: " + info[0].artists[0].name +
                    "\nSong title: " + info[0].name +
                    "\nAlbum name: " + info[0].album.name +
                    "\nURL Preview: " + info[0].preview_url);
            });
        }
        break;
    case "movie-this":
        var movie = process.argv.slice(3).join(" ");
        if (movie !== undefined) {
            var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("*****");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    //need to access this rating
                    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings);
                    console.log("Country of Production: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("*****");
                }
            });
        //get working doesn't enter script 
        } else {
            var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("*****");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    //need to access this rating
                    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings);
                    console.log("Country of Production: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("*****");
                }
            });
        }
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, action) {
            console.log(action);
        });

        break;
}