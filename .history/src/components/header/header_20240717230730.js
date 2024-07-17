import logo from '../../assets/img/logo.png'
import { CgProfile } from "react-icons/cg";
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
      <Navbar {...props} className="bg-info">
        <NavbarBrand href="/"><img src={logo} alt='logo' style={{height:40, width:40}}/></NavbarBrand>  
          <Nav className="ms-auto me-auto" navbar>
            <NavItem>
              <NavLink className='text-light' href="/components/">Xem ca thi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='text-light' href="/components/">Your Schedule</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='text-light' href="/components/">Your result</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='text-light' href="/components/">Contact</NavLink>
            </NavItem>
          </Nav>
          <CgProfile className=/>
      </Navbar>
    </div>
    )
}
export default Header;