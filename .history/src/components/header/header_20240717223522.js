import logo from '../../assets/img/logo.png'
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function Header(props){
    return(
        <div>
      <Navbar {...args}>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
      
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
           
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
    )
}
export default Header;