import React, { useContext, useState, useEffect } from 'react';
import CarritoContexto from '../contextos/CarritoContexto';
import Card from 'react-bootstrap/Card';
import BotonBorrar from './botones/BotonBorrar';

const Carrito = (props) => {
  const { vaciarCarrito, carrito, eliminarElemento } = useContext(CarritoContexto);
  const [productosCarrito, setProductosCarrito] = useState([]);

  const obtenerProductos = async () => {
    const URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/productos/";
    const promesas = carrito.map((idProd) => {
      const productoURL = URL + idProd;
      return fetch(productoURL)
        .then(respuesta => respuesta.json());
    });

    try {
      const productos = await Promise.all(promesas);
      setProductosCarrito(productos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    obtenerProductos();
  }, [carrito]);

  const renderProductos = () => {
    if (productosCarrito.length === 0) {
      return <div>Cargando...</div>;
    }

    return productosCarrito.map((producto) => {
      const { id, nombre, imagen, precio, stock} = producto;

      return (
        <tr key={id}>
          <th>
            <img className='imgCarrito' src={imagen} alt={nombre} />
            {nombre}
          </th>
          <td>${precio}</td>
          <td>
          <select>
            {[...Array(stock)].map((_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </select>
          </td>
          <td>
            <BotonBorrar/>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className='d-flex align-items-center justify-content-center'>
        <h1>Carrito de compras</h1>
      </div>
      <Card className='cardCarrito'>
        <div>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th scope='col'>Producto</th>
                <th scope='col'>Precio</th>
                <th scope='col'>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {renderProductos()}
            </tbody>
          </table>
          <p>Precio total: </p>
          
          <button onClick={() => vaciarCarrito()}>Vaciar</button>
        </div>
      </Card>
    </div>
  );
};

export default Carrito;