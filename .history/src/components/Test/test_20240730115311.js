import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, Card, Form } from 'react-bootstrap';
import './Test.css'; // Import custom CSS

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // To store selected answers

  useEffect(() => {
    const examId = localStorage.getItem('examId');
    const duration = localStorage.getItem('duration');

    if (examId && duration) {
      const totalTime = parseInt(duration, 10) * 60; // Convert minutes to seconds
      setRemainingTime(totalTime);

      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/exam-questions/${examId}`);
          setQuestions(response.data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();

      const timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log('Submitting answers:', answers);
    // Add logic for submitting answers
  };

  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const renderQuestionStatus = () => {
    const totalQuestions = questions.length;
    const rows = [];
    const numColumns = 5; // Number of columns in the table

    for (let i = 0; i < totalQuestions; i += numColumns) {
      const columns = [];
      for (let j = 0; j < numColumns; j++) {
        const questionIndex = i + j;
        if (questionIndex >= totalQuestions) break;
        
        const question = questions[questionIndex];
        const isAnswered = answers[question.Id] !== undefined;
        const cellClass = isAnswered ? 'bg-success' : 'bg-danger';
        const isCurrent = questionIndex === currentQuestion;
        const currentQuestionClass = isCurrent ? 'current-question' : '';

        columns.push(
          <td 
            key={j} 
            className={`p-2 text-center ${cellClass} ${currentQuestionClass}`}
            onClick={() => handleQuestionClick(questionIndex)} // Add click handler
          >
            {questionIndex + 1}
          </td>
        );
      }
      rows.push(<tr key={i}>{columns}</tr>);
    }

    return (
      <table className="table table-bordered table-striped question-status-table">
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <h1 className="mb-4 text-center">Test Page</h1>
          {questions.length > 0 ? (
            <Card>
              <Card.Body>
                <h3>Question {currentQuestion + 1}</h3>
                <p>{questions[currentQuestion].question_answer.Content}</p>
                <Form>
                  <Form.Check
                    type="radio"
                    id={`optionA-${questions[currentQuestion].Id}`}
                    label={questions[currentQuestion].question_answer.OptionA}
                    name={`question-${questions[currentQuestion].Id}`}
                    value="A"
                    checked={answers[questions[currentQuestion].Id] === 'A'}
                    onChange={() => handleOptionChange(questions[currentQuestion].Id, 'A')}
                  />
                  <Form.Check
                    type="radio"
                    id={`optionB-${questions[currentQuestion].Id}`}
                    label={questions[currentQuestion].question_answer.OptionB}
                    name={`question-${questions[currentQuestion].Id}`}
                    value="B"
                    checked={answers[questions[currentQuestion].Id] === 'B'}
                    onChange={() => handleOptionChange(questions[currentQuestion].Id, 'B')}
                  />
                  <Form.Check
                    type="radio"
                    id={`optionC-${questions[currentQuestion].Id}`}
                    label={questions[currentQuestion].question_answer.OptionC}
                    name={`question-${questions[currentQuestion].Id}`}
                    value="C"
                    checked={answers[questions[currentQuestion].Id] === 'C'}
                    onChange={() => handleOptionChange(questions[currentQuestion].Id, 'C')}
                  />
                  <Form.Check
                    type="radio"
                    id={`optionD-${questions[currentQuestion].Id}`}
                    label={questions[currentQuestion].question_answer.OptionD}
                    name={`question-${questions[currentQuestion].Id}`}
                    value="D"
                    checked={answers[questions[currentQuestion].Id] === 'D'}
                    onChange={() => handleOptionChange(questions[currentQuestion].Id, 'D')}
                  />
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="me-2"
                >
                  Previous
                </Button>
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="me-2"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={currentQuestion >= questions.length - 1}
                  >
                    Next
                  </Button>
                )}
              </Card.Footer>
            </Card>
          ) : (
            <Alert variant="info">Loading questions...</Alert>
          )}
        </div>
        <div className="question-status-container">
          <div className="remaining-time text-center">
            {remainingTime > 0 ? (
              <div className="text-center mb-4">
                <h3>Remaining Time:</h3>
                <h4> {formatTime(remainingTime)}</h4>
              </div>
            ) : (
              <Alert variant="warning">Time is up!</Alert>
            )}
          </div>
          {renderQuestionStatus()}
        </div>
      </div>
    </Container>
  );
};

export default Test;
