var db = require('../models');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	db.items.create({
		title: req.body.title.substring(0, 100),
		price: req.body.price,
		imageURL: req.body.imageURL,
		amazonURL: req.body.amazonURL,
		wishlistId: req.body.wishlistId
	}).then(function(item, err) {
		res.redirect('/items/' + item.id);
	}).catch(function(e) {
		console.log(e);
		req.flash('danger', 'didn\'t store in db: ' + e);
	});
});

router.get('/:id', function(req, res) {
	db.items.findById(req.params.id).then(function(item) {
		res.render('items/show', {item: item});
	});
});

router.post('/update', function(req, res) {
	db.items.findById(req.body.id).then(function(item) {
		item.updateAttributes({
			description: req.body.description
		}).then(function(item, err) {
			res.redirect('/search');
		});
	});
})

router.delete('/:id', function(req, res) {
	db.items.destroy({
		where: {
			id: req.params.id
		}
	}).then(function() {
		res.send('success');
	});
});

module.exports = router;
