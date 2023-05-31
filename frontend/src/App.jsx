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
      <Router>
        <Routes>
          <Route exact path="/exams" component={Protected} />
          <Route path="/create-exam" component={CreateExam} />
          <Route path="/exams" component={Exams} />
        </Routes>
      </Router>
    : <Public />
  );
}

export default App;
