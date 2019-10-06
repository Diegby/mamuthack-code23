var sdm = require("./../model/speech_detection_model");
const tmodel = require("./../model/tweets_model")
var spawn = require("child_process").spawn;
const fs = require('fs');

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