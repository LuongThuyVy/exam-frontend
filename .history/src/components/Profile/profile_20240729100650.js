// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const UserInfo = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Ensure userId is defined before making the API call
        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
          console.log('User Data:', response.data); // Log the user data
          setUser(response.data);
          setError(null); // Clear any previous errors
        } else {
          setError('User ID is not provided');
        }
      } catch (err) {
        console.error('Error fetching user data:', err); // Log error details
        setError(err.response ? err.response.data.message : 'Something went wrong');
        setUser(null); // Clear user data in case of an error
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <Card>
      <Card.Header>User Information</Card.Header>
      <Card.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user ? (
          <>
            <p>Name: {user.examinee.FullName}</p>
            <p>Date of Birth: {user.examinee.Birth}</p>
            <p>Gender: {user.examinee.Gender}</p>
            <p>Address: {user.examinee.AddressDetail}</p>
            <p>Grade: {user.examinee.GradeId}</p>
            <p>Email: {user.Email}</p>
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
