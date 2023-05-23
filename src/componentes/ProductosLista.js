import React, { Component } from 'react';
import Buscador from './Buscador'
import Producto from './entidades/Producto';

class ProductosLista extends Component {

  constructor(props) {
    super(props);
    this.state = {
        productos: [],
    };
}

  // "termino" es lo que recibe del "buscador"
  // podriamos hacer que aca busque por prefijo entre los productos
  // es decir hacer un nuevo método en la API que sea /productos/busqueda/{prefijo} y devuelve todos los productos con ese prefijo (no mayus sensible)
  // lo mismo para categorias. /categorias/busqueda/{prefijo}

  /*
    Para los filtros, cuando llame a la API se guardan los Productos en un array
    y al apretar el filtro tengo que ordenar ese array segun el criterio y se volvería a renderizar
  */

  datosBusqueda = (termino) => {
    this.props.datosBusqueda(termino); // Invoca la función "datosBusqueda" con "termino" de su padre
  }

  componentDidMount() { // Ejecuta cuando se abre la pagina
    if(this.props.categoria === -1){
    
    } else { // Obtiene los productos de cierta categoria por ID.
      this.obtenerProductosCategoria(this.props.categoria);
    }
  }

  obtenerProductosCategoria = (id) => {
    let URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/productos/categoria/" + id;
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ productos: resultado }))
      .catch(error => console.log(error));
  }

  render() {
	  return (
    
    <div className="mt-2 mb-2 container d-flex flex-column align-items-center">
        <Buscador 
          datosBusqueda={this.datosBusqueda}
        />

        <div className="container text-center">
        {this.props.categoria === -1 ? (<h1 className="display-4">Lista de productos</h1>) :
          <h1 className="display-4">Lista de productos de la categoria {this.props.nombrecategoria}</h1>}
          {this.state.productos.length === 0 ? (
            <div className="mt-2">No se encontraron productos.</div>
          ) : (
            <div>
              <div className="row justify-content-center mt-2">
                {this.state.productos.map((producto) => (
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
		);
  }

}


export default ProductosLista;
