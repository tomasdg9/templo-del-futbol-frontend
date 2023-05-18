import React, { Component } from 'react';
import Categoria from "./entidades/Categoria"
import Buscador from './Buscador'
import ReactPaginate from 'react-paginate';

class CategoriasLista extends Component{

    state = {
        categorias: [
            { id: 1, nombre: 'Categoría 1', descripcion: 'Prueba' },
            { id: 2, nombre: 'Categoría 2', descripcion: 'addassad' },
            { id: 3, nombre: 'Categoría 3', descripcion: '12312213' },
          ],
        currentPage: 0, // Página actual
        itemsPerPage: 12, // Cantidad de categorías por página
    };

    handlePageClick = data => {
        const { selected } = data;
        this.setState({
          currentPage: selected,
        });
    };

    componentDidMount() {
        this.obtenerCategorias(); // Ejecuta obtenerCategorias() cuando se ejecuta el componente
    }

    obtenerCategorias = () =>{
        // Hay que configurar en Laravel para no tener CORS. Ya lo hice. Hacer el push.
        /*      let URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/categorias"
        fetch(URL)
            .then(respuesta => respuesta.json)
            .then(resultado => console.log(resultado))
        */
    }

    datosBusqueda = (termino) => {
       /* const { categorias } = this.state;
        const nuevaCategoria = {
          id: categorias.length + 1, // Generar un nuevo ID único
          nombre: 'Nueva Categoría',
          descripcion: 'Descripción de la nueva categoría',
        };
        this.setState(prevState => ({
          categorias: [...prevState.categorias, nuevaCategoria],
        }));*/
    };

    render(){
        const { categorias, currentPage, itemsPerPage } = this.state;

        // Calcular el índice inicial y final de las categorías según la página actual
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const categoriasPaginadas = categorias.slice(startIndex, endIndex);

        
        return(
            <div className="container text-center">
                <h1>Lista de categorias</h1>
                <Buscador datosBusqueda={this.datosBusqueda} />
                {this.state.categorias.length === 0 ? ( // No hay categorias
                    <div className="mt-2">No se encontraron categorias.</div>
                ) : 
                (<div> {/* // Hay categorias */ }
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
                <ReactPaginate
                    previousLabel={<span className="btn btn-info">Anterior</span>}
                    nextLabel={<span className="btn btn-info">Siguiente</span>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(categorias.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    activeClassName={"active"}
                    pageClassName="btn btn-success mx-1"
                />
                </div>)}
                
            </div>
        );
    }

}

export default CategoriasLista;