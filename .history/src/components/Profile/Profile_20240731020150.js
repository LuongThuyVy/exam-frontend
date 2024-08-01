import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState(null);

  useEffect(() => {
    const fetchUserAndGrade = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.id;

      if (userId) {
        try {
          const [userResponse, gradeResponse] = await Promise.all([
            axios.get(`http://localhost:8000/api/user/${userId}`),
            axios.get('http://localhost:8000/api/grades')
          ]);
          setUser(userResponse.data);
          setGrade(gradeResponse.data.find(g => g.id === userResponse.data.examinee.GradeId));
          setError(null);
        } catch (err) {
          setError(err.response?.data.message || 'Something went wrong');
          setUser(null);
          setGrade(null);
        }
      } else {
        setError('No user ID found');
      }
    };

    fetchUserAndGrade();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const formatGender = (gender) => {
    return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender;
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">User Information</h4>
        </Card.Header>
        <Card.Body>
          {error && <p className="text-danger">{error}</p>}
          {user ? (
            <Row>
              <Col md={6}>
                <InfoItem label="Name" value={user.examinee.FullName} />
                <InfoItem label="Date of Birth" value={formatDate(user.examinee.Birth)} />
                <InfoItem label="Gender" value={formatGender(user.examinee.Gender)} />
                <InfoItem label="Address" value={user.examinee.AddressDetail} />
              </Col>
              <Col md={6}>
                <InfoItem label="Grade" value={grade?.name || 'Loading...'} />
                <InfoItem label="Email" value={user.Email} />
                <InfoItem label="Phone" value={user.Phone} />
                <InfoItem label="Account Created" value={formatDate(user.CreateDate)} />
              </Col>
            </Row>
          ) : (
            !error && <p className="text-center">Loading...</p>
          )}
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="primary">Update Information</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

const InfoItem = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value}
  </p>
);

export default UserInfo;