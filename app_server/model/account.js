var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    firstName: {
        type: String,
        required: 'Kindly enter your first name'
    },
    lastName: {
        type: String,
        required: 'Kindly enter your last name'
    },
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
    gender: {
        type: [{
            type: String,
            enum: ['male', 'female']
        }]
    }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);