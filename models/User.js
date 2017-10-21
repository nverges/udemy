// This file creates the Mongoose Model Class

const mongoose = require('mongoose');

// This says that - the mongoose object has a property called 'Schema.' Take that object and apply it to a new vairable called "Schema"
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId : String
});

// Tells mongoose we want to create a new collection called "users"
mongoose.model('users', userSchema);