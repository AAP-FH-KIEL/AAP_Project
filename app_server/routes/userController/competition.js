var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var competitionData = require('./../../data/competition.json');

var apiRoute = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiRoute.server = "http://api.football-data.org/v1/competitions/445/leagueTable";
}

router.get('/', function(req, res, next) {
    res.render('template', { title: 'SportsFanz', pageName : 'competitionHome.ejs' });
});

router.get('/teams', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/competitions/426/teams",
        method : "GET",
        json : {},
        qs : {
            offset : 20
        }
    };
    request(requestRoute, function(err, response, body) {
    if (err) {
        console.log(err);
    } else if (response.statusCode === 200) {
       console.log(body);
        res.render('template', { title: 'SportsFanz', pageName : 'teams.ejs' , data: body});
    } else {
        console.log(response.statusCode);
    }
    });
});
router.get('/competitions', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/competitions/?season=2017",
        method : "GET",
        json : {},
        qs : {
            offset : 20
        }
    };
    request(requestRoute, function(err, response, body) {
    if (err) {
        console.log(err);
    } else if (response.statusCode === 200) {
       console.log(body);
        res.render('template', { title: 'SportsFanz', pageName : 'competition.ejs' , data: body});
    } else {
        console.log(response.statusCode);
    }
    });
});

router.get('/pl', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/competitions/445/leagueTable",
        method : "GET",
        json : {},
        qs : {
            offset : 20
        }
    };
    request(requestRoute, function(err, response, body) {
        if (err) {
            console.log('error ', err);
        } else if (response.statusCode === 200) {
            console.log(body);
            res.render('template', { title: 'SportsFanz', pageName : 'league.ejs' , data: body});
        } else {
            console.log('response error ', response.statusCode);
        }
    });
});



module.exports = router;
