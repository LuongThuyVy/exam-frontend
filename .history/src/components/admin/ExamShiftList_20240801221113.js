import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftManagement = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    StartTime: '',
    EndTime: '',
    ExamId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchExamShifts();
  }, []);

  const fetchExamShifts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
    } catch (error) {
      console.error('Error fetching exam shifts:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/exam-shifts', formData);
      setSuccess('Exam shift added successfully!');
      setError('');
      setFormData({
        Name: '',
        StartTime: '',
        EndTime: '',
        ExamId: '',
      });
      fetchExamShifts(); // Refresh the list of exam shifts
    } catch (error) {
      console.error('Error adding exam shift:', error);
      setError('An error occurred while adding the exam shift. Please try again.');
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Exam Shift Management</h1>
      <Button className="mb-3" onClick={handleShowModal}>Add New Exam Shift</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Exam ID</th>
          </tr>
        </thead>
        <tbody>
          {examShifts.map(examShift => (
            <tr key={examShift.id}>
              <td>{examShift.id}</td>
              <td>{examShift.name}</td>
              <td>{new Date(examShift.startTime).toLocaleString()}</td>
              <td>{new Date(examShift.endTime).toLocaleString()}</td>
              <td>{examShift.examId}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding Exam Shift */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exam Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="StartTime"
                value={formData.StartTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="EndTime"
                value={formData.EndTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExamId">
              <Form.Label>Exam ID</Form.Label>
              <Form.Control
                type="number"
                name="ExamId"
                value={formData.ExamId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Exam Shift
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExamShiftManagement;
