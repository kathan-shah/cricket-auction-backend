const sql = require('mssql');
const { sqlConfig } = require('../config/dbConfig');

const addTeamToLeague = async (req, res) => {
    const { teamName, userID, leagueID } = req.body;
    try {
      const request = new sql.Request();
      await sql.connect(sqlConfig);
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

// Get team info for a specific user
const getTeamInfo = async (req, res) => {
    const { email } = req.params;
    try {
      const request = new sql.Request();
      await sql.connect(sqlConfig);
      const teamResult = await request
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM UserTeamInfo WHERE Email = @email');
  
      if (teamResult.recordset.length === 0) {
        return res.status(404).json({ message: 'User not found or no team info available' });
      }
  
      res.status(200).json({ players: teamResult.recordset });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch team info' });
    }
  };


const saveTeamInfo = async (req, res) => {
  const { email, teamChanges } = req.body;
  try {
    const request = new sql.Request();
    await sql.connect(sqlConfig);

    // Get UserID from email
    const userResult = await request
      .input('email', sql.NVarChar, email)
      .query('SELECT UserID FROM Users WHERE Email = @email');

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = userResult.recordset[0].UserID;

    // Update each player's IsStarter value based on teamChanges
    for (const [playerId, isStarter] of Object.entries(teamChanges)) {
        const request = new sql.Request();
        await request
          .input('userId', sql.Int, userId)
          .input('playerId', sql.Int, playerId)
          .input('isStarter', sql.Bit, isStarter ? 1 : 0)
          .query('UPDATE UserSquads SET IsStarter = @isStarter WHERE UserID = @userId AND PlayerID = @playerId');
      }

    res.status(200).json({ message: 'Team updated successfully' });
  } catch (err) {
    console.error('Error saving team info:', err);
    res.status(500).json({ error: 'Failed to save team info' });
  }
};

module.exports = { addTeamToLeague, getTeamInfo, saveTeamInfo };