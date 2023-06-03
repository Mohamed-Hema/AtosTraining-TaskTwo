const ExamInstance = require("../models/examInstance");
const ExamDefinition = require("../models/examDefinition");
const { Sequelize, DataTypes } = require("sequelize");

// Create a new exam instance
// Create a new exam instance
async function createExamInstance(req, res) {
  try {
    const { createdBy, takenBy } = req.body;

    // Fetch a random exam definition
    const examDefinition = await ExamDefinition.findOne();

    if (!examDefinition) {
      return res.status(404).json({ error: "Exam definition not found" });
    }

    // Calculating completion time based on start time and duration
    const startTime = new Date();
    // time in milliseconds
    const duration = 60 * 60 * 1000;
    const endTime = new Date(startTime.getTime() + duration);

    // Create the exam instance
    const examInstance = await ExamInstance.create({
      examDefinitionId,
      startTime,
      endTime,
      duration,
      completionTime: endTime,
      createdBy,
      takenBy,
      status: "absent",
      passingScore: 0.5, // Set the passing score to 50%
    });

    // Generating the link object
    const generatedLink = {
      scheduledTimeFrom: startTime,
      scheduledTimeTo: endTime,
      url: generateExamUrl(examInstance.id), // Pass the id of the exam instance to the generateExamUrl function
    };

    // Update the exam instance with the generated link
    await examInstance.update({ generatedLink });

    return res.status(201).json(examInstance);
  } catch (error) {
    console.error("Error creating exam instance:", error);
    return res.status(500).json({ error: "Failed to create exam instance" });
  }
}

async function getExams() {
  try {
    // Fetch all exam instances from the database
    const exams = await ExamInstance.findAll();

    // Return the exam instances
    return exams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
}

// Helper function to generate the exam URL
function generateExamUrl(examInstanceId) {
  // Generate a unique URL using the id of the exam instance
  const url = `https://example.com/exam/${examInstanceId}`;

  return url;
}

module.exports = {
  createExamInstance,
  generateExamUrl,
  getExams,
};
