import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Alert } from 'react-bootstrap';

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users.');
    }
  };

  // Xác định người dùng cần hiển thị cho trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Xử lý thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Xử lý khóa và mở khóa người dùng
  const handleLockToggle = async (userId, lockStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/user/${userId}`, {
        LockEnable: lockStatus
      });
      // Cập nhật lại danh sách người dùng
      fetchUsers();
    } catch (error) {
      console.error('Error updating lock status:', error);
      setError('Error updating lock status.');
    }
  };

  // Tạo các trang phân trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

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
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.Id}>
              <td>{user.Id}</td>
              <td>{user.Email}</td>
              <td>{user.Phone}</td>
              <td>
                <Button
                  variant={user.LockEnable ? 'danger' : 'success'}
                  onClick={() => handleLockToggle(user.Id, !user.LockEnable)}
                >
                  {user.LockEnable ? 'Unlock' : 'Lock'}
                </Button>
              </td>
              <td>
                <Button variant="info" onClick={() => window.location.href = `/user/${user.Id}`}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
      </Pagination>
    </div>
  );
}

export default UserList;
