const express = require('express');
const { addTeamToLeague } = require('../controllers/teamController');
const router = express.Router();

// Define the route to create a league
router.post('/team', addTeamToLeague);

module.exports = router;