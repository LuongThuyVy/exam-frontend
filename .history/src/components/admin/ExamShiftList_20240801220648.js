import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddExamShift = ({ showModal, handleClose }) => {
  const [formData, setFormData] = useState({
    Name: '',
    StartTime: '',
    EndTime: '',
    ExamId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      // Optionally, you can refresh the list of exam shifts here
    } catch (error) {
      console.error('Error adding exam shift:', error);
      setError('An error occurred while adding the exam shift. Please try again.');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
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
  );
};

export default AddExamShift;
