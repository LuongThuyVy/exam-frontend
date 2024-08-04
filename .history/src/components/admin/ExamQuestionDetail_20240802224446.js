import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function QuestionsPage() {
  const { id } = useParams(); 
  const [examQuestions, setExamQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());

  useEffect(() => {
    // Fetch exam questions
    axios.get(`http://localhost:8000/api/exam-detail/${id}`)
      .then(response => setExamQuestions(response.data))
      .catch(error => console.error('Error fetching exam questions:', error));

    // Fetch all questions
    axios.get('http://localhost:8000/api/questions')
      .then(response => setAllQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
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

  const handleAddQuestions = () => {
    // Implement the API call to add questions to the exam
    const questionsToAdd = Array.from(selectedQuestions);
    axios.post(`http://localhost:8000/api/exam-questions/add`, {
      examShiftId: id,
      questionIds: questionsToAdd
    })
    .then(response => {
      console.log('Questions added:', response.data);
      setSelectedQuestions(new Set());
      // Optionally refresh the exam questions list
    })
    .catch(error => console.error('Error adding questions:', error));
  };

  return (
    <Container>
      <Row>
        {/* <Col md={6}>
          <h3>Exam Questions</h3>
          {examQuestions.map(q => (
            <Card key={q.Id} className="mb-3">
              <Card.Body>
                <Card.Title>{q.question_answer.Content}</Card.Title>
                <Card.Text>Difficulty: {q.question_answer.Difficulty}</Card.Text>
                {/* Display other question details if needed */}
              </Card.Body>
            </Card>
          ))}
        </Col> */}
        <Col md={6}>
          <h3>All Questions</h3>
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

<Col md={6}>
          <h3>Exam Questions</h3>
          {examQuestions.map(q => (
            <Card key={q.Id} className="mb-3">
              <Card.Body>
                <Card.Title>{q.question_answer.Content}</Card.Title>
                <Card.Text>Difficulty: {q.question_answer.Difficulty}</Card.Text>
                {/* Display other question details if needed */}
              </Card.Body>
            </Card>
          ))}
        </Col>
          <Button variant="primary" onClick={handleAddQuestions}>Add Selected Questions to Exam</Button>

          
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionsPage;
// function Contact(){
//     return(
//         <div>
//             <h1>Contact</h1>
            
//         </div>
//     )
// }
// export default Contact;