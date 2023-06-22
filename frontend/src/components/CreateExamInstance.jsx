import  { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "../hooks/gettingUsers";
import StudentDropDown from "./StudentDropDown";

const CreateExamInstance = () => {
  const [examDefinitionId, setExamDefinitionId] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [takenBy, setTakenBy] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lastExamId = queryParams.get("examId");

  useEffect(() => {
    setExamDefinitionId(lastExamId);
  }, [lastExamId]);

  const handleCreateExamInstance = async () => {
    if (!examDefinitionId || !createdBy || !takenBy || !status) {
      setIsSuccess(false);
      setMessage("Please fill in all fields.");
      return;
    }

    const requestBody = {
      examDefinitionId: examDefinitionId,
      createdBy: createdBy,
      takenBy: takenBy,
      status: status,
    };

    try {
      const access_token = await getAccessToken();
      await axios.post("http://localhost:5000/api/create-exam/", requestBody, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setIsSuccess(true);
      setMessage("Exam Was Created Successfully!");
      // Perform any additional actions or handle success

      // Reset the form fields after successful submission
      setExamDefinitionId("");
      setCreatedBy("");
      setTakenBy("");
      setStatus("");
    } catch (error) {
      setIsSuccess(false);
      setMessage("Exam Was Not Created.");
      console.error("Error creating exam instance:", error);
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
            disabled
            required
          />
        </Form.Group>

        <Form.Group controlId="formCreatedBy">
          <Form.Label>Created By</Form.Label>
          <Form.Control
            type="text"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTakenBy">
          <Form.Label>Assign To</Form.Label>
          <StudentDropDown
            selectedValue={takenBy}
            onSelect={(value) => setTakenBy(value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Absent">Absent</option>
            <option value="Taken">Taken</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant="primary"
          className="mt-3 btn-lg btn btn-block"
          onClick={handleCreateExamInstance}
        >
          Create Exam Instance
        </Button>

        {message && (
          <Alert variant={isSuccess ? "success" : "danger"} className="mt-3">
            {message}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default CreateExamInstance;
