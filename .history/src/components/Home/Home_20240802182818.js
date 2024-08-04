import React from 'react';
import './Home.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="hero"></div>
      <Container fluid>
        <Row className="my-5 text-center">
          <Col>
            <p>Lorem ipsum dolor sit amet, consectetur...</p>
            <Link to="/shift" className="btn btn-primary">
              Đăng ký thi ngay!
            </Link>
          </Col>
        </Row>
        
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
                <h3>History Tracking</h3>
                <p>Keep track of your exam history and review past performance easily.</p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div className="stat-box">
              <div className="image-placeholder medium">
                <h3>Start & View Tests</h3>
                <p>Start new tests and view detailed information about each exam with ease.</p>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">
          <Col>
            <h2>Join Us Today!</h2>
            <p>Experience the simplicity and efficiency of Example. Sign up now to get started with a platform designed to make exam management effortless and effective.</p>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </Col>
        </Row>
      </Container>
    </>
  );


export default Home;
