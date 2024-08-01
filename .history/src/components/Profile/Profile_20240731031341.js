import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import './UserInfo.css'; // Đảm bảo bạn đã tạo file CSS này

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    FullName: '',
    Birth: '',
    Gender: '',
    AddressDetail: '',
    Email: '',
    Phone: '',
    GradeId: '',
    CreateDate: '',
  });
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser ? storedUser.id : null;

      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
          setUser(response.data);
          setEditedUser({
            FullName: response.data.examinee?.FullName || '',
            Birth: response.data.examinee?.Birth || '',
            Gender: response.data.examinee?.Gender || '',
            AddressDetail: response.data.examinee?.AddressDetail || '',
            Email: response.data.Email || '',
            Phone: response.data.Phone || '',
            GradeId: response.data.examinee?.GradeId || '',
            CreateDate: response.data.CreateDate || '',
          });
          setError(null);
        } catch (err) {
          setError(err.response ? err.response.data.message : 'Something went wrong');
        }
      } else {
        setError('No user ID found');
      }
    };

    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/grades');
        setGrades(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching grades');
      }
    };

    fetchUser();
    fetchGrades();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user ? {
      FullName: user.examinee?.FullName || '',
      Birth: user.examinee?.Birth || '',
      Gender: user.examinee?.Gender || '',
      AddressDetail: user.examinee?.AddressDetail || '',
      Email: user.Email || '',
      Phone: user.Phone || '',
      GradeId: user.examinee?.GradeId || '',
      CreateDate: user.CreateDate || '',
    } : {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!editedUser.FullName) errors.FullName = 'Name is required';
    if (!editedUser.Birth) errors.Birth = 'Date of Birth is required';
    if (!editedUser.Gender) errors.Gender = 'Gender is required';
    if (!editedUser.AddressDetail) errors.AddressDetail = 'Address is required';
    if (!editedUser.Email) errors.Email = 'Email is required';
    if (!editedUser.Phone) errors.Phone = 'Phone number is required';

    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : null;

    if (userId) {
      try {
        await axios.put(`http://localhost:8000/api/users/${userId}`, {
          Email: editedUser.Email,
          Phone: editedUser.Phone,
          examinee: {
            FullName: editedUser.FullName,
            Birth: editedUser.Birth,
            Gender: editedUser.Gender,
            AddressDetail: editedUser.AddressDetail,
            GradeId: editedUser.GradeId,
          }
        });
        setUser({
          ...user,
          ...editedUser,
          examinee: {
            ...user.examinee,
            ...editedUser
          }
        });
        setIsEditing(false);
        setError(null);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error updating user information');
      }
    } else {
      setError('No user ID found');
    }
  };

  if (error) {
    return <Card><Card.Body><p style={{ color: 'red' }}>{error}</p></Card.Body></Card>;
  }

  if (!user) {
    return <Card><Card.Body><p>Loading...</p></Card.Body></Card>;
  }

  // Find the grade name based on GradeId
  const gradeName = grades.find(grade => grade.id === editedUser.GradeId)?.name || 'N/A';

  return (
    <Card className="user-info-card">
      <Card.Body>
        <h1 className="user-info-title">User Information</h1>
        {isEditing ? (
          <Form onSubmit={handleSubmit} className="user-info-form">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="FullName"
                value={editedUser.FullName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="Birth"
                value={editedUser.Birth}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="Gender"
                value={editedUser.Gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="AddressDetail"
                value={editedUser.AddressDetail}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={editedUser.Email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="Phone"
                value={editedUser.Phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="GradeId"
                value={editedUser.GradeId}
                onChange={handleChange}
              >
                <option value="">Select Grade</option>
                {grades.map(grade => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="form-buttons">
              <Button variant="primary" type="submit" className="mr-2">Save</Button>
              <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            </div>
          </Form>
        ) : (
          <>
            <div className="user-info-content">
              <div className="user-info-column">
                <p><strong>Name:</strong> {user.examinee?.FullName || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {user.examinee?.Birth || 'N/A'}</p>
                <p><strong>Gender:</strong> {user.examinee?.Gender === 'M' ? 'Male' : user.examinee?.Gender === 'F' ? 'Female' : user.examinee?.Gender === 'O' ? 'Other' : 'N/A'}</p>
                <p><strong>Address:</strong> {user.examinee?.AddressDetail || 'N/A'}</p>
              </div>
              <div className="user-info-column">
                <p><strong>Grade:</strong> {gradeName}</p>
                <p><strong>Email:</strong> {user.Email || 'N/A'}</p>
                <p><strong>Phone:</strong> {user.Phone || 'N/A'}</p>
                <p><strong>Created Date:</strong> {user.CreateDate || 'N/A'}</p>
              </div>
            </div>
            <Button variant="link" className="edit-button" onClick={handleEdit}>
              <FaEdit />
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
