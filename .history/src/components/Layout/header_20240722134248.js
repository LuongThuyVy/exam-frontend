import React from 'react';
import logo from '../../assets/img/logo.png';
import { CgProfile } from "react-icons/cg";
import { Navbar, NavbarBrand, Nav, NavItem, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';
function Header() {
  const { isAuthenticated, user, logout } = useAuth(); 

  return (
    <Navigation>
      <Navbar className="nav-bar">
        <NavItem>
          <Nav.Link as={Link} to="/" className="">
            <NavbarBrand>
              <img src={logo} alt="logo"  />
            </NavbarBrand>
          </Nav.Link>
        </NavItem>

        <Nav className="ms-auto me-auto" navbar><NavItem>
                <Nav.Link as={Link} to="/home" className="">Home</Nav.Link>
              </NavItem>
        <NavItem>
            <Nav.Link as={Link} to="/shift" className="">Available shifts</Nav.Link>
          </NavItem>
          {isAuthenticated() ? (
            <>
              <NavItem>
                <Nav.Link as={Link} to="/schedule" className="">Your schedule</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/result" className="">Your result</Nav.Link>
              </NavItem>
            </>
          ) : null}
         
          <NavItem>
            <Nav.Link as={Link} to="/contact" className="">Contact</Nav.Link>
          </NavItem>
        </Nav>

        <Nav navbar>
          {!isAuthenticated() ? (
            <>
              <NavItem>
                <Nav.Link as={Link} to="/login" className="">Login</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/register" className="">Register</Nav.Link>
              </NavItem>
            </>
          ) : (
            <Dropdown >
              <Dropdown.Toggle className="bg-transparent border-0" variant="info" id="dropdown-basic">
                <CgProfile className="iconSearch text-light" />
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

export default Header;

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
