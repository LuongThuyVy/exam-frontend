import React from 'react';
import './Home.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="hero container"></div>
      <Container fluid>
        <Row className="my-5 text-center">
          <Col>
            <p>Welcome to Example - Make Your Exam Simple!</p>
            <Link to="/shift" className="btn btn-primary">
              Đăng ký thi ngay!
            </Link>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">  
          <Col md={6}>
            <h2>Example là gì?</h2>
            <p>Lorem ipsum dolor sit amet...</p>
          </Col>
          <Col md={6}>
            <div className="image-placeholder large"></div>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">
          <Col>
            <div className="image-placeholder extra-large"></div>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">
          <Col md={6} lg={3}>
            <div className="image-placeholder medium"></div>
          </Col>
          <Col md={6} lg={3}>
            <div className="image-placeholder medium"></div>
          </Col>
          <Col md={6} lg={3}>
            <div className="image-placeholder medium"></div>
          </Col>
          <Col md={6} lg={3}>
            <div className="image-placeholder medium"></div>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">
          <Col>
            <h2>Example được tạo ra với mục đích gì?</h2>
          </Col>
        </Row>
        
        <Row className="my-5 text-center">
          <Col md={4}>
            <div className="stat-box">
              <p>Tổng số ca thi đã tổ chức</p>
              <p className="stat-number">32,986</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-box">
              <p>Số đề được đăng tải</p>
              <p className="stat-number">32,986</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-box">
              <p>Thí sinh đã tham gia</p>
              <p className="stat-number">32,986</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
