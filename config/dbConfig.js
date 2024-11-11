const sql = require('mssql');
require('dotenv').config();
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, 
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
  }
};

const connectToDatabase = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to Azure SQL Database');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

console.log('Database Server:', process.env.DB_SERVER);


module.exports = { sql, connectToDatabase };
