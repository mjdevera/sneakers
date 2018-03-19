var express = require('express');
var router = express.Router();
var Sneaker = require('../models/sneaker');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// ======== COMMENTS ROUTES ========
router.get('/sneakers/:id/comments/new', middleware.isLoggedIn, function(req, res) {
	// find sneaker by id
	Sneaker.findById(req.params.id, function(err, sneaker) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', {sneaker: sneaker});

		}
	});
	
});

// Comments Create
router.post('/sneakers/:id/comments', middleware.isLoggedIn, function(req, res) {
	// look up sneaker using id
	Sneaker.findById(req.params.id, function(err, sneaker) {
		if (err) {
			console.log(err);
			res.redirect('/sneakers');
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err, newComment) {
				if (err) {
					req.flash('error', 'something went wrong');
					console.log(err);
				} else {
					// add username and id to comment
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					// save comment
					newComment.save();
					sneaker.comments.push(newComment);	// sneaker from line 24
					sneaker.save();
					console.log(newComment);
					req.flash('success', 'Successfully added comment!');
					res.redirect('/sneakers/' + sneaker._id);
				}
			});
			// connect new comment to sneaker
			// redirect to sneaker show page
		}
	});	
});

// EDIT - edit comments
router.get('/sneakers/:id/comments/:commentId/edit', middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.commentId, function(err, foundComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', {sneakerId: req.params.id, comment: foundComment});
		}
	});
});

// COMMENTS UPDATE
router.put('/sneakers/:id/comments/:commentId', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/sneakers/' + req.params.id);
		}
	});
});

// COMMENTS DESTROY
router.delete('/sneakers/:id/comments/:commentId', middleware.checkCommentOwnership, function(req, res) {
	// findByIdAndRemove
	Comment.findByIdAndRemove(req.params.commentId, function(err) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted!');
			res.redirect('/sneakers/' + req.params.id);
		}
	});
});

module.exports = router;