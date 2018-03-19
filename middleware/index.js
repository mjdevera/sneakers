var Sneaker = require('../models/sneaker');
var Comment = require('../models/comment');

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkSneakerOwnership = function(req, res, next) {
	// is user logged in?
	if (req.isAuthenticated()) {
		Sneaker.findById(req.params.id, function(err, foundSneaker) {
			// if not, redirect
			if (err) {
				req.flash('error', 'Sneaker not found');
				res.redirect('back');
			} else {				
				// does user own campground?			
				if (foundSneaker.author.id.equals(req.user._id)) {		// the user owns the camp
					next();
				// otherwise, redirect
				} else {					
					req.flash('error', 'You do not have permission to do that');
					res.redirect('back');
				}				
			}
		});
	} else {
		req.flash('error', "You need to be logged in to do that!");
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	// is user logged in?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.commentId, function(err, foundComment) {
			// if not, redirect
			if (err) {
				res.redirect('/sneakers/:id');
			} else {				
				// does user own comment?			
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				// otherwise, redirect
				} else {
					req.flash('error', 'You do no have permission to do that');
					res.redirect('back');
				}				
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that!');
	res.redirect('/login');
}


module.exports = middlewareObj;