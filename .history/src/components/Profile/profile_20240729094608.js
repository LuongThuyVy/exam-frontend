import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ViewProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // Assume user ID is passed via route params

  useEffect(() => {
    // Fetch user data
    axios.get(`http://127.0.0.1:8000/api/users/${Id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="mt-4 col-sm-8 offset-sm-2">
      {error && <Alert variant="danger">{error}</Alert>}
      {user && (
        <Card>
          <Card.Header as="h5">User Profile</Card.Header>
          <Card.Body>
            <Card.Title>{user.examinee?.FullName || 'No name provided'}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Email: {user.Email || 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Phone: {user.Phone || 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Birth Date: {user.examinee?.Birth || 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Gender: {user.examinee?.Gender || 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Grade ID: {user.examinee?.GradeId || 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Address: {user.examinee?.AddressDetail || 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Created At: {user.CreateDate || 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Role: {user.Role?.Name || 'N/A'}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ViewProfile;
