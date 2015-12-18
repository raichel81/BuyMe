var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/',function(req, res) {
	res.render('users/new');
});

router.post('/', function(req, res) {
	if (req.body.password != req.body.password2) {
		req.flash('danger', 'Passwords must match');
		res.redirect('/users/new');
	} else {
		db.user.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				email: req.body.email,
				password: req.body.password,
				name: req.body.name
			}
		}).spread(function(user, created) {
			if (created) {
				req.session.user = user.id;
				res.redirect('/wishlists');
			} else {
				// user email exists error
				req.flash('danger', 'User already exists');
				res.redirect('/users/new');
			}
		}).catch(function(err) {
			if (err.message) {
				//todo error reporting
			} else {
				console.log(err);
			}
			res.redirect('/users/new');
		});
	}
});

module.exports = router;
