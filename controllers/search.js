var db = require('../models');
var express = require('express');
var request = require('request');
var router = express.Router();
var util = require('util');
var OperationHelper = require('apac').OperationHelper;


router.get('/', function(req, res) {
  res.render('search/index');
});

router.get('/results', function(req, res) {
  var searchTerm = req.query.searchTerm;

  getProductData(searchTerm, function(searchResults) {
    req.currentUser.getWishlists().then(function(wishlists) {
      res.render('search/results', {
        items: searchResults,
        wishlists: wishlists
      });
    })   
  });
});

router.post('/new', function(req, res) {
  console.log(req.body);
  db.items.create({
    title: req.body.title,
    price: req.body.price,
    imageURL: req.body.imageURL,
    amazonURL: req.body.amazonURL

  }).then(function(items, created) {
  console.log(items);
  console.log(created);

    res.redirect('/');
   }).catch(function(err) {
     if (err.message) {
       //todo error reporting
       console.log(err.message);
     } else {
       console.log(err);
     }
     res.redirect('/');
   });
});


function getProductData(searchTerm, callback) {

  var opHelper = new OperationHelper({
      awsId:     process.env.AWS_ID,
      awsSecret: process.env.AWS_SECRET,
      assocId:   process.env.AWS_ASSOCID,
      version:   '2013-08-01'
      // your version of using product advertising api, default: 2013-08-01
  });

  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': searchTerm,
    'ResponseGroup': 'ItemAttributes,Images,Offers'
  }, function(err, results) {
    if(err) {
      console.log(err);
      // do something with the error
      callback();
    } else {
      var simpleItems = [];

      var items = results.ItemSearchResponse.Items[0].Item;
      items.forEach(function(item) {
        var simpleItem = {
          title: item.ItemAttributes[0].Title[0],
          price: getPrice(item),
          imageURL: getImageURL(item),
          amazonURL: item.DetailPageURL[0]
        };

        simpleItems.push(simpleItem);
      });

      callback(simpleItems);
    }
  });
}

function getPrice(itemData) {
  var price = "N/A";
  try {
    price = itemData.ItemAttributes[0].ListPrice[0].FormattedPrice[0];
  } catch(e) {
    console.log(e);
  }
  return price;
}

function getImageURL(itemData) {

  var imageURL = "/images/no-thumb.png";
  try {
    imageURL = itemData.LargeImage[0].URL[0];
  } catch(e) {
    console.log(e);
  }
  return imageURL;
}

module.exports = router;
