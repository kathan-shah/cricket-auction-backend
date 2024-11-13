// src/routes/matchdayRoutes.js
const express = require('express');
const { getMatchdayInfo } = require('../controllers/matchdayController');
const router = express.Router();

// Route to get all head-to-head matches for the league
router.get('/matchday/leagueId/:leagueId', getMatchdayInfo);

module.exports = router;