import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftList = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [exams, setExams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newShift, setNewShift] = useState({
    Name: '',
    StartTime: '',
    EndTime: '',
    ExamId: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [shiftsResponse, examsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/exam-shifts'),
          axios.get('http://localhost:8000/api/exams')
        ]);

        setExamShifts(shiftsResponse.data);
        setExams(examsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/exam-shifts', newShift);
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding new shift:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>Add Exam Shift</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Exam</th>
          </tr>
        </thead>
        <tbody>
          {examShifts.map((shift) => (
            <tr key={shift.Id}>
              <td>{shift.Name}</td>
              <td>{new Date(shift.StartTime).toLocaleString()}</td>
              <td>{new Date(shift.EndTime).toLocaleString()}</td>
              <td>{shift.exam ? shift.exam.Name : 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exam Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={newShift.Name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="StartTime"
                value={newShift.StartTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="EndTime"
                value={newShift.EndTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExam">
              <Form.Label>Exam</Form.Label>
              <Form.Control
                as="select"
                name="ExamId"
                value={newShift.ExamId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an exam</option>
                {exams.map((exam) => (
                  <option key={exam.Id} value={exam.Id}>
                    {exam.Name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Shift
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExamShiftList;
