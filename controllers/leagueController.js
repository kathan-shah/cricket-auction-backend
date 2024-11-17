// src/controllers/leagueController.js
const pool = require('../config/dbConfig');

// Create a new league
const createLeague = async (req, res) => {
  const { leagueName, createdBy } = req.body;
  try {
    const query = `
      INSERT INTO League (league_name, created_by) 
      VALUES ($1, $2) RETURNING league_id
    `;
    const values = [leagueName, createdBy];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'League created successfully', leagueID: result.rows[0].league_id });
  } catch (err) {
    console.error('Error creating league:', err);
    res.status(500).json({ error: 'Failed to create league' });
  }
};

// Get all leagues
const getLeagues = async (req, res) => {
  try {
    const query = 'SELECT * FROM League';
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching leagues:', err);
    res.status(500).json({ error: 'Failed to fetch leagues' });
  }
};

module.exports = { createLeague, getLeagues };
