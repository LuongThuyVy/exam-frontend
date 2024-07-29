import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    let valid = true;
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
  
    if (!validateForm()) {
      return;
    }
  
    axios.post('http://127.0.0.1:8000/api/login', formData)
      .then(response => {
        if (response.status === 200) {
          setSuccess('Login successful');
          setErrors({});
          
          const userData = response.data.account;
          login(userData);

          if (userData.role === 'admin') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/';
          }
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setLoginError('Invalid email or password.');
        }
      });
  };

  return (
    <Container className="mt-4 col-sm-6 offset-sm-3">
      <h2 className='mb-5 text-center'>Login</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {loginError && <Alert variant="danger">{loginError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="info" type="submit" className="mt-3 button">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;