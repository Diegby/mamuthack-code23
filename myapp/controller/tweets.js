var twit_model = require("./../model/tweets_model");

exports.getTwit = function(data, callback){
    twit_model.getTwits(data, callback);
}