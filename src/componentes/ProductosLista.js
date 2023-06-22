import React, { Component } from 'react';
import Buscador from './Buscador'
import Producto from './entidades/Producto';
import Pagination from 'react-js-pagination';
import NotFound from './NotFound';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';

import Grid from '@mui/material/Grid';

class ProductosLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
        productos: [],
        productosamostrar: [],
        categorianombre: "",
        cargando: true,
        busqueda: false,
        currentPage: 1,
        itemsPerPage: 8,
        noExiste: false,
        keyBuscador: 0, // Esto funciona para borrar el value del buscador al momento de limpiar la busqueda.
    };
  } 

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  limpiarBusqueda = () => {
    this.setState((prevState) => ({
      busqueda: false, 
      keyBuscador: prevState.keyBuscador + 1,
      currentPage: 1
    }), () => { // Se ejecuta luego de actualizar el state
      this.datosBusqueda("")
    });
    toast('Productos restablecidos', {
      duration: 2000,
      position: 'bottom-right',
      type: 'success'
    });
  };
  
  datosBusqueda = (termino) => {
        if(termino === "") {
          this.setState({ busqueda: false, productosamostrar: this.state.productos, currentPage: 1 });
        }
        else {
          const productosFiltrados = this.state.productos.filter(producto =>
            producto.nombre.toLowerCase().startsWith(termino.toLowerCase())
          );
          if (productosFiltrados.length > 0) {
            toast('Búsqueda exitosa', {
              duration: 2000,
              position: 'bottom-right',
              type: 'success'
            });
            this.setState({productosamostrar: productosFiltrados, busqueda:true, currentPage: 1 });
          } else {
            toast('No se encontraron resultados', {
              duration: 2000,
              position: 'bottom-right',
              type: 'error'
            });
          }
          }
  }

  componentDidMount() { // Ejecuta cuando se abre la pagina
      this.getProductos(this.props.categoria);
  }

  getProductos = (id) => {
    let URL = "";
    if(id === -1){
      URL = "http://127.0.0.1:8000/rest/productos/filtrar/";
    } else {
      URL = "http://127.0.0.1:3001/productos/categoria/"+id;
      // Obtiene el nombre de la categoría
      fetch("http://127.0.0.1:3001/categorias/"+id)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        this.setState({categorianombre: resultado.nombre})
      })
      .catch(error => console.log(error));
    }
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        if (resultado?.mensaje === "La categoría no tiene productos") {
          this.setState(
            { cargando: false }
          );
        } else if(resultado?.mensaje === "Categoria no encontrada"){
          this.setState({ noExiste: true,
                          cargando: false });
        } else {
          this.setState({ productos: resultado, productosamostrar: resultado,
                          cargando: false });
        }
        
      })
      .catch(error => console.log(error));
  }
  
  renderTitulosProductos = () => {
    if(this.props.categoria === -1){
      return (<h1 className="display-4">Lista de productos</h1>);
    } else {
      return (<h1 className="display-4">Productos de {this.state.categorianombre}</h1>);
    }
  }

  render() {
    if(this.state.noExiste === true){
        return (<div><NotFound /></div>);
    } else {
    
    const { productosamostrar, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productosPaginados = productosamostrar.slice(startIndex, endIndex);
	  return (
    <div>
        <div className="mt-2 d-flex justify-content-end">
          { /* Buscador de productos */ }
          { this.state.productosamostrar.length > 0 && this.state.busqueda === true &&
            <button onClick={this.limpiarBusqueda} className="btn mx-1 btn-sm btn-danger">Limpiar busqueda</button>
          } { this.state.productosamostrar.length > 0 &&
            <Buscador 
              datosBusqueda={this.datosBusqueda}
              key={this.state.keyBuscador}
            /> }
        </div>
        <div className="mt-2 mb-2 container d-flex flex-column align-items-center">
          <div className="container text-center">
            { this.state.cargando === false && 
                this.renderTitulosProductos() // Se renderiza el titulo de la lista de productos.
            }
            
            {this.state.cargando === true ?
              (<div className="mt-2"><CircularProgress /></div>) 
            :
              this.state.productosamostrar.length === 0 ? 
                (<div className="mt-2">No se encontraron productos.
                <br></br>
                {this.state.productos.length > 0 && <button onClick={this.limpiarBusqueda} className="btn mb-2 mx-1 btn-sm btn-danger">Limpiar busqueda</button>}</div>) 
              : 
                (
                  <div className="d-flex justify-content-center">
                    <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                      {productosPaginados && productosPaginados.map((producto) => (
                        <Producto
                          key={producto.id}
                          categoria={producto.categoria_id}
                          id={producto.id}
                          nombre={producto.nombre}
                          descripcion={producto.descripcion}
                          precio={producto.precio}
                          imagen={producto.imagen}
                        />
                      ))}
                    </Grid>
                  </div>
                )}
        </div>
      </div>
      { /* Barra de paginación */ }
      { this.state.productosamostrar.length > 0 &&
      <div className="container mt-2">
        <div className="pagination">
          <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={productosamostrar.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
          />
        </div>
      </div>
      }
      <Toaster />
    </div>
		); }
  }

}


export default ProductosLista;
