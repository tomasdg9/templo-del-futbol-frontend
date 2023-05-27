import React, { useContext, useState, useEffect } from 'react';
import CarritoContexto from '../contextos/CarritoContexto';
import Card from 'react-bootstrap/Card';
import BotonBorrar from './botones/BotonBorrar';
import BotonVaciar from './botones/BotonVaciar';
import BotonComprar from './botones/BotonComprarCarrito';
import BotonComprarCarrito from './botones/BotonComprarCarrito';

const Carrito = (props) => {
  const { vaciarCarrito, carrito, eliminarElemento } = useContext(CarritoContexto);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cantidadesSeleccionadas, setCantidadesSeleccionadas] = useState([]);

  const obtenerProductos = async () => {
    const URL = "http://127.0.0.1:8000/rest/productos/";
    const promesas = carrito.map((idProd) => {
      const productoURL = URL + idProd;
      return fetch(productoURL)
        .then(respuesta => respuesta.json());
    });

    try {
      const productos = await Promise.all(promesas);
      setProductosCarrito(productos);
      setCantidadesSeleccionadas(Array(productos.length).fill(1)); // Inicializar las cantidades seleccionadas a 1
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerPrecio = () => {
    let precioTotal = 0;
    productosCarrito.forEach((producto, index) => {
      const { precio } = producto;
      const cantidad = cantidadesSeleccionadas[index];
      const precioFloat = parseFloat(precio);
      const subtotal = precioFloat * cantidad;
      precioTotal += subtotal;
    });

    return <text>{precioTotal.toFixed(2)}</text>;
  };

  const handleCantidadSeleccionada = (index, e) => {
    const cantidad = parseInt(e.target.value);
    const nuevasCantidades = [...cantidadesSeleccionadas];
    nuevasCantidades[index] = cantidad;
    setCantidadesSeleccionadas(nuevasCantidades);
  };

  useEffect(() => {
    obtenerProductos();
  }, [carrito]);

  const renderProductos = () => {
    if (productosCarrito.length === 0) {
      return <div>Cargando...</div>;
    }

    return productosCarrito.map((producto, index) => {
      const { id, nombre, imagen, precio, stock} = producto;

      return (
        <tr key={id}>
          <th>
            <img className='imgCarrito' src={imagen} alt={nombre} />
            {nombre}
          </th>
          <td>${precio}</td>
          <td>
          <select value={cantidadesSeleccionadas[index]} onChange={(e) => handleCantidadSeleccionada(index, e)}>
            {[...Array(stock)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          </td>
          <td>
            <BotonBorrar onClick={() => eliminarElemento(index)}/>
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
                <th scope='col'>Precio unitario</th>
                <th scope='col'>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {renderProductos()}
            </tbody>
          </table>
          <div className='d-flex align-items-center justify-content-center'><Card className='precioCarrito'><b>Precio total: ${obtenerPrecio()}</b></Card></div>
          <div className='d-flex align-items-center justify-content-center'>
          
          <form>
          <br/>
            <label>
              Cliente (*):  
              <input className='email' type="text" name="email" placeholder='cliente@gmail.com' />
            </label>
          </form></div><br/>
          <div className='d-flex align-items-center justify-content-center'>
            <BotonVaciar onClick={() => vaciarCarrito()}></BotonVaciar>
            <BotonComprarCarrito></BotonComprarCarrito>
          </div>
          <br/>
        </div>
      </Card>
    </div>
  );
};

export default Carrito;