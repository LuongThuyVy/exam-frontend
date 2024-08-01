import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { format } from 'date-fns';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const fetchUserAndGrade = useCallback(async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?.id;

    if (userId) {
      try {
        const [userResponse, gradeResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/user/${userId}`),
          axios.get('http://localhost:8000/api/grades')
        ]);
        setUser(userResponse.data);
        setEditedUser(userResponse.data);
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
  }, []);

  useEffect(() => {
    fetchUserAndGrade();
  }, [fetchUserAndGrade]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
  };

  const formatGender = (gender) => {
    return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender : gender ==='O' ? 'Other';
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => {
      if (name.startsWith('examinee.')) {
        const [, field] = name.split('.');
        return {
          ...prev,
          examinee: {
            ...prev.examinee,
            [field]: value
          }
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${user.Id}`, editedUser);
      setUser(response.data.user);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || 'Error updating user information');
    }
  };

  if (error) {
    return <Container className="mt-4"><p className="text-danger">{error}</p></Container>;
  }

  if (!user) {
    return <Container className="mt-4"><p className="text-center">Loading...</p></Container>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">User Information</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="examinee.FullName"
                    value={editedUser.examinee.FullName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="examinee.Birth"
                    value={formatDate(editedUser.examinee.Birth)}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatGender(user.examinee.Gender)}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="examinee.AddressDetail"
                    value={editedUser.examinee.AddressDetail}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Grade</Form.Label>
                  <Form.Control
                    type="text"
                    value={grade?.name || 'Loading...'}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={editedUser.Email}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="Phone"
                    value={editedUser.Phone}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Account Created</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatDate(user.CreateDate)}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mt-3">
              {isEditing ? (
                <>
                  <Button variant="primary" type="submit" className="mr-2">Save</Button>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleEdit}>Edit Information</Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserInfo;