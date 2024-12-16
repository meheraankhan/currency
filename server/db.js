require('dotenv').config();
const { Pool } = require('pg');

// Create a pool of connections to the database with SSL support
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: false
});
// Export the query method to use in other parts of the app
module.exports = {
    query: (text, params) => pool.query(text, params),
};