import React from 'react';
import logo from '../../assets/img/logo.png';
import { CgProfile } from "react-icons/cg";
import { Navbar, NavbarBrand, Nav, NavItem, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import '../../components/Layout/Layout.css';

function AdminHeader() {
  const { isAuthenticated, logout } = useAuth(); 

  return (
    <Navigation>
      <Navbar className="nav-bar">
        <NavItem>
          <Nav.Link as={Link} to="/admin" className="">
            <NavbarBrand>
              <img src={logo} alt="logo"  />
            </NavbarBrand>
          </Nav.Link>
        </NavItem>

        <Nav className="ms-auto me-auto" navbar>
     
          <NavItem>
            <Nav.Link as={Link} to="/admin/questions" className="">Manage Questions</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link as={Link} to="/admin/exam-shifts" className="">Manage Exam Shifts</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link as={Link} to="/admin/accounts" className="">Manage Accounts</Nav.Link>
          </NavItem>    
        </Nav>

        <Nav navbar>
          {isAuthenticated() && (
            <Dropdown>
              <Dropdown.Toggle className="bg-transparent border-0" variant="info" id="dropdown-basic">
                <CgProfile className="iconSearch" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Navbar>
    </Navigation>
  );
}

export default AdminHeader;

const Navigation = styled.div`
  .navProfile {
    display: flex;
    align-items: center;
  }

  .iconSearch {
    font-size: 1.5rem; /* Adjust the size as needed */
    margin-left: 1rem; /* Adjust the space between the logo and the profile icon */
  }
`;
