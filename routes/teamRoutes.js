const express = require('express');
const { addTeamToLeague, getTeamInfo } = require('../controllers/teamController');
const router = express.Router();

// Define the route to create a league
router.post('/team', addTeamToLeague);

router.get('/team/email/:email', getTeamInfo);

module.exports = router;