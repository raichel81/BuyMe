var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/new',function(req, res) {
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




// Show the user's page - /users/:id
// show an edit for































// TODO: Create route and view for "create user" on POST
router.post('/', function(req, res) {
	// db.user.create...
	// then redirect to the user's logged in home page

});



// router.get('/login', function(req, res) {
// 	res.render('user/login');
// });

// router.post('/login', function(req, res) {
// 	db.user.authenticate(req.body.email, req.body.password, function(err, user) {
// 		if (err) {
// 			res.send(err);
// 		} else if (user) {
// 			req.session.user = user.id;
// 			res.redirect('/');
// 		} else {
// 			// invalid username or password error todo
// 			res.redirect('/auth/login');
// 		}
// 	});
// });

// router.get('/logout', function(req, res) {
// 	//todo send logout message
// 	req.session.user = false;
// 	res.redirect('/');
// });


module.exports = router;