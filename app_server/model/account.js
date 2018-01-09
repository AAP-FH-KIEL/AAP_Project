var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({

    username: {
        type: String,
        required: 'Kindly enter your desired username'
    },
    password: {
        type: String,
        required: 'Kindly enter your desired password'
    },
    email: {
        type: String,
        required: 'Kindly enter your first name'
    },

});

var User = new Schema({

    username: {
        type: String,
        required: 'Kindly enter your desired username'
    },
    password: {
        type: String,
        required: 'Kindly enter your desired password'
    },


});

Account.plugin(passportLocalMongoose);
User.plugin(passportLocalMongoose);


module.exports = mongoose.model('Account', Account);
module.exports = mongoose.model('User', User);