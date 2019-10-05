var ws = require("./../model/word_searching");

exports.getTwitsData = function(callback){
    ws.identifyTwits(['Hola perro estúpido', 'Me obligas a ser malo'], callback)
}