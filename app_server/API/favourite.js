// Use array push or pop to remove or add a player or a team respectively to a user.
//If user is not a logged in before trying to add a favourite, system prompts for login/sign up
//creates an array of empty favourite bucket for a user
//use set timeout function to create image sliders for main content

var mongoose = require('mongoose');

var favourite = mongoose.Schema({
    userId: Number,
    club: String,
    player: String,
    matches: String,
    email: String,
    date: Date,
    updateId: String,
    approved: Boolean,
});

var Favourite = mongoose.model('Favourite', favourite);
module.exports = Favourite;
