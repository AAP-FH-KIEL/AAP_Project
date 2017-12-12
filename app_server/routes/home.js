var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('template', { title: 'SportsFanz', pageName : 'home.ejs' });
});





module.exports = router;

