// src/server.js
require('dotenv').config();
const express = require('express');
const pool = require('./config/dbConfig');  // Importing PostgreSQL pool
const cors = require('cors');
const bodyParser = require('body-parser');

const teamRoutes = require('./routes/teamRoutes');
const matchdayRoutes = require('./routes/matchdayRoutes');
const leagueRoutes = require('./routes/leagueRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/team', teamRoutes);
app.use('/api/league', leagueRoutes);
app.use('/api/matchday', matchdayRoutes);

// Testing Database Connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database successfully');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
