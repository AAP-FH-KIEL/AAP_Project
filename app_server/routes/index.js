var express = require('express');
var router = express.Router();

var controlMethod = require('../controllers/main');

router.get('/', controlMethod.index);

module.exports = router;
