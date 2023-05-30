const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  selectedAnswerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  displayTime: {
    type: Date,
    required: true,
  },
  answerTime: {
    type: Date,
    required: false,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
