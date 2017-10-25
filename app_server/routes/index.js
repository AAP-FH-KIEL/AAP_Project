var express = require('express');
var router = express.Router();


var highlightController = require('../controllers/highlightControl');
var teamController = require('../controllers/teamControl');
var playerController = require('../controllers/playerControl');
var matchController = require('../controllers/matchControl');
var mainController = require('../controllers/homeControl');


router.get('/', mainController.home);
router.get('/highlights', highlightController.highlights);
router.get('/teams', teamController.teams);
router.get('/players', playerController.players);
router.get('/matches', matchController.matches);


module.exports = router;
