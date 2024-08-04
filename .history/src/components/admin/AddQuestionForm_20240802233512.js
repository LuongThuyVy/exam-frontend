import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

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
    if (editingQuestion) {
      axios.put(`http://localhost:8000/api/questions/${editingQuestion.id}`, formData)
        .then(response => {
          console.log('Question updated:', response.data);
          setQuestions(questions.map(q => q.id === editingQuestion.id ? response.data : q));
          setShowModal(false);
          setEditingQuestion(null);
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
        .catch(error => console.error('Error updating question:', error));
    } else {
      axios.post('http://localhost:8000/api/questions', formData)
        .then(response => {
          console.log('Question added:', response.data);
          setQuestions([...questions, response.data]);
          setShowModal(false);
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
    }
  };

  const handleEditClick = (question) => {
    setEditingQuestion(question);
    setFormData({
      Content: question.Content,
      Difficulty: question.Difficulty,
      OptionA: question.OptionA,
      OptionB: question.OptionB,
      OptionC: question.OptionC,
      OptionD: question.OptionD,
      CorrectOption: question.CorrectOption,
      SubjectId: question.SubjectGradeId,
      GradeId: question.GradeId
    });
    setShowModal(true);
  };

  const handleDeleteClick = (questionId) => {
    axios.delete(`http://localhost:8000/api/questions/${questionId}`)
      .then(response => {
        console.log('Question deleted:', response.data);
        setQuestions(questions.filter(q => q.id !== questionId));
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>All Questions</h3>
          <Button variant="primary" onClick={() => setShowModal(true)}>Add New Question</Button>
          {questions.map(q => (
            <Card key={q.id} className="mb-3">
              <Card.Body>
                <Card.Title>
                  {q.Content}
                  <div style={{ float: 'right' }}>
                    <FaEdit onClick={() => handleEditClick(q)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <FaTrash onClick={() => handleDeleteClick(q.id)} style={{ cursor: 'pointer' }} />
                  </div>
                </Card.Title>
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
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingQuestion ? 'Edit Question' : 'Add New Question'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  <option key={subject.Id} value={subject.Id}>{subject.Name}</option>
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
            <Button variant="primary" type="submit">{editingQuestion ? 'Update' : 'Add'} Question</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default QuestionsPage;
