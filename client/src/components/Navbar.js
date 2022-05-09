import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Search Nasa Images
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
