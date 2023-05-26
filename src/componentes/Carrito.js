import React, { useContext, useState } from 'react';
import CarritoContexto from '../contextos/CarritoContexto';
import Card from 'react-bootstrap/Card';

const Carrito = (props) => {
  const { vaciarCarrito, carrito } = useContext(CarritoContexto);
  const [producto, setProducto] = useState(null);

  const obtenerProducto = (id) => {
    const URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/productos/" + id;
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        setProducto(resultado);
      })
      .catch(error => console.log(error));
  }

  const productos = carrito.map((idProd) => {
    
    obtenerProducto(idProd);
  
    if (!producto) {
      return <div>Cargando...</div>;
    }
    const { nombre, imagen, precio, stock } = producto;
  
    return (
      <div >
        <table class="table table-striped table-hover">
          <tbody>
        <tr>
          <th scope='row'><img className='imgCarrito' src={imagen} ></img>{nombre}</th>
          <td>${precio}</td>
          <td>4</td>
          </tr>
          </tbody>
        {/* Aquí puedes utilizar los datos del producto para renderizar lo que necesites */}
       
        {/* ...otros elementos del producto */}
        </table>
      </div>
    );
  });

  return (
    <div>
      <div class='d-flex align-items-center justify-content-center'>
        <h1>Carrito de compras</h1>
      </div>
      <Card className='cardCarrito'>
        <div>
          <table class="table table-striped table-hover">
          <thead>
        <tr>
          <th scope="col">Producto</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
        </tr>
      </thead>
      
      <tbody>
        {productos}
        
        
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry the Bird</td>
          <td>col 3</td>
        </tr>
      </tbody>

          </table>
            <p>Soy el carrito {props.nombre}!</p>
          <button onClick={() => vaciarCarrito()}>Vaciar</button>
        </div>
      </Card>
    </div>
  );
};

export default Carrito;
