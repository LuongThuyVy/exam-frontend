import React from 'react';
import logo from '../../assets/img/logo.png';
import { CgProfile } from "react-icons/cg";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <Navigation>
      <Navbar className="bg-info">
        <NavbarBrand href="/">
          <img src={logo} alt="logo" style={{ height: 40, width: 40 }} />
        </NavbarBrand>
        <Nav className="ms-auto me-auto" navbar>
          <NavItem>
            <NavLink className="text-light" href="/components/">Xem ca thi</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-light" href="/components/">Your Schedule</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-light" href="/components/">Your result</NavLink>
          </NavItem>
          <NavItem>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </NavItem>
        </Nav>
        <NavItem>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </NavItem>
        <NavItem>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </NavItem>
        <NavbarBrand href="#" className="navProfile">
          <CgProfile className="iconSearch text-light" />
        </NavbarBrand>
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
