import React, { Component } from 'react';
import Buscador from './Buscador'
import Producto from './entidades/Producto';
import Pagination from 'react-js-pagination';
import NotFound from './NotFound';

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
    };
  } 

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  datosBusqueda = (termino) => {
    if(this.props.categoria === -1){
        // Busca entre todos los productos
    } else {
        if(termino === "") {
          this.obtenerProductosCategoria(this.props.categoria);
          this.setState({ busqueda: false });
        }
        else {
          let URL = "http://127.0.0.1:8000/rest/productos/buscarporcategoria/"+termino+"/"+this.props.categoria;
          fetch(URL)
            .then(respuesta => respuesta.json())
            .then(resultado => this.setState({ productos: resultado, busqueda: true }))
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
        <div className="mt-2 mb-2 container d-flex flex-column align-items-center">
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
          <div className="container text-center">
            { this.state.cargando === false && (
              this.props.categoria === -1 ? 
                (<h1 className="display-4">Lista de productos</h1>) 
              : 
                <h1 className="display-4">Productos de {this.state.categorianombre}</h1>)
            }
            
            {this.state.cargando === true ?
              (<div className="mt-2">Cargando...</div>) 
            :
              this.state.productos.length === 0 ? 
                (<div className="mt-2">No se encontraron productos.</div>) 
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
    </div>
		); }
  }

}


export default ProductosLista;
