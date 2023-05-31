import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateExam = () => {
  const navigate = useNavigate();
  const [examName, setExamName] = useState('');
  const [passingScore, setPassingScore] = useState('');

  const handleCreateExam = async () => {
    // Perform validation or any other necessary checks here

    // Prepare the exam instance data
    const examInstanceData = {
      name: examName,
      passingScore: parseFloat(passingScore),
    };

    // Call the API function to create the exam instance
    try {
      await axios.post('http://localhost:3000/api/create-exam', examInstanceData);
      // Exam instance created successfully, redirect to the desired page
      navigate.push('/exams');
    } catch (error) {
      console.log('Failed to create exam instance:', error);
      // Handle error scenario, display error message, etc.
    }
  };

  return (
    <div>
      <h1>Create Exam</h1>
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

        <Form.Group controlId="passingScore">
          <Form.Label>Passing Score</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter passing score"
            value={passingScore}
            onChange={(e) => setPassingScore(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateExam}>
          Create Exam
        </Button>
      </Form>
    </div>
  );
};

export default CreateExam;
