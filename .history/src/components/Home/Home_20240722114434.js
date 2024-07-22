import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <div className="bg-light p-5 rounded">
            <h1 className="text-center">Example là gì?</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Arcu scelerisque pretium donec ultrices odio
              suspendisse fringilla sit quam. Enim sit in donec amet adipiscing sollicitudin. Et arcu
              viverra et vitae non id eu nunc commodo id amet.
            </p>
            <Button variant="primary" className="d-block mx-auto">Đăng ký thi ngay!</Button>
          </div>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Example được tạo ra với mục đích gì?</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur. Arcu scelerisque pretium donec ultrices odio
                suspendisse fringilla sit quam. Enim sit in donec amet adipiscing sollicitudin. Et arcu
                viverra et vitae non id eu nunc commodo id amet.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Mục đích</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur. Arcu scelerisque pretium donec ultrices odio
                suspendisse fringilla sit quam. Enim sit in donec amet adipiscing sollicitudin. Et arcu
                viverra et vitae non id eu nunc commodo id amet.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <div className="bg-light p-5 rounded">
            <h2 className="text-center">Cho đến nay, hệ thống của chúng tôi với tính đa...</h2>
            <Row className="text-center">
              <Col md={4}>
                <div className="p-4 bg-primary text-white rounded">
                  <h3>32,986</h3>
                  <p>Tổng số các thi đã tổ chức</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="p-4 bg-danger text-white rounded">
                  <h3>32,986</h3>
                  <p>Số đề được đăng tải</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="p-4 bg-success text-white rounded">
                  <h3>32,986</h3>
                  <p>Thí sinh đã tham gia</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
