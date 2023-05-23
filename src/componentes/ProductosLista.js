import React, { Component } from 'react';
import Buscador from './Buscador'
import Producto from './entidades/Producto';

class ProductosLista extends Component {

  constructor(props) {
    super(props);
    this.state = {
        productos: [],
        categorianombre: "",
        cargando: true,
        busqueda: false,
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
    console.log(termino); // Invoca la función "datosBusqueda" con "termino" de su padre
    if(this.props.categoria === -1){
        // Busca entre todos los productos
    } else {
        // Busca entre todos los productos de la categoria. Testear en Vercel.
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
    
    } else { // Obtiene los productos de cierta categoria por ID.
      this.obtenerProductosCategoria(this.props.categoria);
    }
  }


  obtenerProductosCategoria = (id) => {
    let URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/productos/categoria/" + id;
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        if (resultado?.mensaje === "La categoría no tiene productos") {
          this.setState({ productos: [] });
        } else {
          this.setState({ productos: resultado });
        }
        this.setState({ cargando: false });
      })
      .catch(error => console.log(error));

      let URL2 = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/categorias/" + id;
      fetch(URL2)
        .then(respuesta => respuesta.json())
        .then(resultado => {
          this.setState({categorianombre: resultado.nombre})
        })
        .catch(error => console.log(error));
  }
  

  render() {
	  return (
    
    <div className="mt-2 mb-2 container d-flex flex-column align-items-center">
        <Buscador 
          datosBusqueda={this.datosBusqueda}
        />

        <div className="container text-center">
        { this.state.cargando === false && (
        this.props.categoria === -1 ? (<h1 className="display-4">Lista de productos</h1>) :
          <h1 className="display-4">Productos de {this.state.categorianombre}</h1>)}
        {this.state.cargando === true ?
            (<div className="mt-2">Cargando...</div>) :
          this.state.productos.length === 0 ? (
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
