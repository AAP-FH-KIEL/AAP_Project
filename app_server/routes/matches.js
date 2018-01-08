// in the matches modules, we create a list of clubs with club_id and hard code each for the up coming matches with dates and time stamp
// below the clubs we are having a comparison table to compare the previous matches/meetings of the two clubs and their performances
//there is also a comparison between different segments of the the line-ups eg. midfielders, strikers

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');


var apiRoute = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiRoute.server = "http://api.football-data.org/v1/competitions/445/fixtures";
}


router.get('/', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/competitions/445/fixtures",
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
            res.render('template', { title: 'SportsFanz', pageName : 'matches.ejs' , data: body});
        } else {
            console.log(response.statusCode);
        }
    });
});

module.exports = router;