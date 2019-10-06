const TOKEN = "1697381192-e8eseFktg6zIfOIgRoUJyd2ej2uVyFUuloxmfRP";
const SECRET_TOKEN = "v26cspGSdpVWEjoQcFk4zrWPrhNRBbayNcodauyJGJJiW";
const CONSUMER_KEY = "BjAmBaJGdEwOz6Grt7AOUZtUI";
const SECRET_CONSUMER_KEY = "gxAgRl71wC67CVnpb2IW8aOZ8jGJVKHdocm1oSaA9omLfESUIN";

var Twit = require('twit');

var T = new Twit({
  consumer_key:         CONSUMER_KEY,
  consumer_secret:      SECRET_CONSUMER_KEY,
  access_token:         TOKEN,
  access_token_secret:  SECRET_TOKEN,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
exports.getTwits = function(usuario ,callback){
    T.get('search/tweets', { q: usuario, count: 20 }, function(err, data, response){
        textoTwets = []
        data.statuses.forEach(element => {
            textoTwets.push(element.text);
        });
        callback(textoTwets);
    });
}
