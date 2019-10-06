var sdm = require("./../model/speech_detection_model");
const tmodel = require("./../model/tweets_model")
var spawn = require("child_process").spawn;
const WORDS_ES = './resources/hurtlex_ES.tsv';
const fs = require('fs');

const POSITION_VALUE = 0
const CATEGORY_VALUE = 1
const STEREOTYPE_VALUE = 2
const LEMMA_VALUE = 3
const LEVEL_VALUE = 4;

exports.getTwitsData = function(usuario, callback){
    tmodel.getTwits(usuario, function(tweets){
        console.log(tweets)
        let data = JSON.stringify({data: tweets});
        fs.writeFile('/tmp/tweets.json', data, 'utf8', function(err){
            fs.writeFile("/tmp/test.txt", tweets, function(err) {
    
                var sh = spawn('sh',['model/external/laser/tasks/embed/embed.sh', "/tmp/test.txt", "es", "/tmp/laser.raw"]);
                sh.on('exit', function(code) {
                    for (let i in tweets) {
                        tweets[i] = tweets[i].toLowerCase();
                    }
        
                    fs.writeFile("/tmp/testLower.txt", tweets, function(err) {
        
                        var sh = spawn('sh',['model/external/laser/tasks/embed/embed.sh', "/tmp/testLower.txt", "es", "/tmp/laserLower.raw"]);
                        sh.on('exit', function (code) {
                            var pyProg = spawn('python3',['model/external/nn.py', "/tmp/tweets.json", "/tmp/laser.raw", "/tmp/laserLower.raw"]); 
                            pyProg.stdout.on('data', function(data){
                                callback(data.toString())
                            });
                        });
                        
                    })
                })
            })
        })
    })
}

function get_dictionary(infoTwits, callback){
    fs.readFile(WORDS_ES, "utf8", function(err, file){
        let passT = true;
        lineWords = file.toString().split('\n')
        infoTwits['categories'] = {}
        for (let i in lineWords) {
            if (passT){
                passT = false;
                continue;
            }
            var words = lineWords[i].split('\t')
            for (let j in twits) {
                if (twits[j].includes(words[LEMMA_VALUE])){
                    if (words[CATEGORY_VALUE] in infoTwits['categories']){
                        infoTwits['categories'][words[CATEGORY_VALUE]] += 1
                    } else {
                        infoTwits['categories'][words[CATEGORY_VALUE]] = 1
                    }
                }
            }
        }
        callback(infoTwits)
    })
}