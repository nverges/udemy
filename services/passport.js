const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// User ID is the unique ID assigned by Mongo	
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialize User
passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	});
});

// Passport schema and login routes
passport.use(
	new GoogleStrategy (
	{ 	
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, 
	(accessToken, refreshToken, profile, done) => {

		// If / else statement to determine if this user is already in the database
		User.findOne({ googleId: profile.id })
		.then((existingUser) => {
			if (existingUser) {
				// we already have a record with the given profile ID. Do nothing
				done(null, existingUser);
			} else {
				// we don't have a user record with this id, make a new record
				new User({ googleId: profile.id})
				.save()
				.then(user => done(null, user));
			}
		});


	}
	)
);

