const express = require('express');
const { addTeamToLeague, getTeamInfo, saveTeamInfo } = require('../controllers/teamController');
const router = express.Router();

// Define the route to create a league
router.post('/team', addTeamToLeague);

router.get('/team/email/:email', getTeamInfo);

// Route to save team information (update IsStarter)
router.post('/team/save', saveTeamInfo);

module.exports = router;