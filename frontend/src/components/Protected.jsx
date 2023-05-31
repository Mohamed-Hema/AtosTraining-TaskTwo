import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Protected = () => {
  return (
    <div className="text-center">
      <h1>Protected</h1>
      <LinkContainer to="/create-exam">
        <Button variant="primary" className="m-3">Create Exam</Button>
      </LinkContainer>
      <LinkContainer to="/exams">
        <Button variant="primary" className="m-3">Exams</Button>
      </LinkContainer>
    </div>
  );
};

export default Protected;
