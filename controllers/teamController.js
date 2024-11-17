const pool = require('../config/dbConfig');

// Add Team to League
const addTeamToLeague = async (req, res) => {
    const { teamName, userID, leagueID } = req.body;
  
    try {
      const query = `
        INSERT INTO Teams (league_id, team_name, user_id) 
        VALUES ($1, $2, $3) RETURNING team_id
      `;
      const values = [leagueID, teamName, userID];
      const result = await pool.query(query, values);
  
      res.status(201).json({ message: 'Team added successfully', teamID: result.rows[0].team_id });
    } catch (err) {
      console.error('Error adding team:', err);
      res.status(500).json({ error: 'Failed to add team' });
    }
  };

// Get team info for a specific user
const getTeamInfo = async (req, res) => {
    const { email } = req.params;
    try {
      const userQuery = 'SELECT user_id FROM Users WHERE email = $1';
      const userResult = await pool.query(userQuery, [email]);
      
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found or no team info available' });
      }
  
      const userId = userResult.rows[0].user_id;
      const teamQuery = 'SELECT * FROM UserTeamInfo WHERE email = $1';
      const teamResult = await pool.query(teamQuery, [email]);
  
      if (teamResult.rows.length === 0) {
        return res.status(404).json({ message: 'No team info available' });
      }
  
      res.status(200).json({ players: teamResult.rows });
    } catch (err) {
      console.error('Error fetching team info:', err);
      res.status(500).json({ error: 'Failed to fetch team info' });
    }
};

// Save Team Info
const saveTeamInfo = async (req, res) => {
  const { email, teamChanges } = req.body;
  try {
    // Get UserID from email
    const userQuery = 'SELECT user_id FROM Users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = userResult.rows[0].user_id;

    // Update each player's IsStarter value based on teamChanges
    for (const [playerId, isStarter] of Object.entries(teamChanges)) {
      const updateQuery = `
        UPDATE UserSquads 
        SET is_starter = $1 
        WHERE user_id = $2 AND player_id = $3
      `;
      const values = [isStarter ? true : false, userId, playerId];
      await pool.query(updateQuery, values);
    }

    res.status(200).json({ message: 'Team updated successfully' });
  } catch (err) {
    console.error('Error saving team info:', err);
    res.status(500).json({ error: 'Failed to save team info' });
  }
};

module.exports = { addTeamToLeague, getTeamInfo, saveTeamInfo };
