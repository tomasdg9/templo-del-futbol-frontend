import React, { Component } from 'react';
import Buscador from './Buscador'
import Producto from './entidades/Producto';

class ProductosLista extends Component {

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

  render() {
	  return (
    
    <div className="mt-2 mb-2 container d-flex flex-column align-items-center">
        <Buscador 
          datosBusqueda={this.datosBusqueda}
        />
		    <h2>Lista de productos</h2>  
        <div className="row justify-content-center">
            {this.buscarProductosCategorias(this.props.categorias)}
        </div>
		</div>
		);
  }

  buscarProductosCategorias = (categorias) =>{
        if(categorias == -1){
            //aca se obtendrian todos los productos de la pagina inicial
            return(<Producto 
                id={1}
                categoria={categorias}
                nombre="Producto 1" 
                imagen="/img/logo.jpg"
                precio={5000}
              />)
        }else{
            return(<Producto
                //aca tendria que obtener cada producto correspondiente a la categoria pasada por parametro
                    nombre="Producto Categoria"
                    imagen="/img/logo.jpg"
                    precio={5000}
                />)
        }
    }

}


export default ProductosLista;
