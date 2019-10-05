var sdm = require("./../model/speech_detection_model");

exports.getTwitsData = function(callback){
    sdm.identifyTwits(['hey', 'you'], callback)
}