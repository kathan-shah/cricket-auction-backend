require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/dbConfig');
const leagueRoutes = require('./routes/leagueRoutes');
const teamRoutes = require('./routes/teamRoutes');
const app = express();
const PORT = process.env.PORT || 5000;


// Connect to Azure SQL Database
connectToDatabase();

// Middleware
app.use(cors()); // Allow CORS for communication with frontend
app.use(express.json()); // Parse JSON requests

// Example route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Routes
app.use('/api', leagueRoutes);
app.use('/api', teamRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
