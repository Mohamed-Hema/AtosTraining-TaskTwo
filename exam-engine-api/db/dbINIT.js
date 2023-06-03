const sequelize = require('../db/examsDB');
// const ExamDefinition = require('../models/examDefinition');

(async () => {
  try {
    await sequelize.sync();

    // Create the ExamDefinition table
    // await ExamDefinition.sync();

    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  } finally {
    await sequelize.close(); 
  }
})();
