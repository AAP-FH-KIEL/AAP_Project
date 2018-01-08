var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');


var apiRoute = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiRoute.server = "http://api.football-data.org/v1/competitions/426/teams";
}

router.get('/', function(req, res, next) {
    res.render('template', { title: 'SportsFanz', pageName : 'teams.ejs' });
});

router.get("", function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/teams/61/players",
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
            res.render('template', { title: 'SportsFanz', pageName : 'chelsea.ejs' , data: body});
        } else {
            console.log(response.statusCode);
        }
    });
});
router.get('/manunited', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/teams/66/players",
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
            res.render('template', { title: 'SportsFanz', pageName : 'manunited.ejs' , data: body});
        } else {
            console.log(response.statusCode);
        }
    });
});

router.get('/mancity', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/teams/65/players",
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
            res.render('template', { title: 'SportsFanz', pageName : 'mancity.ejs' , data: body});
        } else {
            console.log('response error ', response.statusCode);
        }
    });
});

router.get('/liverpool', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/teams/64/players",
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
            res.render('template', { title: 'SportsFanz', pageName : 'liverpool.ejs' , data: body});
        } else {
            console.log('response error ', response.statusCode);
        }
    });
});

router.get('/arsenal', function(req, res, next) {
    var requestRoute = {
        url : "http://api.football-data.org/v1/teams/57/players",
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
            res.render('template', { title: 'SportsFanz', pageName : 'arsenal.ejs' , data: body});
        } else {
            console.log('response error ', response.statusCode);
        }
    });
});



module.exports = router;
