import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftList = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExamShift, setSelectedExamShift] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ Name: '', StartTime: '', EndTime: '', ExamId: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const [examShiftsResponse, examsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/exam-shifts'),
          axios.get('http://localhost:8000/api/exams'),
        ]);

        setExamShifts(examShiftsResponse.data);
        setExams(examsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleShowDetails = (examShift) => {
    if (examShift) {
      setSelectedExamShift(examShift);
      setFormData({
        Name: examShift.Name,
        StartTime: examShift.StartTime,
        EndTime: examShift.EndTime,
        ExamId: examShift.ExamId,
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedExamShift(null);
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedExamShift) {
        await axios.put(`http://localhost:8000/api/exam-shifts/${selectedExamShift.Id}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/exam-shifts', formData);
      }
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
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
              <td>{shift.exam?.Name}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowDetails(shift)}>
                  View/Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedExamShift ? 'Edit Exam Shift' : 'Add Exam Shift'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="Name"
                value={formData.Name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="StartTime"
                value={formData.StartTime}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="EndTime"
                value={formData.EndTime}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExamId">
              <Form.Label>Exam</Form.Label>
              <Form.Control
                as="select"
                name="ExamId"
                value={formData.ExamId}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Exam</option>
                {exams.map((exam) => (
                  <option key={exam.Id} value={exam.Id}>
                    {exam.Name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedExamShift ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExamShiftList;
