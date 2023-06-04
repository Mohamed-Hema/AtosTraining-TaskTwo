import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ExamDetail = () => {
  const { id } = useParams();
  const [examDetails, setExamDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [takenBy, setTakenBy] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getexaminstance/${id}`);
        const data = response.data;
        console.log(data);
        setExamDetails(data);
        setStatus(data.status);
        setTakenBy(data.takenBy);
        setCreatedBy(data.createdBy);
      } catch (error) {
        console.error('Error fetching exam details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTakenByChange = (event) => {
    setTakenBy(event.target.value);
  };

  const handleCreatedByChange = (event) => {
    setCreatedBy(event.target.value);
  };

  const handleExamNameChange = (event) => {
    setExamDetails({ ...examDetails, examName: event.target.value });
  };

  const handleQuestionsChange = (event) => {
    setExamDetails({ ...examDetails, questions: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update exam instance
      const examInstanceResponse = await axios.post(`http://localhost:5000/api/create-exam-instance/${id}`, {
        status,
        takenBy,
        createdBy,
      });
      console.log('Exam Instance Updated Successfully:', examInstanceResponse.data);

      // Update exam definition
      const examDefinitionResponse = await axios.post('http://localhost:5000/api/create-exam-definition/', {
        examName: examDetails.examName,
        questions: examDetails.questions,
      });
      console.log('Exam Definition Updated Successfully:', examDefinitionResponse.data);
    } catch (error) {
      console.error('Error updating exam details:', error);
    }
  };

  if (!examDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Exam Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="examName">Exam Name:</label>
          <input
            type="text"
            id="examName"
            className="form-control"
            value={examDetails.examName}
            onChange={handleExamNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="questions">Questions:</label>
          <textarea
            id="questions"
            className="form-control"
            value={examDetails.questions}
            onChange={handleQuestionsChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" className="form-control" value={status} onChange={handleStatusChange}>
            <option value="">Choose status</option>
            <option value="absent">Absent</option>
            <option value="taken">Taken</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="takenBy">Taken By:</label>
          <input type="text" id="takenBy" className="form-control" value={takenBy} onChange={handleTakenByChange} />
        </div>
        <div className="form-group">
          <label htmlFor="createdBy">Created By:</label>
          <input
            type="text"
            id="createdBy"
            className="form-control"
            value={createdBy}
            onChange={handleCreatedByChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ExamDetail;
