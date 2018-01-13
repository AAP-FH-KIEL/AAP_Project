var express = require('express');
const passport = require('passport');
var Account = require('../model/account');
const router = express.Router();


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
        password: req.body.password
    }), req.body.password, function(err, account) {

        if (err)
             //res.render('signup', {err: err});
            return res.render('template', { title: 'SportsFanz', pageName : 'signup.ejs', err: err});
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

router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/redirect',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

// router.post('/login', passport.authenticate('local'), function(req, res) {
//     console.log(res);
//             res.send('/');
// });

router.get('/google',
    passport.authenticate('google', { scope: ['profile']})
);

router.get('/google/redirect',passport.authenticate('google'), (req, res)=> {
    res.send('You have been redirected to callback');
});

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/test', function(req, res) {
    res.status(200).send('Bing bing Bong Bong!! I am master Jide')
});

module.exports = router;




