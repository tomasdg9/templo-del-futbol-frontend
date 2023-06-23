import React, { useState, useEffect }  from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import NB from 'react-bootstrap/Navbar';
import Cookies from 'universal-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { BiFootball } from 'react-icons/bi';


const cookies = new Cookies();

function Navbar(props) {
  const handleLogout = () => {
    cookies.remove('email');
    cookies.remove('token');
    props.logout();
    toast('Se cerró la sesión', {
      duration: 2000,
      position: 'bottom-right',
      type: 'success'
    });
  };

  return (
    <NB collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
      <Toaster />
        <NB.Brand>
          El Templo del Fútbol&nbsp;
          <BiFootball className="mr-2" />
        </NB.Brand>
        <NB.Toggle aria-controls="responsive-NB-nav" />
        <NB.Collapse id="responsive-NB-nav">
          <Nav className="me-auto">
            <Link to={`/`} className="nav-link text-white">Inicio</Link>
            <Link to={`/productos`} className="nav-link text-white">Productos</Link>
            <Link to={`/categorias`} className="nav-link text-white">Categorias</Link>
          </Nav>
          <Nav>
            <Link to={`/carrito`} className="nav-link text-white">
              <i className="bi bi-cart4"></i> ({props.cantCarrito})
            </Link>
            { props.ingreso && (<Link to={`/perfil`} className="nav-link text-white">
                <i class="bi bi-file-person-fill"></i>
                </Link>)
              }
            { props.ingreso && (
                <a className="nav-link text-white" onClick={handleLogout}><i className=" bi bi-box-arrow-right"></i></a>
                
            )}

          { !props.ingreso && (
            <Link to={`/login`} className="nav-link text-white">
            <i className="bi bi-person"></i>
          </Link>
          )}
          </Nav>
        </NB.Collapse>
      </Container>
    </NB>
  );
}

export default Navbar;
