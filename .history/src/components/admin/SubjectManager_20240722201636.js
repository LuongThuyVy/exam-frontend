import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function SubjectManager() {
  const [subjects, setSubjects] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({ id: null, name: '' });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await axios.get('http://localhost:8000/api/subjects');
    setSubjects(response.data);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setCurrentSubject({ id: null, name: '' });
  };

  const handleChange = (e) => {
    setCurrentSubject({ ...currentSubject, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await axios.put(`http://localhost:8000/api/subjects/${currentSubject.id}`, currentSubject);
    } else {
      await axios.post('http://localhost:8000/api/subjects', currentSubject);
    }
    fetchSubjects();
    handleClose();
  };

  const handleEdit = (subject) => {
    setCurrentSubject(subject);
    setEditMode(true);
    handleShow();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/subjects/${id}`);
    fetchSubjects();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Thêm môn học
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên môn học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(subject)} className="me-2">
                  Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDelete(subject.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal
