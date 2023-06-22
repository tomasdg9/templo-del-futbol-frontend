import React, { Component } from 'react';
import Categoria from "./entidades/CategoriaNew"
import Buscador from './Buscador'
import Pagination from 'react-js-pagination';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';
import Grid from '@mui/material/Grid';
class CategoriasLista extends Component {

  constructor(props) {
      super(props);
      this.state = {
          categorias: [],
          categoriasamostrar: [],
          currentPage: 1,
          itemsPerPage: 8,
          busqueda: false,
		      cargando: true,
          keyBuscador: 0, // Esto funciona para borrar el value del buscador al momento de limpiar la busqueda.
      };
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  componentDidMount() { // Ejecuta cuando se abre la pagina
    this.obtenerCategorias();
  }
  
  datosBusqueda = (termino) => {
    if(termino === "") {
      this.setState({ busqueda: false, categoriasamostrar: this.state.categorias, currentPage: 1 });
    }
    else {
      const categoriasFiltradas = this.state.categorias.filter(categoria =>
        categoria.nombre.toLowerCase().startsWith(termino.toLowerCase())
      );
      if (categoriasFiltradas.length > 0) {
        toast('Búsqueda exitosa', {
          duration: 2000,
          position: 'bottom-right',
          type: 'success'
        });
        this.setState({categoriasamostrar: categoriasFiltradas, busqueda:true, currentPage: 1 });
      } else {
        toast('No se encontraron resultados', {
          duration: 2000,
          position: 'bottom-right',
          type: 'error'
        });
      }
      }
      
  };

  // Unica llamada a la API
  obtenerCategorias = () => {
    let URL = "http://127.0.0.1:8000/rest/categorias";
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ categorias: resultado, cargando:false, categoriasamostrar: resultado }))
      .catch(error => console.log(error));
  }
  

  limpiarBusqueda = () => {
    this.setState((prevState) => ({
      busqueda: false, 
      keyBuscador: prevState.keyBuscador + 1,
      categoriasamostrar: this.state.categorias,
      currentPage: 1
    }));
    toast('Categorias restablecidas', {
      duration: 2000,
      position: 'bottom-right',
      type: 'success'
    });
  };

  render() {
    const { categoriasamostrar, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const categoriasPaginadas = categoriasamostrar.slice(startIndex, endIndex);

    return (
      <div>
        <div className="mt-2 d-flex justify-content-end">
        {this.state.categoriasamostrar.length > 0 && this.state.busqueda === true &&
              <button onClick={this.limpiarBusqueda} className="btn mx-1 btn-sm btn-danger">Limpiar busqueda</button>
        }   {this.state.categoriasamostrar.length > 0 &&
          <Buscador 
            datosBusqueda={this.datosBusqueda} 
            key={this.state.keyBuscador} />
        }
        </div>
        <div className="container text-center">
		  {this.state.cargando === true ? 
      <div>
        <div className="mt-2"><CircularProgress /></div>
      </div> :
          categoriasamostrar.length === 0 ? ( <div><h1 className="display-4">Lista de categorias</h1>
            <div className="mt-2">No se encontraron categorias.<br></br>
            {this.state.categorias.length > 0 && <button onClick={this.limpiarBusqueda} className="btn mb-2 mx-1 btn-sm btn-danger">Limpiar busqueda</button>}
            </div></div>
          ) : (
            <div>
              <h1 className="display-4">Lista de categorias</h1>
              <div className="d-flex justify-content-center">
                <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                  {categoriasPaginadas.map((categoria) => (
                    <Categoria
                      key={categoria.id}
                      id={categoria.id}
                      nombre={categoria.nombre}
                      descripcion={categoria.descripcion}
                    />
                  ))}
                </Grid>
              </div>
            </div>
          )}
        </div>
        { this.state.categoriasamostrar.length > 0 &&
        <div className="container mt-2">
            <div className="pagination">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={categoriasamostrar.length}
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
    );
  }
}

export default CategoriasLista;
