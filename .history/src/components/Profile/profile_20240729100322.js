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
        console.log('Fetching user data...');
        const response = await axios.get(`http://localhost:8000/api/user/${currentUser.id}`);
        console.log('User data fetched:', response.data);
        setUser(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response ? err.response.data.message : 'Something went wrong');
        setUser(null); // Clear user data in case of an error
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUser();
  }, [currentUser, navigate]);
  }, [userId]);

  return (
    <Card>
      <Card.Header>Thông tin người dùng</Card.Header>
      <Card.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user ? (
          <>
            <p>Tên: {user.examinee.FullName}</p>
            <p>Ngày sinh: {user.examinee.Birth}</p>
            <p>Giới tính: {user.examinee.Gender}</p>
            <p>Địa chỉ: {user.examinee.AddressDetail}</p>
            <p>Lớp: {user.examinee.Grade.Name}</p>
            <p>Email: {user.Email}</p>
            <Button variant="primary">Cập nhật thông tin</Button>
          </>
        ) : (
          !error && <p>Loading...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
