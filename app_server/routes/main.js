var express = require('express');
var passport = require('passport');
var Account = require('../model/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('template', { user: req.user });
});

// signup routes
router.get('/signup', function(req, res) {
    res.render('signup', { title: 'Welcome to Sports Fanz, sign up here!!!'})
});
router.post('/signup', function(req, res) {
    Account.register(new Account({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            password: req.body.password
        }), req.body.password, function(err, account) {
        if (err)
            return res.render('signup', {account: account});
        passport.authenticate('local')(req, res, function() {
            res.send('/');
        })
    })
});

// login route
router.get('/login', function(req, res) {
    res.render('login', { title: 'Welcome to Sports Fanz, please log in!!!', user: req.user });
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
