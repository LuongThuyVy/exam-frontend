import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ExamShiftManager = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [exams, setExams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [newShift, setNewShift] = useState({
    Name: '',
    StartTime: '',
    EndTime: '',
    ExamId: ''
  });
  const [editShiftId, setEditShiftId] = useState(null);
  const [shiftToDelete, setShiftToDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shiftsResponse, examsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/exam-shifts'),
          axios.get('http://localhost:8000/api/exams')
        ]);

        setExamShifts(shiftsResponse.data);
        setExams(examsResponse.data);
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
    setNewShift({
      Name: '',
      StartTime: '',
      EndTime: '',
      ExamId: ''
    });
    setEditShiftId(null);
  };

  const handleShowConfirmDelete = (shiftId) => {
    setShiftToDelete(shiftId);
    setShowConfirmDelete(true);
  };
  
  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setShiftToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editShiftId) {
        await axios.put(`http://localhost:8000/api/exam-shifts/${editShiftId}`, newShift);
      } else {
        await axios.post('http://localhost:8000/api/exam-shifts', newShift);
      }
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error handling shift:', error);
      setError('Error saving data. Please try again later.');
    }
  };

  const handleEdit = (shift) => {
    setEditShiftId(shift.id);
    setNewShift({
      Name: shift.name,
      StartTime: shift.startTime,
      EndTime: shift.endTime,
      ExamId: shift.eId
    });
    handleShowModal();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/exam-shifts/${shiftToDelete}`);
      // Refresh the list
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
      handleCloseConfirmDelete();
    } catch (error) {
      console.error('Error deleting shift:', error);
      setError('Error deleting data. Please try again later.');
    }
  };

  return (
    <>
      <h1 className='text-center'>Exam Shift Management</h1>
      <Button variant="primary" onClick={handleShowModal} className='mb-2'><FaPlus /> Add Exam Shift</Button>
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Exam</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {examShifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.name}</td>
              <td>{new Date(shift.startTime).toLocaleString()}</td>
              <td>{new Date(shift.endTime).toLocaleString()}</td>
              <td>
                {shift.subjectgrade ? `${shift.subjectgrade.Name} - ${shift.subjectgrade.Description}` : 'Unknown'}
              </td>
              <td>
                {shift.subjectgrade.subject_grade && shift.subjectgrade.subject_grade.subject ? shift.subjectgrade.subject_grade.subject.Name : 'N/A'}
              </td>
              <td>
                {shift.subjectgrade.subject_grade && shift.subjectgrade.subject_grade.grade ? shift.subjectgrade.subject_grade.grade.Name : 'N/A'}
              </td>
              <td>
                <Button variant="" onClick={() => handleEdit(shift)}><FaEdit className='text-warning'/></Button>
                <Button variant="" onClick={() => handleShowConfirmDelete(shift.id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editShiftId ? 'Edit Exam Shift' : 'Add Exam Shift'}</Modal.Title>
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
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {editShiftId ? 'Update Shift' : 'Add Shift'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this exam shift?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleCloseConfirmDelete}>
            Cancel
          </Button>
          <Button variant="" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExamShiftManager;
