var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/', function(req, res, next) {
    res.render('template', { title: 'SportsFanz', pageName : 'chat.ejs' });
});

module.exports = router;