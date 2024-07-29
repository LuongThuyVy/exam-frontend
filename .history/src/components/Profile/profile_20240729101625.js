// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser ? storedUser.id : null;

      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
          setUser(response.data);
          setError(null); // Clear any previous errors
        } catch (err) {
          setError(err.response ? err.response.data.message : 'Something went wrong');
          setUser(null); // Clear user data in case of an error
        }
      } else {
        setError('No user ID found');
      }
    };

    fetchUser();
  }, []);

  return (
    <Card>
      <Card.Header>User Information</Card.Header>
      <Card.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user ? (
          <>
            <p><strong>Name:</strong> {user.examinee.FullName}</p>
            <p><strong>Date of Birth:</strong> {user.examinee.Birth}</p>
            <p><strong>Gender:</strong> {user.examinee.Gender}</p>
            <p><strong>Address:</strong> {user.examinee.AddressDetail}</p>
            <p><strong>Grade ID:</strong> {user.examinee.GradeId}</p>
            <p><strong>Email:</strong> {user.Email}</p>
            <p><strong>Phone:</strong> {user.Phone}</p>
            <p><strong>Created Date:</strong> {user.CreateDate}</p>
            <p><strong>Lock Enabled:</strong> {user.LockEnable ? 'Yes' : 'No'}</p>
            <Button variant="primary">Update Information</Button>
          </>
        ) : (
          !error && <p>Loading...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
