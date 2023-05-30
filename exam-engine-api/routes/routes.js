const express = require('express');
const examController = require('../controllers/examController');
const questionController = require('../controllers/questionController');
const router = express.Router();

// API routes for exams
router.post('/exams', examController.createExamInstance);


// API routes for questions
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:questionId', questionController.getQuestionById);





module.exports = router;
