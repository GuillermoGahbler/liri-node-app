require("dotenv").config();

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request")
const keys = require("./keys");


let liri = {

    validCommands: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],

    captureInput: function () {
        [notUse, moreNotUse, command, ...options] = process.argv
        options = options.join(" ")
        return [command, options]

    },
    print: function (message) {
        console.log(message);
    },
    validateCommand: function (command) {
        let arr = this.validCommands
        return arr.includes(command)
    },

    convertStringToFunction: function (string) {
        return string.replace(/-/g, "")

    },

    // twitter one is complete
    mytweets: function () {
        var client = new Twitter(keys.twitter);
        var params = {
            screen_name: 'nodejs'
        };
        var path = "statuses/user_timeline"
        var params = {
            count: 20
        }
        client.get(path, params, function (error, tweets, response) {
            if (error) throw error
            tweets.forEach(tweet => {
                console.log("Created on " + tweet.created_at, tweet.text);
            });

        });
    },

    // Spotify needs default song Ace of Base the sign
    spotifythissong: function (query) {
        if (!query) query ="enter the wu-tang, cream"
        var spotify = new Spotify(keys.spotify);

        spotify.search({
            type: 'track',
            query: query

        }, function (error, data) {
            if (error) throw error

            data.tracks.items.forEach(function (track) {
                var artists = track.artists.map(artist => artist.name)

                console.log("Song name: " + query);
                console.log("URL: " + track.external_urls.spotify);
                console.log("Artist: " + artists);
                console.log("Album: " + track.album.name);

            })


        });
    },
    // IMDB complete
    moviethis: function (query) {
        if (!query) query = "mr nobody";
        var path = "https://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy"
        request(path, (error, response, body) => {
            if (error) throw error
            console.log(body);
        })

    },
    dowhatitsays: function () {
        return "do this stuff right here"
    },




}



// currently outside of the object
let inputs = liri.captureInput();
let userCommand = inputs[0];
let userOptions = inputs[1];


if (liri.validateCommand(userCommand)) {
    let callApi = liri.convertStringToFunction(userCommand)

    let response = liri[callApi](userOptions)

} else {
    liri.print("invalid command")
}