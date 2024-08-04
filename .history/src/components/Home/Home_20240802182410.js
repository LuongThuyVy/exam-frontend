import React from 'react';
import './Home.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to <b>Example</b></h1>
          <p>Make Your Exam Simple!</p>
          <Link to="/shift" className="btn btn-primary">Get Started</Link>
        </div>
      </div>

      <Container fluid>
        <Row className="my-5 text-center">
          <Col md={6}>
            <h2>What Does "Example" Mean?</h2>
            <p>The name "Example" represents our commitment to setting a standard in exam management. Just as an example demonstrates the best practices, our platform is designed to be a model of simplicity and efficiency in the exam process. We aim to provide a solution that others can look up to and aspire to.</p>
          </Col>
          <Col md={6}>
            <div className="centered-image">
              <img src="/path/to/your/image.png" alt="Example Overview" />
            </div>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">
          <Col>
            <h2>Why Choose Example?</h2>
            <p>Example is more than just a platform; it's a comprehensive solution for all your exam needs. With features like available shifts, scheduling, history tracking, test starting, and detailed test views, we ensure that your exam management is seamless and efficient. Our intuitive interface and user-friendly design make it easy for you to navigate through the platform and manage your exams with ease.</p>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">
          <Col md={6} lg={3}>
            <div className="stat-box">
              <div className="image-placeholder medium">
                <h3>Available Shifts</h3>
                <p>View and select available exam shifts that fit your schedule.</p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div className="stat-box">
              <div className="image-placeholder medium">
                <h3>Schedule Exams</h3>
                <p>Schedule your exams with just a few clicks, ensuring you never miss an important date.</p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div className="stat-box">
              <div className="image-placeholder medium">
