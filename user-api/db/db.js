const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "usersexamengine",
    password: "Hema",
    port: 5432,
})

module.exports = pool;