import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateExam = () => {
    navigate("/create-exam");
  };

  const handleTakeExam = () => {
    navigate("/exams");
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Welcome to Exam Engine!</h1>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="primary"
          size="lg"
          className="mr-3"
          onClick={handleCreateExam}
        >
          Create Exam
        </Button>
        <Button variant="secondary" size="lg" onClick={handleTakeExam}>
          Take Exam
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
