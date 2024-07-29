import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExamScheduleCard = ({ accountId }) => {
  const [examShifts, setExamShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/schedule/${accountId}`);
        setExamShifts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamShifts();
  }, [accountId]);

  const formatTimeRemaining = (startTime) => {
    const now = moment();
    const start = moment(startTime);
    const duration = moment.duration(start.diff(now));

    const hours = duration.hours();
    const minutes = duration.minutes();

    if (hours <= 1) {
      return (
        <span style={{ color: 'red' }}>
          in {hours} hour{hours !== 1 ? 's' : ''}
        </span>
      );
    }
    return (
      <span style={{ color: 'green' }}>
        in {hours} hour{hours !== 1 ? 's' : ''}, {minutes} minute{minutes !== 1 ? 's' : ''}
      </span>
    );
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      {examShifts.map((shift) => (
        <Card key={shift.testId} className="mb-3">
          <
