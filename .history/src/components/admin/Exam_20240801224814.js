import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentExam, setCurrentExam] = useState({
    id: '',
    name: '',
    description: '',
    duration: '',
    totalQuestions: '',
    subjectGradeId: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExams();
    fetchSubjectsAndGrades();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/exams');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchSubjectsAndGrades = async () => {
    try {
      const [subjectsResponse, gradesResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/subjects'),
        axios.get('http://localhost:8000/api/grades'),
      ]);
      setSubjects(subjectsResponse.data);
      setGrades(gradesResponse.data);
    } catch (error) {
      console.error('Error fetching subjects or grades:', error);
    }
  };

  const handleShowModal = (type, exam = {}) => {
    setModalType(type);
    setCurrentExam({
      ...exam,
      subjectGradeId: exam.subjectGradeId || '',
    });
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentExam({
      id: '',
      name: '',
      description: '',
      duration: '',
      totalQuestions: '',
      subjectGradeId: '',
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExam({ ...currentExam, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'Add') {
        await axios.post('http://localhost:8000/api/exams', currentExam);
      } else if (modalType === 'Edit') {
        await axios.put(`http://localhost:8000/api/exams/${currentExam.id}`, currentExam);
      }
      fetchExams(); // Refresh the exams list
      handleCloseModal();
    } catch (error) {
      console.error('Error saving exam:', error);
      setError('An error occurred while saving the exam. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/exams/${id}`);
      fetchExams(); // Refresh the exams list
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Exam Management</h1>
      <Button className="mb-3" onClick={() => handleShowModal('Add')}>Add New Exam</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Total Questions</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(exam => (
            <tr key={exam.id}>
              <td>{exam.id}</td>
              <td>{exam.name}</td>
              <td>{exam.description}</td>
              <td>{exam.duration}</td>
              <td>{exam.totalQuestions}</td>
              <td>{exam.subject ? exam.subject.name : ''}</td>
              <td>{exam.grade ? exam.grade.name : ''}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal('Edit', exam)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(exam.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType} Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentExam.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentExam.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={currentExam.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTotalQuestions">
              <Form.Label>Total Questions</Form.Label>
              <Form.Control
                type="number"
                name="totalQuestions"
                value={currentExam.totalQuestions}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                name="subjectGradeId"
                value={currentExam.subjectGradeId}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.Id} value={subject.Id}>{subject.Name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="subjectGradeId"
                value={currentExam.subjectGradeId}
                onChange={handleChange}
                required
              >
                <option value="">Select Grade</option>
                {grades.map(grade => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExamManagement;
