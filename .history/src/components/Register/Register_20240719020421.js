import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed
import ./Register.css
function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    birth: '',
    gender: '',
    phone: '',
    grade_id: '',
    address_detail: '',
    policyAccepted: false // New state for the checkbox
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.policyAccepted) {
      setErrors({ ...errors, policyAccepted: ['You must accept the policy.'] });
      return;
    }

    try {
      const response = await axios.post('/api/register', formData);
      setSuccess('Registration successful!');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Register</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.keys(errors).map((key) => (
            <div key={key}>{errors[key].join(', ')}</div>
          ))}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password && errors.password.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFullName" className="mt-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            isInvalid={errors.full_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.full_name && errors.full_name.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBirth" className="mt-3">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            isInvalid={errors.birth}
          />
          <Form.Control.Feedback type="invalid">
            {errors.birth && errors.birth.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            isInvalid={errors.gender}
          >
            <option value="">Select gender</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.gender && errors.gender.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone && errors.phone.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGradeId" className="mt-3">
          <Form.Label>Grade ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter grade ID"
            name="grade_id"
            value={formData.grade_id}
            onChange={handleChange}
            isInvalid={errors.grade_id}
          />
          <Form.Control.Feedback type="invalid">
            {errors.grade_id && errors.grade_id.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAddressDetail" className="mt-3">
          <Form.Label>Address Detail</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address detail"
            name="address_detail"
            value={formData.address_detail}
            onChange={handleChange}
            isInvalid={errors.address_detail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address_detail && errors.address_detail.join(', ')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPolicyAccepted" className="mt-3">
          <Form.Check
            type="checkbox"
            label="I have read the policy and agree to the terms."
            name="policyAccepted"
            checked={formData.policyAccepted}
            onChange={handleChange}
            isInvalid={errors.policyAccepted}
          />
          {errors.policyAccepted && (
            <Form.Text className="text-danger">
              {errors.policyAccepted.join(', ')}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Container>
  );
}

export default Register;
