var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../models');

// TODO: Wire up RESTful routes here
// router.get ...
router.get('/', function(req, res) {
	res.render('login/new');
});

router.post('/', function(req, res) {
	db.user.authenticate(req.body.email, req.body.password, function(err, user) {
		if (err) {
			res.send(err);
		} else if (user) {
			req.session.user = user.id;
			res.redirect('/wishlists');
		} else {
			// invalid username or password error todo
			res.redirect('/login');
		}
	});
});

module.exports = router;
