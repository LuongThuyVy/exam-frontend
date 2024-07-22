import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './register.css';

function RegisterStep1({ formData, handleChange, nextStep, errors }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group controlId="formFullName">
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

      <Button variant="primary" className="mt-3" onClick={nextStep}>
        Next
      </Button>
    </Form>
  );
}

export default RegisterStep1;
