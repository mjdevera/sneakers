var mongoose = require('mongoose');
var Sneaker = require('./models/sneaker');
var Comment = require('./models/comment');

var data = [
	{
		name: 'Space Jam',
		image: 'https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/0/1/012597_1.jpg',
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: 'Nike SF-AF1',
		image: 'https://www.sneakerfiles.com/wp-content/uploads/2017/10/nike-sf-af1-light-bone-gum-release-date.jpg',
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: 'Golf Le Fleur',
		image: 'https://stockx.imgix.net/Converse-One-Star-Ox-Tyler-The-Creator-Golf-Le-Fleur-Jolly-Green.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},

];

function seedDB() {
	// remove all sneakers
	Sneaker.remove({}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('REMOVED SNEAKERS');
			// add a few sneakers
			// data.forEach(function(seed) {
			// 	Sneaker.create(seed, function(err, sneaker) {
			// 		if (err) {
			// 			console.log(err);
			// 		} else {
			// 			console.log('SNKEAKERS ADDED');
			// 			// add a few comments
			// 			Comment.create(
			// 			{
			// 				text: 'Wow how cool!',
			// 				author: 'Internet Troll'
			// 			}, function(err, comment) {
			// 				if (err) {
			// 					console.log(err);
			// 				} else {
			// 					sneaker.comments.push(comment);
			// 					sneaker.save();
			// 					console.log('CREATED NEW COMMENT');
			// 				}
			// 			});
			// 		}
			// 	});
			// });
		}
		
	});
	// add a few comments
}

module.exports = seedDB;