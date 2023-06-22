import React, { useState, useEffect } from "react";
import { ListGroup, Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const TakeExam = () => {
  const { id } = useParams();

  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(60 * 60);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [passFailMessage, setPassFailMessage] = useState("");

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
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };

    fetchExams();
  }, []);

  // Timer Logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          // Add your logic for handling timer expiration here
          console.log("Timer expired");
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  const handleAnswerSelect = (questionId, answerId) => {
    setUserAnswers((prevUserAnswers) => {
      const prevAnswers = Array.isArray(prevUserAnswers[questionId])
        ? prevUserAnswers[questionId]
        : [];
      const updatedAnswers = [...prevAnswers, answerId];
      return {
        ...prevUserAnswers,
        [questionId]: updatedAnswers,
      };
    });

    const selectedQuestion = questions.find(
      (question) => question._id === questionId
    );
    if (selectedQuestion) {
      const selectedAnswer = selectedQuestion.answers.find(
        (answer) => answer._id === answerId
      );
      if (selectedAnswer) {
        setUserAnswers((prevUserAnswers) => ({
          ...prevUserAnswers,
          [questionId]: {
            answerId,
            value: selectedAnswer.name,
          },
        }));
        console.log(
          `Question ID: ${questionId}, Answer ID: ${answerId}, Answer Value: ${selectedAnswer.name}`
        );
      }
    }
  };

  const handleSubmit = async () => {
    console.log("Exam submitted");

    // Calculate score
    const totalQuestions = questions.length;
    let correctAnswers = 0;

    for (const question of questions) {
      const userAnswer = userAnswers[question._id] || [];
      console.log("userAnswer:", userAnswer);
      const response = await axios.get(
        `http://localhost:3000/api/questions/${question._id}`
      );
      const correctAnswer = response.data.correctAnswers;
      console.log("correctAnswers:", correctAnswer);

      if (correctAnswer.includes(userAnswer.value)) {
        correctAnswers++;
      }
    }

    const currentScore = (correctAnswers / totalQuestions) * 100;

    setScore(currentScore);

    setScore(currentScore);

    // Set pass/fail message
    if (currentScore >= 50) {
      setPassFailMessage("You passed!");
    } else {
      setPassFailMessage("You failed, please try again later.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <h4>
          Time Remaining: {Math.floor(timer / 60)}:{timer % 60}
        </h4>
      </div>
      <h1 className="text-primary">Take Exam</h1>
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
                  <Form>
                    {question.answers.map((answer) => (
                      <Form.Check
                        key={answer._id}
                        type="checkbox"
                        id={answer._id}
                        label={answer.name}
                        onChange={() =>
                          handleAnswerSelect(question._id, answer._id)
                        }
                      />
                    ))}
                  </Form>
                </Card.Body>
              </Card>
            </li>
          ))}
      </ul>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {score !== null && (
        <div>
          <h3>Score: {score}%</h3>
          <h4>{passFailMessage}</h4>
        </div>
      )}
    </div>
  );
};

export default TakeExam;
