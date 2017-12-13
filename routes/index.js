var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expose - art everywhere!' });
});

router.get('/artist', function(req, res, next) {
  res.render('index', { title: 'Expose - art everywhere!', artist: 'true' });
});

module.exports = router;
