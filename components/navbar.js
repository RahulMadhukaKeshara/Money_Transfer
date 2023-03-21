import Link from 'next/link'
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';


function Navigationbar() {

  const router = useRouter();
  const [token, setToken] = useState(null);
  let jwt

  const handleUser=(text)=>{
    if (token) {
      if (text === 'home') {
        router.push('/user')
      } else {
        router.push('/fund-transfer')
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Please Sign In!',
    })
    }
  }

  const handleSignOut = () => {
    localStorage.clear();
    // router.push('/')
    window.location = '/'
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <>
      <Navbar fixed="top" collapseOnSelect expand="md" className='navbar'>
        <Navbar.Brand href='/user' className='nav-logo'>Money Transfer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ham_icon" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-links ml-auto">
            <Nav.Link onClick={()=>handleUser('home')}>Home</Nav.Link>
            <Nav.Link onClick={()=>handleUser('transfer')}>Transfer Money</Nav.Link>
            {
              token ?
                (
                  <Button className="navbar-btn" onClick={handleSignOut}>Sign Out</Button>
                ) : ('')
            }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navigationbar

