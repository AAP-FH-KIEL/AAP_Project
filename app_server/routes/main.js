var express = require('express');
var passport = require('passport');
var Account = require('../model/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('template', { title: 'SportsFanz', pageName : 'home.ejs', user: req.user });
});

// signup routes
router.get('/signup', function(req, res) {
    res.render('template', { title: 'SportsFanz', pageName : 'signup.ejs'});
});

router.post('/signup', function(req, res) {
    Account.register(new Account({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        }), req.body.password, function(err, account) {

        if (err)
            //return res.render('signup', {account: account});
            res.render('Sorry this user does not exist');
        passport.authenticate('local')(req, res, function() {
            res.send('/');
        })
    })
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

// login route
router.get('/login', function(req, res) {
    res.render('template', { title: 'SportsFanz', pageName : 'login.ejs', user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(res);
            res.send('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/test', function(req, res) {
    res.status(200).send('Bing bing Bong Bong!! I am master Jide')
});

module.exports = router;




