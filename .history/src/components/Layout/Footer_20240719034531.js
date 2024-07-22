import React from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FaGraduationCap, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
// import './Footer.css'; // Assuming you have custom styles

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-dark footer-page">
      <Container className="p-2">
        <Row className="my-2">
          <Col lg={4} md={6} className="mb-2 mb-md-0">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
              style={{ backgroundColor: 'var(--bs-body-bg)', width: '110px', height: '110px' }}
            >
              <Image src="~/logo.png" height="100" alt="Logo" />
            </div>
            <div className="text-center text-dark">
              <b><p className="text-uppercase" style={{ color: 'var(--sidebar-text-color)' }}>TutorLight</p></b>
              <p>Phát triển tương lai, từng bài học mỗi ngày cùng TutorLight - Nơi tri thức bừng sáng!</p>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-2 mb-md-0">
            <h5 className="text-uppercase mb-2 text-dark text-start">Về chúng tôi</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-dark">
                <a target="_blank" rel="noopener noreferrer" href="" className="text-decoration-none text-black">
                  <FaGraduationCap className="pe-2" />Liên hệ
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="text-dark">
                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D" className="text-decoration-none text-black">
                  <FaGraduationCap className="pe-2" />Chính sách bảo mật
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="text-dark">
                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D" className="text-decoration-none text-black">
                  <FaGraduationCap className="pe-2 mb-0" />Điều khoản
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col lg={4} md={6} className="mb-2 mb-md-0">
            <h5 className="text-uppercase mb-2 text-dark text-start">Liên hệ</h5>
            <ListGroup variant="flush" className="text-dark">
              <ListGroup.Item>
                <FaMapMarkerAlt className="pe-2" />97 Man Thien
              </ListGroup.Item>
              <ListGroup.Item>
                <FaPhone className="pe-2" />+84 0858 293 114
              </ListGroup.Item>
              <ListGroup.Item>
                <FaEnvelope className="pe-2 mb-0" />n20dccn009@example.com
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row className="overflow-hidden">
          <Col>
            <div className="footer-copyright-wrapper text-center" style={{ color: '#5c3677', fontSize: '0.8em' }}>
              &copy; TutorLight 2024. All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
