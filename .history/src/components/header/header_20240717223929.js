import logo from '../../assets/img/logo.png'

import {

  Navbar,

  NavbarBrand,
  Nav,
  NavItem,
  NavLink,


  NavbarText,
} from 'react-bootstrap';

function Header(props){
    return(
        <div>
      <Navbar>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
      
      
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
      
      </Navbar>
    </div>
    )
}
export default Header;