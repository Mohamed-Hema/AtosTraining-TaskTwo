const ExamInstance = require('../models/examInstance');
// const ExamDefinition = require('../models/examDefinition');
const { Sequelize, DataTypes } = require('sequelize');

// Create a new exam instance
async function createExamInstance(req, res) {
  try {
    const { createdBy, takenBy } = req.body;

    // Calculating completion time based on start time and duration
    const startTime = new Date();
    // time in milliseconds
    const duration = 60 * 60 * 1000;
    const endTime = new Date(startTime.getTime() + duration);

    // Create the exam instance
    const examInstance = await ExamInstance.create({
      // examDefinitionId,
      startTime,
      endTime,
      duration,
      completionTime: endTime,
      createdBy,
      takenBy,
      status: 'absent',
      passingScore: 0.5, // Set the passing score to 50%
    });


    // Update the exam instance with the generated link
    await examInstance.update({ generatedLink });

    return res.status(201).json(examInstance);
  } catch (error) {
    console.error('Error creating exam instance:', error);
    return res.status(500).json({ error: 'Failed to create exam instance' });
  }
}







module.exports = {
  createExamInstance
};
