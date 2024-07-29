// src/components/AccountList.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedExaminee, setSelectedExaminee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleShowDetails = (examinee) => {
    setSelectedExaminee(examinee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedExaminee(null);
    setShowModal(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Lock Enable</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.Id}>
              <td>{account.Email}</td>
              <td>{account.Phone}</td>
              <td>{account.LockEnable ? 'Active' : 'No'}</td>
              <td>{account.CreateDate}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetails(account.examinee)}
                  disabled={!account.examinee}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Examinee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExaminee ? (
            <div>
              <p><strong>Full Name:</strong> {selectedExaminee.FullName}</p>
              <p><strong>Birth:</strong> {selectedExaminee.Birth}</p>
              <p><strong>Gender:</strong> {selectedExaminee.Gender}</p>
              <p><strong>Address Detail:</strong> {selectedExaminee.AddressDetail}</p>
              <p><strong>Grade ID:</strong> {selectedExaminee.GradeId}</p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccountList;
