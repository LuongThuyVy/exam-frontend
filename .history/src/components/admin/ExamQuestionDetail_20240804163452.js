import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function QuestionsPage() {
  const { id } = useParams();
  const [examQuestions, setExamQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());

  useEffect(() => {
    const fetchExamQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/exam-detail/${id}`);
        setExamQuestions(response.data);
      } catch (error) {
        console.error('Error fetching exam questions:', error);
      }
    };

    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/questions/condition/${id}`);
        setAllQuestions(response.data);
      } catch (error) {
        console.error('Error fetching all questions:', error);
      }
    };

    fetchExamQuestions();
    fetchAllQuestions();
  }, [id]);

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions(prevState => {
      const newState = new Set(prevState);
      if (newState.has(questionId)) {
        newState.delete(questionId);
      } else {
        newState.add(questionId);
      }
      return newState;
    });
  };

  const handleAddQuestions = async () => {
    const questionsToAdd = Array.from(selectedQuestions);
    try {
      await axios.post(`http://localhost:8000/api/exam-questions/add`, {
        examId: id,
        questionIds: questionsToAdd
      });
      setSelectedQuestions(new Set());
      // Refresh the exam questions list
      const response = await axios.get(`http://localhost:8000/api/exam-detail/${id}`);
      setExamQuestions(response.data);
    } catch (error) {
      console.error('Error adding questions:', error);
    }
  };
  const handleDeleteQuestion = async (questionId) => {
    try {
      // Xóa câu hỏi khỏi bài kiểm tra
      await axios.delete(`http://localhost:8000/api/exam-questions/${questionId}`);
      
      // Làm mới danh sách câu hỏi của bài kiểm tra
      const response = await axios.get(`http://localhost:8000/api/exam-detail/${id}`);
      setExamQuestions(response.data);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };
  

  return (
    <Container>
      <h1 className='text-center'>Exam details</h1>
      <Row>
        <Col md={6}>
          <h5>All Questions</h5>
          {allQuestions.map(q => (
            <Card key={q.Id} className="mb-3">
              <Card.Body>
                <Card.Title>{q.Content}</Card.Title>
                <Card.Text>Difficulty: {q.Difficulty}</Card.Text>
                <Form.Check
                  type="checkbox"
                  label="Select"
                  checked={selectedQuestions.has(q.Id)}
                  onChange={() => handleQuestionSelect(q.Id)}
                />
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={6}>
          <h3>Exam Questions</h3>
          {examQuestions.map(q => (
            <Card key={q.Id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={10}>
                    <Card.Title>{q.question_answer.Content}</Card.Title>
                    <Card.Text>Difficulty: {q.question_answer.Difficulty}</Card.Text>
                  </Col>
                  <Col md={2} className="text-right">
                    <FaTrash
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => handleDeleteQuestion(q.Id)}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <Button variant="primary" onClick={handleAddQuestions}>Add Selected Questions to Exam</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionsPage;
