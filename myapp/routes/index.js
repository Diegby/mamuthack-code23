var express = require('express');
var router = express.Router();

var user = require('./../controller/user')
var twit = require('./../controller/tweets')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    user.getTwitsData( function(data) {
        res.send(data)
    })
})

router.get('/getTwit', function(req, res, next) {
  twit.getTwit("data", function(data) {
      res.send(data)
  });
})

module.exports = router;
