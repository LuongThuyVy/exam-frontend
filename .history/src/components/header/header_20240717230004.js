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
      <Navbar {...props} className="bg-success
      ">
        <NavbarBrand href="/"><img src={logo} alt='logo' style={{height:40, width:40}}/></NavbarBrand>  
          <Nav className="ms-auto me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Xem ca thi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Your Schedule</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Your result</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Contact</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Profile</NavbarText>
      
      </Navbar>
    </div>
    )
}
export default Header;