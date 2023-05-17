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
    console.log(termino)
  }

  render() {
	  return (
    
    <div className="mt-2 mb-2 container d-flex flex-column align-items-center">
        <Buscador 
          datosBusqueda={this.datosBusqueda}
        />
		    <h2>Lista de productos</h2>  
        <div className="row justify-content-center">
          
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
               <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
               <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              <Producto 
                  nombre="Producto 1" 
                  imagen="/img/logo.jpg"
                  descripcion="Prueba producto" 
              />
              
        </div>
		</div>
		);
  }

}

export default ProductosLista;
