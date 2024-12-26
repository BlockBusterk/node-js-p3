import { Client } from 'pg';

async function testConnection() {
  const client = new Client({
    host: 'localhost', // Replace with 'postgres-db' if needed
    port: 5432,
    user: 'postgres',
    password: 'huyho@ng432002',
    database: 'postgres',
  });

  try {
    await client.connect();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  } finally {
    await client.end();
  }
}

testConnection();
