import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert } from 'react-bootstrap';
import './Shift.css';

const ExamSchedule = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        const userId = localStorage.getItem('id');
        console.log('User ID:', userId); // Log the userId

        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await axios.get(`{{url}}/schedule/${userId}`);
        setExamShifts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exam shifts:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchExamShifts();
  }, []);

  const calculateTimeRemaining = (startTime) => {
    const examDate = new Date(startTime);
    const currentDate = new Date();
    const diffInMs = examDate - currentDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    return diffInHours;
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error fetching exam shifts: {error.message}</Alert>;
  }

  return (
    <div className="exam-schedule">
      {examShifts.map((shift) => {
        const timeRemaining = calculateTimeRemaining(shift.examShift.startTime);
        const timeRemainingClass = timeRemaining <= 1 ? 'text-danger' : 'text-success';
        return (
          <Card key={shift.testId} className="mb-3">
            <Card.Body>
              <Card.Title>{shift.examShift.subjectgrade.subject_grade.subject.Name} - {shift.examShift.subjectgrade.subject_grade.grade.Name}</Card.Title>
              <Card.Text>
                Exam shift: {shift.examShift.name}<br />
                Date: {new Date(shift.examShift.startTime).toLocaleDateString()}<br />
                Time: {new Date(shift.examShift.startTime).toLocaleTimeString()} - {new Date(shift.examShift.endTime).toLocaleTimeString()}<br />
                Time Remaining: <span className={timeRemainingClass}>in {timeRemaining} hours</span>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default ExamSchedule;
