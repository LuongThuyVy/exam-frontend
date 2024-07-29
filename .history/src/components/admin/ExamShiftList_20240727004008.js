import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftList = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    StartTime: '',
    EndTime: '',
    ExamId: ''
  });

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

  const handleShowModal = (shift = null) => {
    if (shift) {
      setEditMode(true);
      setFormData({
        Name: shift.Name,
        StartTime: shift.StartTime,
        EndTime: shift.EndTime,
        ExamId: shift.ExamId
      });
      setCurrentShift(shift);
    } else {
      setEditMode(false);
      setFormData({
        Name: '',
        StartTime: '',
        EndTime: '',
        ExamId: ''
      });
      setCurrentShift(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        // Update
        await axios.put(`http://localhost:8000/api/exam-shifts/${currentShift.Id}`, formData);
      } else {
        // Create
        await axios.post('http://localhost:8000/api/exam-shifts', formData);
      }
      fetchExamShifts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving exam shift:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/exam-shifts/${id}`);
      fetchExamShifts();
    } catch (error) {
      console.error('Error deleting exam shift:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => handleShowModal()}>
        Add New Shift
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Exam ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examShifts.map((shift) => (
            <tr key={shift.Id}>
              <td>{shift.Name}</td>
              <td>{new Date(shift.StartTime).toLocaleString()}</td>
              <td>{new Date(shift.EndTime).toLocaleString()}</td>
              <td>{shift.ExamId}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(shift)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(shift.Id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Shift' : 'Add Shift'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter shift name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="StartTime"
                value={formData.StartTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="EndTime"
                value={formData.EndTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formExamId">
              <Form.Label>Exam ID</Form.Label>
              <Form.Control
                type="number"
                name="ExamId"
                value={formData.ExamId}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExamShiftList;
