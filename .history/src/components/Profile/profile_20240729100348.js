// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';

const UserInfo = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
        setUser(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
        setUser(null); // Clear user data in case of an error
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <Card>
      <Card.Header>Thông tin người dùng</Card.Header>
      <Card.Body>
        {loading && <Spinner animation="border" />}
        {error && !loading && <p style={{ color: 'red' }}>{error}</p>}
        {user && !loading && (
          <>
            <p>Tên: {user.examinee?.FullName ?? 'N/A'}</p>
            <p>Ngày sinh: {user.examinee?.Birth ?? 'N/A'}</p>
            <p>Giới tính: {user.examinee?.Gender ?? 'N/A'}</p>
            <p>Địa chỉ: {user.examinee?.AddressDetail ?? 'N/A'}</p>
            <p>Lớp: {user.examinee?.Grade?.Name ?? 'N/A'}</p>
            <p>Email: {user?.Email ?? 'N/A'}</p>
            <Button variant="primary">Cập nhật thông tin</Button>
          </>
        )}
        {!user && !error && !loading && <p>No user data available.</p>
