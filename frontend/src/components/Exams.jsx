import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams data from the backend when the component mounts
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getexams");
        const examsData = response.data;
        setExams(examsData);
      } catch (error) {
        console.log("Failed to fetch exams:", error);
        // Handle error scenario, display error message, etc.
      }
    };

    fetchExams();
  }, []);

  const handleExamClick = (examId) => {
    navigate(`/exams/${examId}`);
  };

  return (
    <div>
      <h1 className="text-center">Exams</h1>
      <Row className="justify-content-center">
        {exams.map((exam) => (
          <Col key={exam.id} md={3} className="mb-4">
            <Button
              variant="primary"
              className="mt-3"
              block
              onClick={() => handleExamClick(exam.id)}
            >
              {exam.name}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exams;
