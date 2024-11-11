const { sql } = require('../config/dbConfig');

const addTeamToLeague = async (req, res) => {
    const { teamName, userID, leagueID } = req.body;
    try {
      const request = new sql.Request();
      await request
        .input('teamName', sql.NVarChar, teamName)
        .input('userID', sql.NVarChar, userID)
        .input('leagueID', sql.Int, leagueID)
        .query('INSERT INTO Team (TeamName, UserID, LeagueID) VALUES (@teamName, @userID, @leagueID)');
      res.status(201).json({ message: 'Team added successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add team' });
    }
};

module.exports = { addTeamToLeague };