// const keycloak = require('../utils/keycloak.json');
const pool = require('../db/db');
const User = require('../models/user');


// Get all Users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      res.status(404).send('No users found');
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Create user endpoint logic
const createUser = async (req, res) => {
  const { username, password, userType } = req.body;
  try {
    await User.create({ username, password, userType });
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