var mongoose = require('mongoose');
var dbURL = 'mongodb://127.0.0.1:3000/FootballFanApp';

mongoose.connect(dbURL);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURL);
});

mongoose.connection.on('error', function (error) {
    console.log('Mongoose connection error ' + error);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});