import logo from '../../assets/img/logo.png'

import {

  Navbar,

  NavbarBrand,
  Nav,
  NavItem,
  NavLink,


  NavbarText,
} from 'react-bootstrap';

function Header(args){
    return(
        <div>
      <Navbar {...args}>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
      
      
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                GitHub
              </NavLink>
            </NavItem>
           
          </Nav>
          <NavbarText>Profile</NavbarText>
      
      </Navbar>
    </div>
    )
}
export default Header;