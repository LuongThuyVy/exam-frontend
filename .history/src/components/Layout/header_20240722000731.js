import React from 'react';
import logo from '../../assets/img/logo.png';
import { CgProfile } from "react-icons/cg";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {useAuth  } from '../../contexts/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth (); 
  return (
    <Navigation>
      <Navbar className="bg-info">
        <NavItem>
          <Nav.Link as={Link} to="/" className="text-light">
            <NavbarBrand>
              <img src={logo} alt="logo" style={{ height: 40, width: 40 }} />
            </NavbarBrand>
          </Nav.Link>
        </NavItem>

        <Nav className="ms-auto me-auto" navbar>
          <NavItem>
            <Nav.Link as={Link} to="/shift" className="text-light">Available shifts</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link as={Link} to="/contact" className="text-light">Contact</Nav.Link>
          </NavItem>
        </Nav>

        <Nav navbar>
          {!isAuthenticated ? (
            <>
              <NavItem>
                <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/register" className="text-light">Register</Nav.Link>
              </NavItem>
            </>
          ) : (
            <Nav>
            <NavItem>
            <Nav.Link as={Link} to="/schedule" className="text-light">Your schedule</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link as={Link} to="/result" className="text-light">Your result</Nav.Link>
          </NavItem>
        
          
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                <CgProfile className="iconSearch text-light" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Nav>
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
