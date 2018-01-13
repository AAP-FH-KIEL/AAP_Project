const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {
        type: String,
        required: 'Kindly enter your desired username'
    },

    email: {
        type: String,
        required: 'Kindly enter your first name'
    },
    password: {
        type: String,
        required: 'Kindly enter your desired password'
    },
});

Account.plugin(passportLocalMongoose);



module.exports = mongoose.model('Account', Account);