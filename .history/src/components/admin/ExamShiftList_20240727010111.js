import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftList = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newShift, setNewShift] = useState({
    Name: '',
    StartTime: '',
    EndTime: '',
    ExamId: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch exam shifts
        const shiftsResponse = await axios.get('http://localhost:8000/api/exam-shifts');
        setExamShifts(shiftsResponse.data);

        // Fetch exams
        const examsResponse = await axios.get('http://localhost:8000/api/exams');
        setExams(examsResponse.data);

        // Log fetched data to verify
        console.log('Fetched exams:', examsResponse.data);
        console.log('Fetched exam shifts:', shiftsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleShowDetails = (shift) => {
    setSelectedShift(shift);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedShift(null);
    setShowModal(false);
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShift({
      ...newShift,
      [name]: value
    });
  };

  const handleAddShift = async () => {
    try {
      await axios.post('http://localhost:8000/api/exam-shifts', newShift);
      // Refresh the list after adding a new shift
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
      setShowAddModal(false);
      setNewShift({
        Name: '',
        StartTime: '',
        EndTime: '',
        ExamId: '',
      });
    } catch (error) {
      console.error('Error adding shift:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowAddModal}>
        Add Exam Shift
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Exam</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examShifts.map((shift) => (
            <tr key={shift.Id}>
              <td>{shift.Name}</td>
              <td>{shift.StartTime}</td>
              <td>{shift.EndTime}</td>
              <td>{exams.find((exam) => exam.id === shift.ExamId)?.name || 'Unknown'}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleShowDetails(shift)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Exam Shift Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedShift ? (
            <div>
              <p><strong>Name:</strong> {selectedShift.Name}</p>
              <p><strong>Start Time:</strong> {selectedShift.StartTime}</p>
              <p><strong>End Time:</strong> {selectedShift.EndTime}</p>
              <p><strong>Exam:</strong> {exams.find((exam) => exam.id === selectedShift.ExamId)?.name || 'Unknown'}</p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exam Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter shift name"
                name="Name"
                value={newShift.Name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="StartTime"
                value={newShift.StartTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="EndTime"
                value={newShift.EndTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formExam">
              <Form.Label>Ex
