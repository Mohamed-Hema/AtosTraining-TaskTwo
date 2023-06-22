import React, { useState, useEffect } from "react";
import { ListGroup, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExamDetails = () => {
  const { id } = useParams();

  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getexams/" + id
        );
        const examsData = response.data;
        response.data.examDefinition.questions.map((id) => {
          const fetchQuestions = async () => {
            try {
              const response = await axios.get(
                "http://localhost:3000/api/questions/" + id
              );
              setQuestions((prev) => {
                const newQuestions = [...prev];
                const exist = newQuestions.find(
                  (q) => q.name === response.data.name
                );
                if (!exist) {
                  newQuestions.push(response.data);
                }
                return [...newQuestions];
              });
            } catch (error) {
              console.error("Error fetching questions:", error);
            }
          };

          fetchQuestions();
        });

        setExam(examsData);
        console.log(examsData);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleAnswerSelect = (questionId, answerId) => {
    // Add your logic here to handle the selection of answers
    console.log(`Question ID: ${questionId}, Answer ID: ${answerId}`);
  };

  return (
    <div>
      <h1 className="text-primary">Exam Details</h1>
      <h2 className="text-info">Exam Name: {exam?.examDefinition?.name}</h2>
      <p className="text-info">Exam ID: {exam?.examDefinition?.id}</p>
      <h3 className="text-secondary">Questions:</h3>
      <ul className="list-group">
        {questions?.length &&
          questions.map((question) => (
            <li key={question._id} className="list-group-item">
              <Card>
                <Card.Body>
                  <Card.Title className="text-primary">
                    {question.name}
                  </Card.Title>
                  <ul className="list-group">
                    {question.answers.map((answer) => (
                      <li
                        key={answer._id}
                        className={`list-group-item ${
                          answer.selected ? "active" : ""
                        }`}
                      >
                        <Button
                          variant="link"
                          onClick={() =>
                            handleAnswerSelect(question._id, answer._id)
                          }
                        >
                          {answer.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExamDetails;
