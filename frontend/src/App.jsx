import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import CreateExamDefinition from './components/CreateExamDefinition';
import Exams from './components/TeacherExams';
import HomePage from './pages/HomePage';
import Public from './components/Public';
import CreateExamInstance from './components/CreateExamInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamDetail from './components/ExamDetail';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-exam" element={<CreateExamDefinition />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/public" element={<Public />} />
          <Route path="/create-exam-instance" element={<CreateExamInstance />} />
          <Route path="/exam/:id" element={<ExamDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
