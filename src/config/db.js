const { Pool } = require('pg');
require('dotenv').config();

// SSL configuration options
let sslConfig = false;
if (process.env.DB_SSL === 'true') {
  sslConfig = { rejectUnauthorized: false };
} else if (process.env.DB_SSL === 'require') {
  sslConfig = { rejectUnauthorized: true };
} else if (process.env.DB_SSL === 'disable') {
  sslConfig = false;
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: sslConfig,
  // Additional connection options to handle SSL issues
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Database connection error:', err);
  if (err.code === 'ECONNREFUSED') {
    console.error('Database connection refused. Check if PostgreSQL is running.');
  } else if (err.message.includes('SSL')) {
    console.error('SSL connection error. Try setting DB_SSL=disable in .env file.');
  }
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err);
    if (err.message.includes('SSL')) {
      console.error('SSL connection error. Try setting DB_SSL=disable in .env file.');
    }
    return;
  }
  console.log('Database connected successfully');
  release();
});

module.exports = pool;
