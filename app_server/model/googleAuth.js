const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleUser = new Schema({
    username: String,
    googleId: String
});

const User = mongoose.model('user', googleUser);
module.exports = User;