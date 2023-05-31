import React from 'react';
import { Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Welcome to Exam Engine!</h1>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="primary" size="lg" className="mr-3">
          Create Exam
        </Button>
        <Button variant="secondary" size="lg">
          Take Exam
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
