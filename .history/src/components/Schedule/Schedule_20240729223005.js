// src/components/ExamShifts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';

const ExamShifts = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamShifts = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser ? storedUser.id : null;

      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/schedule/${userId}`);
          setExamShifts(response.data);
          setError(null); // Clear any previous errors
        } catch (err) {
          setError(err.response ? err.response.data.message : 'Something went wrong');
          setExamShifts([]); // Clear exam shifts data in case of an error
        }
      } else {
        setError('No user ID found');
      }
    };

    fetchExamShifts();
  }, []);

  return (
    <Card>
      <Card.Header>Exam Shifts</Card.Header>
      <Card.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {examShifts.length ? (
          <ListGroup>
            {examShifts.map((shift) => (
              <ListGroup.Item key={shift.testId}>
                <h5>{shift.examShift.name}</h5>
                <p><strong>Subject:</strong> {shift.examShift.subjectgrade.subject_grade.subject.Name}</p>
                <p><strong>Grade:</strong> {shift.examShift.subjectgrade.subject_grade.grade.Name}</p>
                <p><strong>Exam Shift:</strong> {shift.examShift.name}</p>
                <p><strong>Date:</strong> {new Date(shift.examShift.startTime).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(shift.examShift.startTime).toLocaleTimeString()} - {new Date(shift.examShift.endTime).toLocaleTimeString()}</p>
                <p>
                  <strong>Time Remaining:</strong> {calculateTimeRemaining(shift.examShift.endTime)}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          !error && <p>Loading...</p>
        )}
      </Card.Body>
    </Card>
  );
};

// Helper function to calculate time remaining
const calculateTimeRemaining = (endTime) => {
  const end = new Date(endTime);
  const now = new Date();
  const difference = end - now;
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours <= 1) {
    return <span style={{ color: 'red' }}>{hours} hours {minutes} minutes</span>;
  }

  return `${hours} hours ${minutes} minutes`;
};

export default ExamShifts;
