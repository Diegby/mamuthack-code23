var sdm = require("./../model/speech_detection_model");
const tmodel = require("./../model/tweets_model");
var spawn = require("child_process").spawn;
const fs = require('fs');

const WORDS_ES = './resources/hurtlex_ES.tsv';

const LASER_LOWER_DATA = "/tmp/laserLower.raw";
const TEXT_LOWER_DATA = "/tmp/testLower.txt";
const JSON_DATA = '/tmp/tweets.json';
const LASER_DATA = "/tmp/laser.raw";
const TEST_DATA = "/tmp/test.txt";

const STEREOTYPE_VALUE = 2;
const CATEGORY_VALUE = 1;
const POSITION_VALUE = 0;
const LEVEL_VALUE = 4;
const LEMMA_VALUE = 3;

exports.getTwitsData = function(usuario, callback){
    tmodel.getTwits(usuario, function(tweets){
        console.log(tweets)
        let data = JSON.stringify({data: tweets});
        fs.writeFile(JSON_DATA, data, 'utf8', function(err){
            fs.writeFile(TEST_DATA, tweets, function(err) {
    
                var sh = spawn('sh',['model/external/laser/tasks/embed/embed.sh', TEST_DATA, "es", LASER_DATA]);
                sh.on('exit', function(code) {
                    for (let i in tweets) {
                        tweets[i] = tweets[i].toLowerCase();
                    }
        
                    fs.writeFile(TEXT_LOWER_DATA, tweets, function(err) {
        
                        var sh = spawn('sh',['model/external/laser/tasks/embed/embed.sh', TEXT_LOWER_DATA, "es", LASER_LOWER_DATA]);
                        sh.on('exit', function (code) {
                            var pyProg = spawn('python3',['model/external/nn.py', JSON_DATA, LASER_DATA, LASER_LOWER_DATA]); 
                            pyProg.stdout.on('data', function(data){
                                delete_all_files()
                                get_dictionary({'caracter': data}, callback)
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

function delete_all_files(){
    FILES_TO_REMOVE = [LASER_LOWER_DATA, TEXT_LOWER_DATA, JSON_DATA, LASER_DATA, TEST_DATA]
    for (let i in FILES_TO_REMOVE){
        fs.unlink(FILES_TO_REMOVE[i])
    }
}