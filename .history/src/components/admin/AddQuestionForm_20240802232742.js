import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    Content: '',
    Difficulty: 'Easy',
    OptionA: '',
    OptionB: '',
    OptionC: '',
    OptionD: '',
    CorrectOption: 'A',
    SubjectId: '',
    GradeId: ''
  });
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Fetch questions
    axios.get('http://localhost:8000/api/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));

    // Fetch subjects
    axios.get('http://localhost:8000/api/subjects')
      .then(response => setSubjects(response.data))
      .catch(error => console.error('Error fetching subjects:', error));

    // Fetch grades
    axios.get('http://localhost:8000/api/grades')
      .then(response => setGrades(response.data))
      .catch(error => console.error('Error fetching grades:', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/questions', formData)
      .then(response => {
        console.log('Question added:', response.data);
        setQuestions([...questions, response.data]);
        setFormData({
          Content: '',
          Difficulty: 'Easy',
          OptionA: '',
          OptionB: '',
          OptionC: '',
          OptionD: '',
          CorrectOption: 'A',
          SubjectId: '',
          GradeId: ''
        });
      })
      .catch(error => console.error('Error adding question:', error));
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h3>All Questions</h3>
          {questions.map(q => (
            <Card key={q.id} className="mb-3">
              <Card.Body>
                <Card.Title>{q.Content}</Card.Title>
                <Card.Text>Difficulty: {q.Difficulty}</Card.Text>
                <Card.Text>Option A: {q.OptionA}</Card.Text>
                <Card.Text>Option B: {q.OptionB}</Card.Text>
                {q.OptionC && <Card.Text>Option C: {q.OptionC}</Card.Text>}
                {q.OptionD && <Card.Text>Option D: {q.OptionD}</Card.Text>}
                <Card.Text>Correct Option: {q.CorrectOption}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={6}>
          <h3>Add New Question</h3>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="Content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                name="Content"
                value={formData.Content}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="Difficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                as="select"
                name="Difficulty"
                value={formData.Difficulty}
                onChange={handleInputChange}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="OptionA">
              <Form.Label>Option A</Form.Label>
              <Form.Control
                type="text"
                name="OptionA"
                value={formData.OptionA}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="OptionB">
              <Form.Label>Option B</Form.Label>
              <Form.Control
                type="text"
                name="OptionB"
                value={formData.OptionB}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="OptionC">
              <Form.Label>Option C</Form.Label>
              <Form.Control
                type="text"
                name="OptionC"
                value={formData.OptionC}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="OptionD">
              <Form.Label>Option D</Form.Label>
              <Form.Control
                type="text"
                name="OptionD"
                value={formData.OptionD}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="CorrectOption">
              <Form.Label>Correct Option</Form.Label>
              <Form.Control
                as="select"
                name="CorrectOption"
                value={formData.CorrectOption}
                onChange={handleInputChange}
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="SubjectId">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                name="SubjectId"
                value={formData.SubjectId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.Id} value={subject.Id}>{subject.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="GradeId">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="GradeId"
                value={formData.GradeId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Grade</option>
                {grades.map(grade => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Add Question</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionsPage;
