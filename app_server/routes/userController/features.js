var express = require('express');
var router = express.Router();

/* GET current fixtures */
router.get('/', function(req, res, next) {
    res.render('template', { title: 'Fixtures', pageName : 'fixtures.ejs' });
});



module.exports = router;
