var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.currentUser.getWishlists({
    order: '"updatedAt" DESC'
  }).then(function(wishlists, err) {
    res.render('wishlists/index', {wishlists: wishlists});
  });
});

router.get('/new',function(req, res) {
	res.render('wishlists/new');
});

router.get('/',function(req, res) {
	res.render('wishlists/oneList');
});

router.post('/', function(req, res) {
	db.wishlist.create({
		listName: req.body.name,
		description: req.body.description,
		userId: req.currentUser.id
	}).then(function(wishlist, err) {
		res.redirect('/wishlists');
	}).catch(function(e) {
		req.flash('danger', 'didn\'t store in db: ' + e);
	});
});


module.exports = router;