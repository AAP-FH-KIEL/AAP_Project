var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');

//var client = require(('football-api-nodejs-client')(2370054d48474dcbba5cb153af166603));


var newsApi = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=47627eed59d843ab8b7324426c023731";

var apiRoute = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiRoute.server = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=47627eed59d843ab8b7324426c023731";
}



router.get('/', function(req, res, next) {
    var responseData = {};
    var requestRoute = {
        url: "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=47627eed59d843ab8b7324426c023731",
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


            responseData.news = body;

            requestRoute = {
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
                    responseData.table = body;
                    res.render('template', { title: 'SportsFanz', pageName : 'news.ejs' , data: responseData});
                } else {
                    console.log(response.statusCode);
                }
            });


        } else {
            console.log(response.statusCode);
        }
    });

});



module.exports = router;

//I want to use the BBC news API to get the news feed for sports. I have done this already for matches and league tables.
//But somehow i cant seem to find get the api to run...it sshowing error as you can find on my browser
// Please i need your help to fix this