var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

var file = './app_server/data/players.json';

router.get('/', function(req, res, next){
    console.log('from player route');
    jsonfile.readFile(file, function(err, jsonData) {
        if(err){
            console.log(err)
            res.render('template', { title: 'Players profile', pageName : 'error.ejs'});
        }
        else {
           // console.log('from read function');
           // console.dir(obj)
            res.render('template', { title: 'Players profile', pageName : 'playerView.ejs', MyValue: jsonData });
        }
    })

    //TODO: get player profile list from JSON file and pass the list to view
    var myArry = [{}];


});


module.exports = router;

