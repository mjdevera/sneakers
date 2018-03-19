var express = require('express');
var router = express.Router();
var Sneaker = require('../models/sneaker');
var middleware = require('../middleware');

// INDEX - show all sneakers
router.get('/sneakers', function(req, res) {	// requirements, response	
	// Get all sneakers from the DB
	Sneaker.find({}, function(err, allSneakers) {
		if (err) {
			console.log(err);
		} else {
			res.render('sneakers/index', {sneakers: allSneakers});
		}
	});
});

// CREATE - overview
router.post('/sneakers', middleware.isLoggedIn, function(req, res) {
	// get data from form and add to sneakers array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newSneaker = {name: name, price: price, image: image, description: desc, author: author};

	// Create a new sneaker and save to DB
	Sneaker.create(newSneaker, function(err, theSneaker) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to sneakers page
			console.log(theSneaker);
			res.redirect('/sneakers');
		}
	});
	
});

// NEW - add new sneakers page
router.get('/sneakers/new', middleware.isLoggedIn, function(req, res) {	// requirements, response
	
	res.render('sneakers/new');
});

// SHOW - shows more info about one sneaker
router.get('/sneakers/:id', function(req, res) {
	// find the sneaker with provided ID
	Sneaker.findById(req.params.id).populate('comments').exec(function(err, foundSneaker) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundSneaker);
			// render show template with that sneaker
			res.render('sneakers/show', {sneaker: foundSneaker});
		}
	});
});

// EDIT SNEAKER ROUTE
router.get('/sneakers/:id/edit', middleware.checkSneakerOwnership, function(req, res) {
	Sneaker.findById(req.params.id, function(err, foundSneaker) {
		res.render('sneakers/edit', {sneaker: foundSneaker});
	});	
});

// UPDATE SNEAKER ROUTE
router.put('/sneakers/:id', middleware.checkSneakerOwnership, function(req, res) {
	// find and update the correct sneaker	
	Sneaker.findByIdAndUpdate(req.params.id, req.body.sneaker, function(err, updatedSneaker) {
		if (err) {
			res.redirect('/sneakers');
		} else {
			res.redirect('/sneakers/' + req.params.id);
		}
	});
	// redirect to the show page
});

// DESTROY SNEAKER ROUTE
router.delete('/sneakers/:id', middleware.checkSneakerOwnership, function(req, res) {
	Sneaker.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/sneakers');
		} else {
			res.redirect('/sneakers');
		}
	});
});

module.exports = router;