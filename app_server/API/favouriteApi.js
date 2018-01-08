var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var favourites = require('../api/favourite');


router.post('/api/favourites', function(req, res){
    var apiList = new favourites({
        userId: req.body.userId,
        email: req.body.email,
        club: req.body.club,
        player: req.body.player,
        matches: req.body.matches,
        approved: false,
    });

    apiList.save(function(err, apiList){
        if(err) return res.send(500, 'An error occurred in the database');
        res.json({userId: apiList.userId});
    });
});

router.get('/api/favourite/:userId', function(req, res){
    favourites.findById(req.params.userId, function(err, apiList ){
        if(err) return res.send(500, 'An error has occurred');
        res.json({
            userId: apiList.userId,
            club: apiList.club,
            player: apiList.player,
            matches: apiList.matches,

        })
    })
})






