const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('examenginedb', 'postgres', 'Hema', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
