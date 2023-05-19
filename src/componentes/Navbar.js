import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbarColor navbar-dark">
        <div className="container-fluid">
          <h1 className="navbar-brand">El Templo del Fútbol ⚽</h1>

          <button className="navbar-toggler" type="button" data-toggle="collapse" aria-label="Toggle navigation"
            aria-controls="navbarSupportedContent" aria-expanded="false" data-target="#navbarSupportedContent">
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link text-white" href="/">Inicio</a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="/productos">Productos</a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="/categorias">Categorias</a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="/contacto">Contacto</a>
              </li>

            </ul>

            {/* Iconos */}
            <ul className="navbar-nav d-flex flex-row me-1">
              <li className="nav-item me-3 me-lg-0">
                <a className="nav-link text-white" href="/carrito"><i className="bi bi-cart4"></i> ({props.cantCarrito})</a>          
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
