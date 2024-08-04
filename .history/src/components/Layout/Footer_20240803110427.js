import React from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FaGraduationCap, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Layout.css'; // Assuming you have custom styles
import logo from '../../assets/img/logo.png';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-dark footer-page">
      <Container className="p-2">
        <Row className="my-2">
          <Col lg={4} md={6} className="mb-2 mb-md-0">
            <div
              className="bg-transparent d-flex align-items-center justify-content-center mx-auto"
              style={{ backgroundColor: 'var(--bs-body-bg)', width: '110px', height: '110px' }}
            >
              <img src={logo} height="100" alt="Logo" />
            </div>
            <div className="text-center text-dark">
              {/* <b><p className="text-uppercase" style={{ color: 'var(--sidebar-text-color)' }}>Example</p></b> */}
              <b><p style={{ color: "var(--secondary-color)" }}>Make your exam simple!</p></b>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-2 mb-md-0">
            <h5 className="text-uppercase mb-2 text-dark text-start">Về chúng tôi</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-decoration-none text-black bg-transparent">
                <Link to="/contact">
                  <FaGraduationCap className="pe-2" />Contact
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="text-dark bg-transparent text-decoration-none">
              <Link to="/contact">
                  <FaGraduationCap className="pe-2 " />
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="text-dark bg-transparent text-decoration-none">
              <Link to="/contact">
                  <FaGraduationCap className="pe-2" />Term and Conditions
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col lg={4} md={6} className="mb-2 mb-md-0">
            <h5 className="text-uppercase mb-2 text-dark text-start">Liên hệ</h5>
            <ListGroup variant="flush" className="text-dark">
              <ListGroup.Item className="text-dark bg-transparent text-decoration-none">
                <FaMapMarkerAlt className="pe-2" />97 Man Thien, Hiep Phu, District 9, HCMC
              </ListGroup.Item>
              <ListGroup.Item className="text-dark bg-transparent text-decoration-none">
                <FaPhone className="pe-2" />+84 70 666 2826
              </ListGroup.Item >
              <ListGroup.Item className="text-dark bg-transparent text-decoration-none"> 
                <FaEnvelope className="pe-2 mb-0" />n20dccn085@example.com
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row className="overflow-hidden">
          <Col>
            <div className="footer-copyright-wrapper text-center" style={{ color: '#5c3677', fontSize: '0.8em' }}>
              &copy; Example 2024. All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
