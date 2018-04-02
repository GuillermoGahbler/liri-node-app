 
let liri = {

    validCommands: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],

    captureInput: function () {
        [notUse, moreNotUse, command, ...options] = process.argv
        return [command, options]

    },
    print: function (message) {
        console.log(message)
    },
    validateCommand:function (command) {
        let arr = this.validCommands
        return arr.includes(command) 
    },

    convertStringToFunction:function(string){
        return string.replace(/-/g,"")
        

    },

    makeRequest:function (){
        
    },

    mytweets:function(){
        return "theTweets"
    },
    spotifythissong:function(){
        return "spotify's this"
    },
    moviethis:function(){   
        return "the Movies"
    },
    dowhatitsays:function(){
        return "do this stuff right here"
    },

}




// currently outside of the object
let inputs = liri.captureInput()
let userCommand = inputs[0]
let userOptions = inputs[1]


if (liri.validateCommand(userCommand)) {
   let callApi= liri.convertStringToFunction(userCommand)
    // liri.print(userCommand, userOptions)
   let response= liri[callApi]()
   liri.print(response)
} else {
    liri.print("invalid command")
}


 

 