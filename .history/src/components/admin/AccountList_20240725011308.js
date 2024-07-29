import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Pagination } from 'react-bootstrap';
import axios from 'axios';

function AccountManager() {
  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, [page]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/accounts?page=${page}`);
      setAccounts(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (err) {
      setError('Error fetching accounts.');
    }
  };

  const handleShow = (account) => {
    setCurrentAccount(account);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentAccount(null);
  };

  const handleLockToggle = async (id, lockStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/users/${id}`, { LockEnable: lockStatus ? 0 : 1 });
      fetchAccounts();
    } catch (err) {
      setError('Error updating lock status.');
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Lock Enable</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.Id}>
              <td>{account.Id}</td>
              <td>{account.Email}</td>
              <td>{account.Phone}</td>
              <td>
                <Button
                  variant={account.LockEnable ? 'danger' : 'success'}
                  onClick={() => handleLockToggle(account.Id, account.LockEnable)}
                >
                  {account.LockEnable ? 'Unlock' : 'Lock'}
                </Button>
              </td>
              <td>
                <Button variant="info" onClick={() => handleShow(account)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === page}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentAccount && (
            <>
              <p><strong>Full Name:</strong> {currentAccount.examinee?.FullName}</p>
              <p><strong>Birth:</strong> {currentAccount.examinee?.Birth}</p>
              <p><strong>Gender:</strong> {currentAccount.examinee?.Gender === 'M' ? 'Male' : currentAccount.examinee?.Gender === 'F' ? 'Female' : 'Other'}</p>
              <p><strong>Address Detail:</strong> {currentAccount.examinee?.AddressDetail}</p>
              <p><strong>Grade ID:</strong> {currentAccount.examinee?.GradeId}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountManager;
