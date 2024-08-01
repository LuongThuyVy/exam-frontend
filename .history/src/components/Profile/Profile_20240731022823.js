// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser ? storedUser.id : null;

      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
          setUser(response.data);
          setEditedUser(response.data);
          setError(null);
        } catch (err) {
          setError(err.response ? err.response.data.message : 'Something went wrong');
          setUser(null);
        }
      } else {
        setError('No user ID found');
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser ? storedUser.id : null;

      if (userId) {
        const response = await axios.put(`http://localhost:8000/api/users/${userId}`, editedUser);
        setUser(response.data);
        setIsEditing(false);
        setError(null);
      } else {
        setError('No user ID found');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error updating user information');
    }
  };

  if (error) {
    return <Card><Card.Body><p style={{ color: 'red' }}>{error}</p></Card.Body></Card>;
  }

  if (!user) {
    return <Card><Card.Body><p>Loading...</p></Card.Body></Card>;
  }

  return (
    <Card>
      <Card.Header>User Information</Card.Header>
      <Card.Body>
        {isEditing ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="FullName"
                value={editedUser?.examinee?.FullName || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="Birth"
                value={editedUser?.examinee?.Birth || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="Gender"
                value={editedUser?.examinee?.Gender || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="AddressDetail"
                value={editedUser?.examinee?.AddressDetail || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={editedUser?.Email || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="Phone"
                value={editedUser?.Phone || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit" className="mr-2">Save</Button>
              <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            </div>
          </Form>
        ) : (
          <>
            <p><strong>Name:</strong> {user.examinee?.FullName || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {user.examinee?.Birth || 'N/A'}</p>
            <p><strong>Gender:</strong> {user.examinee?.Gender || 'N/A'}</p>
            <p><strong>Address:</strong> {user.examinee?.AddressDetail || 'N/A'}</p>
            <p><strong>Grade ID:</strong> {user.examinee?.GradeId || 'N/A'}</p>
            <p><strong>Email:</strong> {user.Email || 'N/A'}</p>
            <p><strong>Phone:</strong> {user.Phone || 'N/A'}</p>
            <p><strong>Created Date:</strong> {user.CreateDate || 'N/A'}</p>
            <div className="text-center mt-3">
              <Button variant="primary" onClick={handleEdit}>Update Information</Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
