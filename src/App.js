import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import ProductosLista from './componentes/ProductosLista';
import CategoriasLista from './componentes/CategoriasLista';
import NotFound from './componentes/NotFound';
import Home from './componentes/Home';
import CategoriaDetalle from './componentes/entidades/CategoriaDetalle';
import './css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Recuperar el estado del carrito desde localStorage
    const carrito = localStorage.getItem('carrito');
    this.state = {
      carrito: carrito ? JSON.parse(carrito) : [1,4,3],
    };
  }

  guardarCarritoEnLocalStorage = () => {
    // Guardar el estado del carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.state.carrito));
  };

  datosBusqueda = (termino) => {
    console.log(termino);
  };

  agregarProducto = (id) => {
    
  };

  eliminarProducto = (id) => {
    
  };

  vaciarCarrito = () => {
    // Vaciar el carrito
    this.setState(
      {
        carrito: [],
      }, () => {this.guardarCarritoEnLocalStorage();}
    );
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <p>Carrito: (productos ids) {this.state.carrito}</p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/productos"
              element={<ProductosLista datosBusqueda={this.vaciarCarrito} />}
            />
            <Route path="/categorias" element={<CategoriasLista />} />
            <Route path="/categorias/:id" element={<CategoriaDetalle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
