const sk = require('scikit-learn');
const fs = require('fs');
const pickle = require('pickle');
const MODEL_ING_TASK_1 = './../resources/model_task1.pkl';

exports.identifyTwits = function(data, callback){
    fs.readFile(MODEL_ING_TASK_1, 'r', function(err,file){
        pickle.loads(file, function(pickled) {
            callback(pickled)
        })
    })
}