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
      <Navbar {...props}>
        <NavbarBrand href="/"><img src={logo} alt='logo' style={{height:40, width:40}}/></NavbarBrand>  
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Caác</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                GitHub
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Profile</NavbarText>
      
      </Navbar>
    </div>
    )
}
export default Header;