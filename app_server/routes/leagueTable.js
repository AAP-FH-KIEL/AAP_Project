var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');

var apiRoute = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiRoute.server = "http://api.football-data.org/v1/competitions/445/leagueTable";
}

router.get('/', function(req, res, next) {
    var requestRoute = {
        url: "http://api.football-data.org/v1/competitions/445/leagueTable",
        method: "GET",
        json: {},
        qs: {
            offset: 20
        },
    };
    request(requestRoute, function(err, response, body) {
        if (err) {
            console.log(err);
        } else if (response.statusCode === 200) {
            console.log(body);
            res.render('template', { title: 'SportsFanz', pageName : 'leagueTable.ejs' , data: body});
        } else {
            console.log(response.statusCode);
        }
    })
});

module.exports = router;