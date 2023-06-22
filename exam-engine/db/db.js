const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "examenginedb",
  password: "Hema",
  port: 5432,
});

module.exports = pool;
