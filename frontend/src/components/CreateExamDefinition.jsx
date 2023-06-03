import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateExamDefinition = () => {
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the backend API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3200/api/questions/');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleCreateExam = async () => {
    try {
      const requestBody = {
        name: examName,
        Questions: selectedQuestions,
      };
  
      const response = await axios.post('http://localhost:5000/api/create-exam-definition/', requestBody);
  
      // Handle the response
      if (response.status === 201) {
        console.log('Exam Definition Created Successfully!');
        
        // Retrieve the exam IDs from the backend
        const examsResponse = await axios.get('http://localhost:5000/api/getexams');
        const examIds = examsResponse.data.map((exam) => exam.id);
        const lastExamId = examIds[examIds.length - 1]; // Get the last ID
        
        console.log('Last Exam ID:', lastExamId);
      } else {
        console.log('Exam creation failed.');
      }
    } catch (error) {
      console.error('Error creating exam:', error.response);
    }
  };
  

  const handleQuestionSelection = (questionId) => {
    setSelectedQuestions((prevSelectedQuestions) => {
      if (prevSelectedQuestions.includes(questionId)) {
        return prevSelectedQuestions.filter((id) => id !== questionId);
      } else {
        return [...prevSelectedQuestions, questionId];
      }
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <h1 className="text-center">Create Exam Definition</h1>
        <Form>
          <Form.Group controlId="examName">
            <Form.Label>Exam Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exam name"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="questions">
            <Form.Label>Questions</Form.Label>
            {questions.map((question) => (
              <Form.Check
                key={question._id}
                type="checkbox"
                id={question._id}
                label={question.name}
                onChange={() => handleQuestionSelection(question._id)}
              />
            ))}
          </Form.Group>

          <div className="mt-3 d-flex justify-content-center">
            <Button variant="primary" onClick={handleCreateExam}>
              Create Exam Definition
            </Button>
          </div>

          
        </Form>
      </div>
    </div>
  );
};

export default CreateExamDefinition;