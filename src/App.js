import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'universal-cookie';

// Componentes
import Navbar from './componentes/Navbar';
import ProductosLista from './componentes/ProductosLista';
import CategoriasLista from './componentes/CategoriasLista';
import NotFound from './componentes/NotFound';
import Home from './componentes/Home';
import CategoriaDetalle from './componentes/entidades/CategoriaDetalle';
import Carrito from './componentes/Carrito';
import ProductoDetalle from './componentes/entidades/ProductoDetalle'
import FooterContacto from './componentes/FooterContacto'
import Login from './componentes/login/login'
import Register from './componentes/login/register'
import Perfil from './componentes/perfil'

//Contextos
import CarritoContexto from './contextos/CarritoContexto';

// Estilos
import './css/styles.css';

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    // Recuperar el estado del carrito desde localStorage
    const carrito = localStorage.getItem('carrito');
    this.state = {
      carrito: carrito ? JSON.parse(carrito) : [], 
      ingreso: !!cookies.get('email')
    };
  }

  
  iniciarSesion = () => {
    this.setState({ingreso: true});
  }
  cerrarSesion = () => {
    this.setState({ingreso: false});
  }

  guardarCarritoEnLocalStorage = () => {
    // Guardar el estado del carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.state.carrito));
  };

  

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
  
  eliminarElemento = (index) => {
    this.setState((prevState) => {
      const newList = [...prevState.carrito];
      newList.splice(index, 1);
      return { carrito: newList };
    }, () => {
      this.guardarCarritoEnLocalStorage();
    });
  };
  vaciarCarrito = () => {
    this.setState(
      {
        carrito: [],
      }, () => {this.guardarCarritoEnLocalStorage();}
    );
  };

/*
  comprarCarrito = (lista) =>{
	const token = cookies.get('token');
    const URL = "http://127.0.0.1:3001/pedidos/crear/"+token;
	console.log(URL);
    lista.map((idProd) => {
      const productoURL = URL + idProd;
      return fetch(productoURL)
        .then(respuesta => respuesta.json());
    });
  }*/

  render() {
    return (
      <Router>
        <div>
          <Navbar 
              cantCarrito={this.state.carrito.length}
              ingreso={this.state.ingreso}
              logout={this.cerrarSesion}
          />
          <CarritoContexto.Provider value={{ carrito: this.state.carrito, vaciarCarrito: this.vaciarCarrito, agregarProducto: this.agregarProducto, eliminarElemento: this.eliminarElemento}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/productos"
                element={<ProductosLista datosBusqueda={this.vaciarCarrito} categoria={-1}/>}
              />
              <Route path="/productos/:id" element={<ProductoDetalle />} />
              <Route path="/categorias" element={<CategoriasLista />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/login" element={<Login onLogin={this.iniciarSesion} />} />
              <Route path="/register" element={<Register onLogin={this.iniciarSesion} />} />
              <Route path="/categorias/:id" element={<CategoriaDetalle />} />
              <Route path="/carrito" element={<Carrito ingreso={this.state.ingreso} nombre="Prueba" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CarritoContexto.Provider>
          <Toaster />
        </div><FooterContacto></FooterContacto>
      </Router>
    );
  }
}

export default App;
