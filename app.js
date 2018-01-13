var express = require('express');
var path = require('path');
var http = require('http');
const io = require('socket.io')();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const Account = require('./app_server/model/account');
const keys = require('./app_server/config/keys');
const User = require('./app_server/model/googleAuth');
const newUser = require('./app_server/model/facebookAuth');


var app = express();


//======Initializing the routes
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


//===Set View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//====Set port
app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));

//===Set Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//===Set Cookies and session
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//=====Set Static files
app.use(express.static(path.join(__dirname, 'public')));

//=====Set Express session
app.use(require('express-session')({
    secret: 'nobody knows JS',
    resave: false,
    saveUninitialized: false
}));

//=======Setting Global variables
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

//======Setup routes
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


//=======Socket starts here

var server = app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});


// passport config Local Strategy
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


////=======Passport Facebook strategy with oAuth

passport.use(new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: "/auth/facebook/redirect"
    },(accessToken, refreshToken, profile, done) =>{
    console.log(profile);

    new newUser({
        username: profile.displayName,
        facebookId: profile.id
    }).save().then((facebookUser) => {
        console.log('New user created: ', + facebookUser );
        return done(null, profile);
    });
})
)

//========Google Passport oAuth========

passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/google/redirect'
    },(AccessToken, refreshToken, profile, done) => {
    console.log(profile);

    new User({
        username: profile.displayName,
        googleId: profile.id
    }).save().then((GoogleUser) => {
        console.log('New user created: ', + GoogleUser );
    });
    })
)


// mongoose creation

//var dbUrl = 'mongodb://localhost:27017/FootballFanApp';

const dbURL = keys.mongodb.dbURI;
//mongoose.Promise = global.Promise;
mongoose.connect(dbURL, () => {
    console.log('Mongoose connected to ' + dbURL);
});
//mongoose.connection.on('connected', function () {
//  console.log('Mongoose connected to ' + dbUrl);
//});

mongoose.connection.on('error', function (error) {
    console.log('Mongoose connection error ' + error);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

io.attach(server);
io.on('connection', function(socket){
    console.log('User Connected');
    socket.on('postMessage', function(data){
        io.emit('updateMessages', data);
    });

    socket.on('disconnect', function(){
        console.log('User Disconnected');
    });
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

