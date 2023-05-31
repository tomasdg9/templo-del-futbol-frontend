import React, { Component } from 'react';
import Buscador from './Buscador'
import Producto from './entidades/Producto';
import Pagination from 'react-js-pagination';
import NotFound from './NotFound';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';

/*
  En vez de hacer tantas llamadas a la API cuando se busca, por qué no almacenar todos los productos disponibles en "productos"
  y cuando se tengan que mostrar se use otro state que sea productosamostrar y que ahi filtre segun lo que ingresa el usuario
*/
class ProductosLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
        productos: [],
        categorianombre: "",
        cargando: true,
        busqueda: false,
        currentPage: 1,
        itemsPerPage: 9,
        noExiste: false,
        keyBuscador: 0, // Esto funciona para borrar el value del buscador al momento de limpiar la busqueda.
    };
  } 
  


  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  limpiarBusqueda = () => {
    this.setState({
      busqueda: false, 
    });
    this.setState((prevState) => ({
      keyBuscador: prevState.keyBuscador + 1 
    }));
    this.datosBusqueda("");
    toast('Productos restablecidos', {
      duration: 2000,
      position: 'bottom-right',
      type: 'success'
    });
  };
  
  datosBusqueda = (termino) => {
    if(this.props.categoria === -1){
        if(termino === "") {
          this.obtenerProductos();
          this.setState({ busqueda: false });
        }
        else {
          let URL = "http://127.0.0.1:8000/rest/productos/buscar/"+termino;
          fetch(URL)
            .then(respuesta => respuesta.json())
            .then(resultado => { this.setState({ productos: resultado, busqueda: true })
            
            if (resultado.length > 0) {
              toast('Búsqueda exitosa', {
                duration: 2000,
                position: 'bottom-right',
                type: 'success'
              });
            } else {
              toast('No se encontraron resultados', {
                duration: 2000,
                position: 'bottom-right',
                type: 'error'
              });
            }
            })
            .catch(error => console.log(error));
          }
    } else {
        if(termino === "") {
          this.obtenerProductosCategoria(this.props.categoria);
          this.setState({ busqueda: false });
        }
        else {
          let URL = "http://127.0.0.1:8000/rest/productos/buscarporcategoria/"+termino+"/"+this.props.categoria;
          fetch(URL)
            .then(respuesta => respuesta.json())
            .then(resultado => {this.setState({ productos: resultado, busqueda: true })
            if (resultado.length > 0) {
              toast('Búsqueda exitosa', {
                duration: 2000,
                position: 'bottom-right',
                type: 'success'
              });
            } else {
              toast('No se encontraron resultados', {
                duration: 2000,
                position: 'bottom-right',
                type: 'error'
              });
            }
            })
            .catch(error => console.log(error));
          }
    }
  }

  componentDidMount() { // Ejecuta cuando se abre la pagina
    if(this.props.categoria === -1){
      this.obtenerProductos();
    } else {
      this.obtenerProductosCategoria(this.props.categoria);
    }
  }
  

  obtenerProductos = () => {
    let URL = "http://127.0.0.1:8000/rest/productos/filtrar/";
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        this.setState({ productos: resultado });
        this.setState({ cargando: false });
      })
      .catch(error => console.log(error));
  }


  obtenerProductosCategoria = (id) => {
    let URL = "http://127.0.0.1:8000/rest/productos/categoria/" + id;
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
          this.setState({ productos: resultado,
                          cargando: false });
        }
        
      })
      .catch(error => console.log(error));

    let URL2 = "http://127.0.0.1:8000/rest/categorias/" + id;
    fetch(URL2)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        this.setState({categorianombre: resultado.nombre})
      })
      .catch(error => console.log(error));
  }
  
  render() {
    if(this.state.noExiste === true){
        return (<div><NotFound /></div>);
    } else {
      const { productos, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productosPaginados = productos.slice(startIndex, endIndex);
	  return (
    <div>
        <div className="mt-2 d-flex justify-content-end">
        {this.state.productos.length > 0 && this.state.busqueda === true &&
          <button onClick={this.limpiarBusqueda} className="btn mx-1 btn-sm btn-danger">Limpiar busqueda</button>
        } { this.state.productos.length > 0 &&
          <Buscador 
            datosBusqueda={this.datosBusqueda}
            key={this.state.keyBuscador}
          /> }
        </div>
        <div className="mt-2 mb-2 container d-flex flex-column align-items-center">
        
          <div className="container text-center">
            { this.state.cargando === false && (
              this.props.categoria === -1 ? 
                (<h1 className="display-4">Lista de productos</h1>) 
              : 
                <h1 className="display-4">Productos de {this.state.categorianombre}</h1>)
            }
            
            {this.state.cargando === true ?
              (<div className="mt-2"><CircularProgress /></div>) 
            :
              this.state.productos.length === 0 ? 
                (<div className="mt-2">No se encontraron productos.
                <br></br>
                <button onClick={this.limpiarBusqueda} className="btn mb-2 mx-1 btn-sm btn-danger">Limpiar busqueda</button></div>) 
              : 
                (
                  <div>
                    <div className="row justify-content-center mt-2">
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
                    </div>
                  </div>
                )}
        </div>
      </div>
      { this.state.productos.length > 0 &&
      <div className="container ">
        <div className="pagination">
          <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={productos.length}
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
