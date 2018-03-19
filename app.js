var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local');
var methodOverride = require('method-override');
var Sneaker = require('./models/sneaker');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');

// ROUTES
var sneakerRoutes = require('./routes/sneakers');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');


// SEED THE DATABASE
// seedDB();

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
mongoose.connect('mongodb://mjd:sneakers9$@ds117739.mlab.com:17739/sneakers', {useMongoClient: true});
// mongodb://localhost/sneakers

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'I NEED A HONEYBUTTA',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// ROUTES
app.use(indexRoutes);
app.use(sneakerRoutes);
app.use(commentRoutes);

app.listen(app.get('port'), function() {
	console.log('SNEAKERS SERVER HAS STARTED');
});