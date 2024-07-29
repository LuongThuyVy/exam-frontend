// src/components/ExamShiftCard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const ExamShiftCard = () => {
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
        }
      } else {
        setError('No user ID found');
      }
    };

    fetchExamShifts();
  }, []);

  const calculateTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const timeDiff = end - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    return hours;
  };

  const formatTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {examShifts.length > 0 ? (
        examShifts.map((shift) => {
          const timeRemaining = calculateTimeRemaining(shift.examShift.endTime);
          const timeRemainingStyle = timeRemaining <= 1 ? { color: 'red' } : { color: 'green' };
          
          return (
            <Card key={shift.testId} className="mb-3">
              <Card.Body>
                <Card.Title>{shift.examShift.subjectgrade.subject.Name} - {shift.examShift.subjectgrade.grade.Name}</Card.Title>
                <Card.Text>
                  <strong>Exam Shift:</strong> {shift.examShift.name} <br />
                  <strong>Date:</strong> {new Date(shift.examShift.startTime).toLocaleDateString()} <br />
                  <strong>Time:</strong> {formatTime(shift.examShift.startTime, shift.examShift.endTime)} <br />
                  <strong>Time Remaining:</strong> <span style={timeRemainingStyle}>{timeRemaining} hour{timeRemaining !== 1 ? 's' : ''}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>No exam shifts available.</p>
      )}
    </div>
  );
};

export default ExamShiftCard;
