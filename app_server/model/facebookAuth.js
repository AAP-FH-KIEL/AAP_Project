const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facebookUser = new Schema({
    username: String,
    facebookId: String
});

const newUser = mongoose.model('user2', facebookUser);
module.exports = newUser;