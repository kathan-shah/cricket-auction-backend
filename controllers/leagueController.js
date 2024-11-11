const { sql } = require('../config/dbConfig');

const createLeague = async (req, res) => {
  const { leagueName, createdBy } = req.body;
  try {
    const request = new sql.Request();
    const result = await request
      .input('leagueName', sql.NVarChar, leagueName)
      .input('createdBy', sql.NVarChar, createdBy)
      .query('INSERT INTO League (LeagueName, CreatedBy) VALUES (@leagueName, @createdBy); SELECT SCOPE_IDENTITY() AS LeagueID');
    res.status(201).json({ message: 'League created successfully', leagueID: result.recordset[0].LeagueID });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create league' });
  }
};

const getLeagues = async (req, res) => {
    try {
      const request = new sql.Request();
      const result = await request.query('SELECT * FROM League');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch leagues' });
    }
  };

module.exports = { createLeague, getLeagues };
