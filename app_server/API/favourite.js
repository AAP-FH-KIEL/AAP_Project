// Use array push or pop to remove or add a player or a team respectively to a user.
//If user is not a logged in before trying to add a favourite, system prompts for login/sign up
//creates an array of empty favourite bucket for a user
//Create an object for players and clubs and add to them.
//use set timeout function to create image sliders for main content

let mongoose = require('mongoose');

let userFavouriteSchema = mongoose.Schema({
    userId: Number,
    club: String,
    player: String,
    matches: String,
    date: Date,
    updateId: String,
    approved: Boolean,
});

let Favourite = mongoose.model('Favourite', userFavouriteSchema);
module.exports = Favourite;
