import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
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
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsResponse, subjectsResponse, gradesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/questions'),
          axios.get('http://localhost:8000/api/subjects'),
          axios.get('http://localhost:8000/api/grades')
        ]);

        setQuestions(questionsResponse.data);
        setSubjects(subjectsResponse.data);
        setGrades(gradesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
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
    setEditingQuestionId(null);
  };

  const handleShowConfirmDelete = (questionId) => {
    setQuestionToDelete(questionId);
    setShowConfirmDelete(true);
  };
  
  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setQuestionToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuestionId) {
        await axios.put(`http://localhost:8000/api/questions/${editingQuestionId}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/questions', formData);
      }
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/questions');
      setQuestions(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error handling question:', error);
      setError('Error saving data. Please try again later.');
    }
  };

  const handleEdit = (question) => {
    setEditingQuestionId(question.Id);
    setFormData({
      Content: question.Content,
      Difficulty: question.Difficulty,
      OptionA: question.OptionA,
      OptionB: question.OptionB,
      OptionC: question.OptionC,
      OptionD: question.OptionD,
      CorrectOption: question.CorrectOption,
      SubjectId: question.SubjectId || '',
      GradeId: question.GradeId || ''
    });
    handleShowModal();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/questions/${questionToDelete}`);
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/questions');
      setQuestions(response.data);
      handleCloseConfirmDelete();
    } catch (error) {
      console.error('Error deleting question:', error);
      setError('Error deleting data. Please try again later.');
    }
  };

  return (
    <>
      <h1 className='text-center'>Question Management</h1>
      <Button variant="primary" onClick={handleShowModal} className='mb-2'><FaPlus /> Add Question</Button>
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Content</th>
            <th>Difficulty</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Option C</th>
            <th>Option D</th>
            <th>Correct Option</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.Id}>
              <td>{question.Id}</td>
              <td>{question.Content}</td>
              <td>{question.Difficulty}</td>
              <td>{question.OptionA}</td>
              <td>{question.OptionB}</td>
              <td>{question.OptionC || 'N/A'}</td>
              <td>{question.OptionD || 'N/A'}</td>
              <td>{question.CorrectOption}</td>
              <td>{question.Subject ? question.Subject.Name : 'Unknown'}</td>
              <td>{question.Grade ? question.Grade.Name : 'Unknown'}</td>
              <td>
                <Button variant="" onClick={() => handleEdit(question)}><FaEdit className='text-warning'/></Button>
                <Button variant="" onClick={() => handleShowConfirmDelete(question.Id)}><FaTrash className='text-danger'/></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingQuestionId ? 'Edit Question' : 'Add Question'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
                // 
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.Name}
                  </option>required
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
                // required
              >
                <option value="">Select a grade</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.Name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingQuestionId ? 'Update Question' : 'Add Question'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuestionsPage;
