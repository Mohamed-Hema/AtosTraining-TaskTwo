import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import CreateExamDefinition from "./components/CreateExamDefinition";
import Exams from "./components/TeacherExams";
import HomePage from "./pages/HomePage";
import CreateExamInstance from "./components/CreateExamInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import ExamDetails from "./components/ExamDetails";
import TakeExam from "./components/TakeExam";
import StudentExams from "./components/StudentExams";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const App = () => {
  const [isLogin, token] = useAuth();

  useEffect(() => {
    // Access the token or perform actions based on login status
    console.log("isLogin:", isLogin);
    console.log("token:", token);
  }, [isLogin, token]);

  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-exam" element={<CreateExamDefinition />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/take-exam/:id" element={<TakeExam />} />
            <Route
              path="/create-exam-instance"
              element={<CreateExamInstance />}
            />
            <Route path="/exams/:id" element={<ExamDetails />} />
            <Route path="/studentexams" element={<StudentExams />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
