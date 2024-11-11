const express = require('express');
const { createLeague, getLeagues } = require('../controllers/leagueController');
const router = express.Router();

// Define the route to create a league
router.post('/league', createLeague);
router.get('/get-leagues', getLeagues);

module.exports = router;
