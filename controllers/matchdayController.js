// src/controllers/matchdayController.js
const pool = require('../config/dbConfig');

// Get all head-to-head matches for the league on a matchday
const getMatchdayInfo = async (req, res) => {
  const { leagueId } = req.params;
  try {
    const query = 'SELECT * FROM matchschedule WHERE league_id = $1';
    const values = [leagueId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No matchday info available for the specified league' });
    }

    res.status(200).json({ matches: result.rows });
  } catch (err) {
    console.error('Error fetching matchday info:', err);
    res.status(500).json({ error: 'Failed to fetch matchday info' });
  }
};

module.exports = { getMatchdayInfo };
