import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import AddExamShift from './AddExamShift';

const ExamShiftManagement = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchExamShifts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/exam-shifts');
      setExamShifts(response.data);
    } catch (error) {
      console.error('Error fetching exam shifts:', error);
    }
  };

  useEffect(() => {
    fetchExamShifts();
  }, []);

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

      <AddExamShift showModal={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default ExamShiftManagement;
