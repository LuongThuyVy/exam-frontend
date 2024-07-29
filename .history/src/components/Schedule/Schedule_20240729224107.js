import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'react-bootstrap';

const ExamShiftList = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamShifts = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const accountId = storedUser ? storedUser.id : null;

      if (accountId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/schedule/pending-exam-shifts/${accountId}`);
          setExamShifts(response.data);
          setError(null); // Clear any previous errors
        } catch (err) {
          setError(err.response ? err.response.data.message : 'Something went wrong');
          setExamShifts([]); // Clear exam shift data in case of an error
        } finally {
          setLoading(false);
        }
      } else {
        setError('No account ID found');
        setLoading(false);
      }
    };

    fetchExamShifts();
  }, []);

  return (
    <div>
      <h1>Danh Sách Ca Thi</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Ca Thi</th>
              <th>Thời Gian Bắt Đầu</th>
              <th>Thời Gian Kết Thúc</th>
            </tr>
          </thead>
          <tbody>
            {examShifts.length === 0 ? (
              <tr>
                <td colSpan="4">Không có ca thi nào.</td>
              </tr>
            ) : (
              examShifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.id}</td>
                  <td>{shift.name}</td>
                  <td>{new Date(shift.startTime).toLocaleString()}</td>
                  <td>{new Date(shift.endTime).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ExamShiftList;
