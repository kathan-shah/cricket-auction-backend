const sql = require('mssql');
const { sqlConfig } = require('../config/dbConfig');

// Get all head-to-head matches for the league on a matchday
const getMatchdayInfo = async (req, res) => {
  const { leagueId } = req.params;
  try {
    const request = new sql.Request();
    await sql.connect(sqlConfig);
    const matchdayResult = await request
      .input('leagueId', sql.Int, leagueId)
      .query('SELECT * FROM LeagueMatchDayInfo WHERE LeagueID = @leagueId');

    if (matchdayResult.recordset.length === 0) {
      return res.status(404).json({ message: 'No matchday info available for the specified league' });
    }

    res.status(200).json({ matches: matchdayResult.recordset });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matchday info' });
  }
};

module.exports = { getMatchdayInfo };