// const keycloak = require('../utils/keycloak.json');
const pool = require('../db/db');
const queries = require('../queries/queries');


const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
  })
}


// Create user endpoint logic
const createUser = async (req, res) => {
  const { username, password, userType } = req.body;
  try {
    await pool.query(queries.createUser, [username, password, userType]);
    res.send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};


// Create roles endpoint logic
const createRoles = async (req, res) => {
  // Implement the logic to create roles
  res.send('Roles created successfully');
};

// Assign roles to user endpoint logic
const assignRolesToUser = async (req, res) => {
  // Implement the logic to assign roles to a user
  res.send('Roles assigned to user successfully');
};

module.exports = {
  getUsers,
  createUser,
  createRoles,
  assignRolesToUser,
};


