import React, { Component } from 'react';
import Categoria from "./entidades/Categoria"
import Buscador from './Buscador'
import Pagination from 'react-js-pagination';

class CategoriasLista extends Component {
  state = {
    categorias: [
      { id: 1, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 11, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 12, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 13, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 14, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 15, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 16, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 17, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 18, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 19, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 21, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 221, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 231, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 41, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 51, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 61, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 71, nombre: 'Categoría 1', descripcion: 'Prueba' },
      { id: 1231, nombre: 'Categoría 1', descripcion: 'Prueba' },
    ],
    currentPage: 1,
    itemsPerPage: 9,
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  componentDidMount() { // Ejecuta cuando se abre la pagina
    this.obtenerCategorias();
  }

  obtenerCategorias = () => {
    // Realizar la llamada a la API para obtener las categorías
    // y actualizar el estado con los datos recibidos.
  };

  datosBusqueda = (termino) => {
      //probando comunicacion padre-hijo
  };

  render() {
    const { categorias, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const categoriasPaginadas = categorias.slice(startIndex, endIndex);

    return (
      <div>
        <div className="d-flex justify-content-end">
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <div className="container text-center">
          <h1 className="display-4">Lista de categorias</h1>
          {categorias.length === 0 ? (
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
