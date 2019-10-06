var express = require('express');
var router = express.Router();

var user = require('./../controller/user')
var twit = require('./../controller/tweets')


const path = require('path')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html')  
});

router.get('/test', function(req, res, next) {
    user.getTwitsData('immapi29', function(data) {
        res.send(data)
    })
})

router.get('/info/:usuario', function(req, res, next) {
  user.getTwitsData(req.params.usuario, function(data) {
    res.render('index.html', data)
  })
})

router.get('/getTwit', function(req, res, next) {
  twit.getTwit("data", function(data) {
      res.send(data)
  });
})

module.exports = router;
