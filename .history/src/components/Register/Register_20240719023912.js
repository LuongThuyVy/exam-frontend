import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './register.css';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    birth: '',
    gender: '',
    phone: '',
    grade_id: '',
    address_detail: '',
    email: '',
    password: '',
    policyAccepted: false,
  });
  const [grades, setGrades] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('/api/grades')
      .then(response => {
        setGrades(response.data);
      })
      .catch(error => {
        console.error('Error fetching grades:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', formData)
      .then(response => {
        setSuccess('Registration successful');
      })
      .catch(error => {
        setErrors(error.response.data.errors);
      });
  };

  return (
    <Container className="mt-4">
      <h2>Register</h2>
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <Form.Group controlId="formFullName" className="mt-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                isInvalid={!!errors.full_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.full_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBirth" className="mt-3">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                isInvalid={!!errors.birth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGender" className="mt-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
              >
                <option value="">Select gender</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGradeId" className="mt-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="grade_id"
                value={formData.grade_id}
                onChange={handleChange}
                isInvalid={!!
