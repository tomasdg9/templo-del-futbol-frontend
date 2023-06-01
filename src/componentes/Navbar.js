

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import NB from 'react-bootstrap/Navbar';

function Navbar(props) {
  return (
    <NB collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <NB.Brand>El Templo del Fútbol ⚽</NB.Brand>
        <NB.Toggle aria-controls="responsive-NB-nav" />
        <NB.Collapse id="responsive-NB-nav">
          <Nav className="me-auto">
          <Link to={`/`} className="nav-link text-white">Inicio</Link>
          <Link to={`/productos`} className="nav-link text-white">Productos</Link>
          <Link to={`/categorias`} className="nav-link text-white">Categorias</Link>
			
          </Nav>
          <Nav>
            <Link to={`/carrito`} className="nav-link text-white"><i className="bi bi-cart4"></i> ({props.cantCarrito})</Link>
          </Nav>
        </NB.Collapse>
      </Container>
    </NB>
  );
}

export default Navbar;