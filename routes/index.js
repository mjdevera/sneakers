var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// ROUTES
router.get('/', function(req, res) {	// requirements, response
	res.render('landing');
});


// =============
// AUTH ROUTES
// =============

// SHOW REGISTER FORM
router.get('/register', function(req, res) {
	res.render('register');
});
// HANDLE SIGN UP LOGIC
router.post('/register', function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/register');
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Welcome, ' + user.username + '!');
			res.redirect('/sneakers');
		});
	});
});

// show login form
router.get('/login', function(req, res) {
	res.render('login');
});

// handling login logic with middleware
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/sneakers',
		failureRedirect: '/login'
	}), function(req, res) {
	
});

// logout route
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Logged You Out');
	res.redirect('/sneakers');
});


module.exports = router;