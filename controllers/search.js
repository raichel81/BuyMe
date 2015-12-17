var express = require('express');
var request = require('request');
var router = express.Router();
var util = require('util');
var OperationHelper = require('apac').OperationHelper;


router.get('/', function(req, res) {
  res.render('search/index');
});

router.get('/results', function(req, res) {


  getProductData(searchTerm, function(results) {

  });
});


function getProductData(searchTerm, callback) {

  var opHelper = new OperationHelper({
      awsId:     'AKIAJNSV7UBCKXE5VNVA',
      awsSecret: 'q0aDklr0YujSkWw4EexW4QjK9K5Rcawbim7sMPkY',
      assocId:   'bume04b-20',
      version:   '2013-08-01'
      // your version of using product advertising api, default: 2013-08-01
  });

  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': searchTerm,
    'ResponseGroup': 'ItemAttributes,Images'
  }, function(err, results) {
    if(err) {
      // do something with the error
    } else {
      var simpleItems = [];

      var items = results.ItemSearchResponse.Items[0].Item;
      items.forEach(function(item) {
        var simpleItem = {
          title: item.ItemAttributes[0].Title[0],
          price: item.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
          imageURL: item.LargeImage[0].URL[0],
          amazonURL: item.DetailPageURL[0]
        };

        simpleItems.push(simpleItem);
      });

      callback(results);
    }
  });
}

module.exports = router;
