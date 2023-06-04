import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    navigate("/create-exam");
  };

  const handleStudentClick = () => {
    navigate("/exams");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-center mt-5">Who Are You?</h1>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="primary"
          size="lg"
          className="mr-3"
          onClick={handleTeacherClick}
        >
          Teacher
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleStudentClick}
        >
          Student
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
