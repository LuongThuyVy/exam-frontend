import React from 'react';
import logo from '../../assets/img/logo.png';
import { CgProfile } from "react-icons/cg";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'react-bootstrap';
import styled from 'styled-components';
import {
  Link,} from "react-router-dom";
function Header() {
  return (
    <Navigation>
      <Navbar className="bg-info">
        <NavbarBrand href="/">
          <img src={logo} alt="logo" style={{ height: 40, width: 40 }} />
        </NavbarBrand>
        <Nav className="ms-auto me-auto" navbar>
        <NavItem>
          <Nav.Link as={Link} to="/shift" className="text-light">Available shifts</Nav.Link>
          </NavItem>
          <NavItem>
          <Nav.Link as={Link} to="/schedule" className="text-light">Your schedule</Nav.Link>
          </NavItem>
          <NavItem>
          <Nav.Link as={Link} to="/result" className="text-light">Your result</Nav.Link>
          </NavItem>
          <NavItem>
          <Nav.Link as={Link} to="/contact" className="text-light">Contact</Nav.Link>
          </NavItem>
        </Nav>
        <Nav classname="" navbar>
        <NavItem>
          <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
          </NavItem>
        <NavItem>
          <Nav.Link as={Link} to="/register" className="text-light">Register</Nav.Link>
          </NavItem>
        <NavbarBrand href="#" className="navProfile">
          <CgProfile className="iconSearch text-light" />
        </NavbarBrand>
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
