import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth(); // Get user ID from Auth context
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login if user is not authenticated
      return;
    }

    axios.get(`http://127.0.0.1:8000/api/users/${currentUser.id}`)
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch user data.');
        setLoading(false);
      });
  }, [currentUser, navigate]);

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>{userData?.email}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">User ID: {userData?.id}</Card.Subtitle>
          <Card.Text>
            <strong>Full Name:</strong> {userData?.examinee.FullName}<br />
            <strong>Birth Date:</strong> {userData?.examinee.Birth}<br />
            <strong>Gender:</strong> {userData?.examinee.Gender}<br />
            <strong>Phone:</strong> {userData?.phone}<br />
            <strong>Address:</strong> {userData?.examinee.AddressDetail}<br />
            <strong>Grade ID:</strong> {userData?.examinee.GradeId}
          </Card.Text>
    
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
