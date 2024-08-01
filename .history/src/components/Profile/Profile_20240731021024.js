import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { format } from 'date-fns';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState(null);
  const [grades, setGrades] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchUserAndGrades();
  }, []);

  const fetchUserAndGrades = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?.id;

    if (userId) {
      try {
        const [userResponse, gradesResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/user/${userId}`),
          axios.get('http://localhost:8000/api/grades')
        ]);
        setUser(userResponse.data);
        setEditedUser(userResponse.data);
        setGrades(gradesResponse.data);
        setGrade(gradesResponse.data.find(g => g.id === userResponse.data.examinee.GradeId));
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

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
  };

  const formatGender = (gender) => {
    return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender;
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
    if (name.startsWith('examinee.')) {
      setEditedUser(prev => ({
        ...prev,
        examinee: {
          ...prev.examinee,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setEditedUser(prev => ({ ...prev, [name]: value }));
    }
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

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">User Information</h4>
        </Card.Header>
        <Card.Body>
          {error && <p className="text-danger">{error}</p>}
          {user ? (
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
                      as="select"
                      name="examinee.Gender"
                      value={editedUser.examinee.Gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </Form.Control>
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
                      as="select"
                      name="examinee.GradeId"
                      value={editedUser.examinee.GradeId}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      {grades.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </Form.Control>
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
          ) : (
            !error && <p className="text-center">Loading...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserInfo;