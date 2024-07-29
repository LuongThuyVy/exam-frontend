import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa'; // Import icons from react-icons/fa
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
  const [editShift, setEditShift] = useState(null);

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
  const handleCloseModal = () => {
    setShowModal(false);
    setNewShift({ Name: '', StartTime: '', EndTime: '', ExamId: '' });
    setEditShift(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editShift) {
        // Update existing shift
        await axios.put(`http://localhost:8000/api/exam-shifts/${editShift.Id}`, newShift);
      } else {
        // Add new shift
        await axios.post('http://localhost:8000/api/exam-shifts', newShift);
      }
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error handling shift:', error);
    }
  };

  const handleEdit = (shift) => {
    setEditShift(shift);
    setNewShift({
      Name: shift.Name,
      StartTime: shift.StartTime,
      EndTime: shift.EndTime,
      ExamId: shift.ExamId
    });
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/exam-shifts/${id}`);
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
    } catch (error) {
      console.error('Error deleting shift:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        <FaPlus /> Add Exam Shift
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Exam</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {examShifts.map((shift) => (
            <tr key={shift.Id}>
              <td>{shift.Name}</td>
              <td>{new Date(shift.StartTime).toLocaleString()}</td>
              <td>{new Date(shift.EndTime).toLocaleString()}</td>
              <td>
                {exams.find(exam => exam.Id === shift.ExamId)?.Name || 'Unknown'}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(shift.Id)}
                  title="Delete"
                >
                  <FaTrash />
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(shift)}
                  title="Edit"
                >
                  <FaEdit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editShift ? 'Edit Exam Shift' : 'Add Exam Shift'}</Modal.Title>
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
              {editShift ? 'Update Shift' : 'Add Shift'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExamShiftList;
