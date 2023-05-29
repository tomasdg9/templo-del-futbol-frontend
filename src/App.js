import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// Componentes
import Navbar from './componentes/Navbar';
import ProductosLista from './componentes/ProductosLista';
import CategoriasLista from './componentes/CategoriasLista';
import NotFound from './componentes/NotFound';
import Home from './componentes/Home';
import CategoriaDetalle from './componentes/entidades/CategoriaDetalle';
import Carrito from './componentes/Carrito';
import ProductoDetalle from './componentes/entidades/ProductoDetalle'


//Contextos
import CarritoContexto from './contextos/CarritoContexto';

// Estilos
import './css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Recuperar el estado del carrito desde localStorage
    const carrito = localStorage.getItem('carrito');
    this.state = {
      carrito: carrito ? JSON.parse(carrito) : [1,4,3], // Carrito de prueba
    };
  }

  guardarCarritoEnLocalStorage = () => {
    // Guardar el estado del carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.state.carrito));
  };

  datosBusqueda = (termino) => {
    console.log(termino);
  };

  // Pruebas comunicacion con context
  agregarProducto = (id) => {
    if (!this.state.carrito.includes(id)) {
      this.setState(
        (prevState) => ({
          carrito: prevState.carrito.concat(id)
        }),
        () => {
          this.guardarCarritoEnLocalStorage();
        }
      );
      console.log(this.state.carrito)
      toast('Producto agregado al carrito', {
        duration: 2000,
        position: 'bottom-right',
        type: 'success'
      });
    }else{
      toast('El producto ya está en el carrito', {
        duration: 2000,
        position: 'bottom-right',
        type: 'error'
      });
    }
  };
  
  //esto anda bien con el index, no hay que modificarlo
  eliminarElemento = (index) => {
    this.setState((prevState) => {
      const newList = [...prevState.carrito];
      newList.splice(index, 1);
      return { carrito: newList };
    }, () => {
      this.guardarCarritoEnLocalStorage();
    });
  };

  eliminarElementos = (elementos) => {
    // No funciona. Seguir con esto.
  };
  
  

  

  

  vaciarCarrito = () => {
    this.setState(
      {
        carrito: [],
      }, () => {this.guardarCarritoEnLocalStorage();}
    );
  };

  comprarCarrito = (lista) =>{
    const URL = "http://127.0.0.1:8000/rest/pedidos/crear/";
    const compra = lista.map((idProd) => {
      const productoURL = URL + idProd;
      return fetch(productoURL)
        .then(respuesta => respuesta.json());
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar 
              cantCarrito={this.state.carrito.length}
          />
          {/*<p>Carrito: (productos ids) {this.state.carrito}</p>*/}
          { /* test contextos de react */ }
          <CarritoContexto.Provider value={{ carrito: this.state.carrito, vaciarCarrito: this.vaciarCarrito, agregarProducto: this.agregarProducto, eliminarElemento: this.eliminarElemento, eliminarElementos: this.eliminarElementos}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/productos"
                element={<ProductosLista datosBusqueda={this.vaciarCarrito} categoria={-1}/>}
                // Esto es un ejemplo como comunicar a los componentes hijo-padre usando funciones 
                // pero con el texto se puede solucionar si no son clases.
                // son dos formas distintas de hacerlo
              />
              <Route path="/productos/:id" element={<ProductoDetalle />} />

              <Route path="/categorias" element={<CategoriasLista />} />
              <Route path="/categorias/:id" element={<CategoriaDetalle />} />
              <Route path="/carrito" element={<Carrito nombre="Prueba" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CarritoContexto.Provider>
          <Toaster />
        </div>
      </Router>
    );
  }
}

export default App;
