const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// Initializes MongoDB Database
mongoose.connect(keys.mongoURI);

// Creates new instance of Express
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

// Authentication Routes
require('./routes/authRoutes')(app);


// Event Listener
PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log('app listening on ' + PORT)
