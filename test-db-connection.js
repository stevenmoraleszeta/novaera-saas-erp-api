const { Pool } = require('pg');
require('dotenv').config();

// Use hosted database credentials for testing
const TEST_DB_CONFIG = {
  host: 'dpg-d1eciv2li9vc739tc0u0-a.virginia-postgres.render.com',
  port: 5432,
  database: 'erp_api',
  user: 'erp_api_user',
  password: 'kdGW7HrswdZxa4TqW9nJBNraFzZ2PBSO'
};

console.log('Testing database connection...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Testing with hosted database:');
console.log('DB_HOST:', TEST_DB_CONFIG.host);
console.log('DB_PORT:', TEST_DB_CONFIG.port);
console.log('DB_NAME:', TEST_DB_CONFIG.database);
console.log('DB_USER:', TEST_DB_CONFIG.user);

// Test different SSL configurations
const testConfigurations = [
  {
    name: 'SSL Disabled',
    ssl: false
  },
  {
    name: 'SSL Flexible (rejectUnauthorized: false)',
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'SSL Flexible with checkServerIdentity override',
    ssl: { 
      rejectUnauthorized: false,
      checkServerIdentity: () => undefined
    }
  },
  {
    name: 'SSL Required (rejectUnauthorized: true)',
    ssl: { rejectUnauthorized: true }
  }
];

async function testConnection(sslConfig, configName) {
  console.log(`\n--- Testing ${configName} ---`);
  
  const pool = new Pool({
    host: TEST_DB_CONFIG.host,
    port: TEST_DB_CONFIG.port,
    user: TEST_DB_CONFIG.user,
    password: TEST_DB_CONFIG.password,
    database: TEST_DB_CONFIG.database,
    ssl: sslConfig,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 1
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version');
    console.log(`✅ ${configName} - Connection successful!`);
    console.log('Server time:', result.rows[0].current_time);
    console.log('PostgreSQL version:', result.rows[0].postgres_version.substring(0, 50) + '...');
    client.release();
    await pool.end();
    return true;
  } catch (error) {
    console.log(`❌ ${configName} - Connection failed:`, error.message);
    await pool.end();
    return false;
  }
}

async function runTests() {
  console.log('\n🔍 Testing different SSL configurations...\n');
  
  for (const config of testConfigurations) {
    const success = await testConnection(config.ssl, config.name);
    if (success) {
      console.log(`\n🎉 Found working configuration: ${config.name}`);
      console.log('SSL Config:', JSON.stringify(config.ssl, null, 2));
      break;
    }
  }
  
  console.log('\n--- Test completed ---');
}

runTests().catch(console.error);
