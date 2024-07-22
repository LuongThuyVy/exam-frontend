import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './';

function RegisterStep2({ formData, handleChange, prevStep, handleSubmit, errors }) {
  return (
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

      <Button variant="secondary" className="mt-3 me-2" onClick={prevStep}>
        Back
      </Button>
      <Button variant="primary" type="submit" className="mt-3">
        Register
      </Button>
    </Form>
  );
}

export default RegisterStep2;
