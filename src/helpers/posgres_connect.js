const { Client } = require('pg');

// Los valores de conexión los toma del archivo .env


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect( ( err ) => {
  if( err ) console.error( err );
  console.log( 'Conectado a la BBDD Posgres' );
});

module.exports = {
  client
};

