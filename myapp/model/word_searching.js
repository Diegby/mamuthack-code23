const WORDS_ES = './resources/word_ES.tsv';
const fs = require('fs');

const POSITION_VALUE = 0
const CATEGORY_VALUE = 1
const STEREOTYPE_VALUE = 2
const LEMMA_VALUE = 3
const LEVEL_VALUE = 4

exports.identifyTwits = function(twits, callback){
    fs.readFile(WORDS_ES, "utf8", function(err, file){
        let passT = true;
        lineWords = file.toString().split('\n')
        let infoTwits = { 'categories': {} }
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