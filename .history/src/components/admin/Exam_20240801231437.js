import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjectGrades, setSubjectGrades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentExam, setCurrentExam] = useState({
    id: '',
    Name: '',
    Description: '',
    Duration: '',
    TotalQuestions: '',
    SubjectId: '',
    GradeId: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExams();
    fetchSubjects();
    fetchGrades();
    fetchSubjectGrades();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/exams');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error.response ? error.response.data : error.message);
      setError('Error fetching exams. Please try again.');
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error.response ? error.response.data : error.message);
      setError('Error fetching subjects. Please try again.');
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/grades');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error.response ? error.response.data : error.message);
      setError('Error fetching grades. Please try again.');
    }
  };

  const fetchSubjectGrades = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/subject-grades');
      setSubjectGrades(response.data);
    } catch (error) {
      console.error('Error fetching subject grades:', error.response ? error.response.data : error.message);
      setError('Error fetching subject grades. Please try again.');
    }
  };

  const handleShowModal = (type, exam = {}) => {
    setModalType(type);
    setCurrentExam({
      id: exam.id || '',
      Name: exam.name || '',
      Description: exam.description || '',
      Duration: exam.duration || '',
      TotalQuestions: exam.totalQuestions || '',
      SubjectId: exam.subject ? exam.subject.id : '',
      GradeId: exam.grade ? exam.grade.id : '',
    });
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentExam({
      id: '',
      Name: '',
      Description: '',
      Duration: '',
      TotalQuestions: '',
      SubjectId: '',
      GradeId: '',
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
      const subjectGradeId = subjectGrades.find(
        sg => sg.SubjectId === parseInt(currentExam.SubjectId) && sg.GradeId === parseInt(currentExam.GradeId)
      )?.Id;

      if (!subjectGradeId) {
        setError('Invalid Subject and Grade combination. Please try again.');
        return;
      }

      const examData = {
        Name: currentExam.Name,
        Description: currentExam.Description,
        Duration: parseInt(currentExam.Duration),
        TotalQuestions: parseInt(currentExam.TotalQuestions),
        SubjectGradeId: subjectGradeId,
      };

      if (modalType === 'Add') {
        await axios.post('http://localhost:8000/api/exams', examData);
      } else if (modalType === 'Edit') {
        await axios.put(`http://localhost:8000/api/exams/${currentExam.id}`, examData);
      }
      fetchExams();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving exam:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        setError(Object.values(validationErrors).flat().join(', '));
      } else {
        setError('An error occurred while saving the exam. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/exams/${id}`);
      fetchExams();
    } catch (error) {
      console.error('Error deleting exam:', error.response ? error.response.data : error.message);
      setError('An error occurred while deleting the exam. Please try again.');
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
                name="Name"
                value={currentExam.Name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={currentExam.Description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                name="Duration"
                value={currentExam.Duration}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTotalQuestions">
              <Form.Label>Total Questions</Form.Label>
              <Form.Control
                type="number"
                name="TotalQuestions"
                value={currentExam.TotalQuestions}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                name="SubjectId"
                value={currentExam.SubjectId}
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
                name="GradeId"
                value={currentExam.GradeId}
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