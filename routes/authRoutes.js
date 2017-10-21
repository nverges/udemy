const passport = require('passport');


module.exports = app => {

	// Google OAuth route
	app.get('/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// Google OAuth redirect route
	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	// Route to display currently authenticated user
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	// default GET route
	app.get('/', (req, res) => {
		res.send({ hi: 'there'});
	});

};