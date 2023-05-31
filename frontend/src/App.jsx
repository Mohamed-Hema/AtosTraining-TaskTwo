import Protected from "./components/Protected";
import Public from "./components/Public";
import useAuth from "./hooks/useAuth";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateExam from './components/CreateExam';
import Exams from './components/Exams';

const App = () => {
  const isLogin = useAuth();

  return (
    isLogin ?
    <>
       <Router>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/exams" element={<Exams />} />
      </Routes>
    </Router>
      </>
    : <Public />
  );
}

export default App;
