var express = require('express');
var path = require('path');
var http = require('http');
var io = require('socket.io')(http);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

var routes = require('./app_server/routes/main');
var users = require('./app_server/routes/userController/users');
var home = require('./app_server/routes/home');
var clubs = require('./app_server/routes/profileController/clubs');
var players = require('./app_server/routes/profileController/players');
var competition = require('./app_server/routes/userController/competition');
var news = require('./app_server/routes/news');
var leagueTable = require('./app_server/routes/leagueTable');
var matches = require('./app_server/routes/matches');
var main = require('./app_server/routes/main');
var chat = require('./app_server/routes/chat');
// -----------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('clubProfile', clubData);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'nobody knows JS',
    resave: false,
    saveUninitialized: false
}));

app.use('/', routes);
app.use('/home', home);
//app.use('/users', users);
app.use('/players', players);
app.use('/leagueTable', leagueTable);
app.use('/competition', competition);
app.use('/clubs', clubs);
app.use('/news', news);
app.use('/matches', matches);
app.use(require('./app_server/routes/index'));
app.use('/main', main);
app.use('/chat', chat);

// app.use(express.static('app_server/public'));

app.use(session({
    secret: 'nobodyknowsjavascript',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// passport config
var Account = require('./app_server/model/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose


var dbUrl = 'mongodb://localhost:27017/FootballFanApp';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbUrl);
});

mongoose.connection.on('error', function (error) {
    console.log('Mongoose connection error ' + error);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});



// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
