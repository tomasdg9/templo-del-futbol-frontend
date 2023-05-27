import React, { Component } from 'react';
import Categoria from "./entidades/Categoria"
import Buscador from './Buscador'
import Pagination from 'react-js-pagination';

class CategoriasLista extends Component {

  constructor(props) {
      super(props);
      this.state = {
          categorias: [],
          currentPage: 1,
          itemsPerPage: 9,
          busqueda: false,
		      cargando: true,
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
      this.obtenerCategorias();
      this.setState({ busqueda: false });
    }
    else {
      let URL = "http://127.0.0.1:8000/rest/categorias/buscar/"+termino;
      fetch(URL)
        .then(respuesta => respuesta.json())
        .then(resultado => this.setState({ categorias: resultado, busqueda: true }))
        .catch(error => console.log(error));
      }
      
  };

  obtenerCategorias = () => {
    let URL = "http://127.0.0.1:8000/rest/categorias";
    
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ categorias: resultado, cargando:false }))
      .catch(error => console.log(error));
  }
  

  limpiarBusqueda = () => {
    this.setState({
      busqueda: false, 
      categorias: [], 
    });
    this.obtenerCategorias();
  };

  render() {
    const { categorias, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const categoriasPaginadas = categorias.slice(startIndex, endIndex);

    return (
      <div>
        <div className="mt-2 d-flex justify-content-end">
        { this.state.busqueda === true &&
          <button onClick={this.limpiarBusqueda} className="btn mx-1 btn-sm btn-danger">Limpiar busqueda</button>
        }
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <div className="container text-center">
          <h1 className="display-4">Lista de categorias</h1>
		  {this.state.cargando === true ? <div className="mt-2">Cargando...</div> :
          categorias.length === 0 ? (
            <div className="mt-2">No se encontraron categorias.</div>
          ) : (
            <div>
              <div className="row justify-content-center mt-2">
                {categoriasPaginadas.map((categoria) => (
                  <Categoria
                    key={categoria.id}
                    id={categoria.id}
                    nombre={categoria.nombre}
                    descripcion={categoria.descripcion}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="container ">
            <div className="pagination">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={categorias.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        </div>
      </div>
    );
  }
}

export default CategoriasLista;
