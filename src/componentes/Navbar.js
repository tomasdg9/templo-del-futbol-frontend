

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NB from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbar(props) {
  return (
    <NB collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <NB.Brand>El Templo del Fútbol ⚽</NB.Brand>
        <NB.Toggle aria-controls="responsive-NB-nav" />
        <NB.Collapse id="responsive-NB-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
			<Nav.Link href="/categorias">Categorias</Nav.Link>
			
			{/* Dropdown
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
			end dropdown */ }
			
          </Nav>
          <Nav>

            <a className="nav-link text-white" href="/carrito">
                  <i className="bi bi-cart4"></i> ({props.cantCarrito})
            </a>
          </Nav>
        </NB.Collapse>
      </Container>
    </NB>
  );
}

export default Navbar;