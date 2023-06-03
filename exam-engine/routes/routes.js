const Router = require('express');
const router = Router();

const examController = require('../controllers/controller')

//Exam Creation
router.post('/create-exam-definition', examController.createExamDefinition);
router.post('/create-exam', examController.createExamInstance);

//Getting Exams
router.get('/getexams', examController.getExams);
router.get('/getexams/:id', examController.getExamById);


module.exports = router;5000