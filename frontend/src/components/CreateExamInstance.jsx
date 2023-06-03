import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateExamInstance = () => {
  const [examDefinitionId, setExamDefinitionId] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [takenBy, setTakenBy] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateExamInstance = async () => {
    const requestBody = {
      examDefinitionId: examDefinitionId,
      createdBy: createdBy,
      takenBy: takenBy,
      status: status
    };

    try {
      const response = await axios.post('http://localhost:5000/api/create-exam/', requestBody);
      console.log(response.data); // Exam Instance Created Successfully!
      // Perform any additional actions or handle success
    } catch (error) {
      console.error('Error creating exam instance:', error);
      // Handle error
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form>
      <h1>Create Exam</h1>
        <Form.Group controlId="formExamDefinitionId">
          <Form.Label>Exam Definition ID</Form.Label>
          <Form.Control
            type="text"
            value={examDefinitionId}
            onChange={(e) => setExamDefinitionId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCreatedBy">
          <Form.Label>Created By</Form.Label>
          <Form.Control
            type="text"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTakenBy">
          <Form.Label>Taken By</Form.Label>
          <Form.Control
            type="text"
            value={takenBy}
            onChange={(e) => setTakenBy(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="Absent">Absent</option>
            <option value="Taken">Taken</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleCreateExamInstance}>
          Create Exam Instance
        </Button>
      </Form>
    </div>
  );
};

export default CreateExamInstance;
