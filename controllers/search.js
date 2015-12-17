var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
  var query = req.query.q;
  request('http://www.amazonapi.com/?s=' + query, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode === 200 && data.Search) {
      res.render('search/index', {items: data.Search,
                            q: query});
    } else {
      res.render('error');
    }
  });
});

router.get('/:imdbID', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.amazonapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('search/show', {item: JSON.parse(body),
                             q: searchQuery});
  });
});

module.exports = router;