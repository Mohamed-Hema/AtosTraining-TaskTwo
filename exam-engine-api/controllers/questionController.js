const Question = require('../models/Question');

// Controller actions for handling questions

// Get all questions
async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find();
    return res.json(questions);
  } catch (error) {
    console.error('Error getting questions:', error);
    return res.status(500).json({ error: 'Failed to get questions' });
  }
}

// Get a single question by ID
async function getQuestionById(req, res) {
  try {
    const { questionId } = req.params;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    return res.json(question);
  } catch (error) {
    console.error('Error getting question:', error);
    return res.status(500).json({ error: 'Failed to get question' });
  }
}

module.exports = {
  getAllQuestions,
  getQuestionById,
};
