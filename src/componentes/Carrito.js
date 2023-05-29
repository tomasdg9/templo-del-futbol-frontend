import React, { useContext, useState, useEffect } from 'react';
import CarritoContexto from '../contextos/CarritoContexto';
import Card from 'react-bootstrap/Card';
import BotonBorrar from './botones/BotonBorrar';
import BotonVaciar from './botones/BotonVaciar';
import BotonComprarCarrito from './botones/BotonComprarCarrito';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Modal } from 'react-bootstrap';


const Carrito = (props) => {
  const { vaciarCarrito, carrito, eliminarElemento, eliminarElementos } = useContext(CarritoContexto);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cantidadesSeleccionadas, setCantidadesSeleccionadas] = useState([]);
  const [ cargando, setCargando ] = useState(true);
  const [open, setOpen] = useState(false);
  let productosToRemove = []

  const obtenerProductos = async () => {
    const URL = "http://127.0.0.1:8000/rest/productos/";
  
    const promesas = carrito.map((idProd) => {
      const productoURL = URL + idProd;
      return fetch(productoURL)
        .then(respuesta => respuesta.json());
    });
  
    try {
      let productos = await Promise.all(promesas);
     
      // Eliminar los elementos del carrito que tengan stock <= 0
      productos.forEach((producto) => {
        if (producto.stock <= 0) {
          console.log("Se agrega: "+producto.id)
          productosToRemove.push(producto.id);
        }
      });
      
      console.log("se borran")
      eliminarElementos(productosToRemove);
      // Filtrar los productos para excluir los elementos con stock <= 0
      productos = productos.filter((producto) => producto.stock > 0);

      setProductosCarrito(productos);
      setCantidadesSeleccionadas(Array(productos.length).fill(1));
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  

  const vaciarCarritoAux = () => {
    setOpen(true);
  }

  const handleConfirm = () => {
    vaciarCarrito();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const comprarCarritoAux = () => {
    console.log(carrito);
    console.log(cantidadesSeleccionadas);
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

    return productosCarrito.map((producto, index) => {
      const { id, nombre, imagen, precio, stock} = producto;

      return (
        <tr key={id}>
          <th>
            {nombre}
            <br></br>
            <img className='imgCarrito' src={imagen} alt={nombre} />
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
      <div>{carrito}</div>
      <Modal show={open} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de quieres vaciar el carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='d-flex align-items-center justify-content-center'>
        <h1 className="display-3">Carrito de compras</h1>
      </div>
      {cargando === true && 
        <div className="container text-center">
          <CircularProgress />
          </div>
      }
      {cargando === false && productosCarrito.length === 0 && (
        <div className="container text-center">
          <h1>El carrito está vacío.</h1>
        </div>
      )}
      {productosCarrito.length > 0 && cargando === false && <div>
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
              <input className='email mx-2' type="text" name="email" placeholder='cliente@gmail.com' />
            </label>
          </form></div><br/>
          
          <div className='d-flex align-items-center justify-content-center'>
            <BotonVaciar onClick={() => vaciarCarritoAux()}></BotonVaciar>
            <BotonComprarCarrito onClick={() => comprarCarritoAux()}></BotonComprarCarrito>
          </div>
          </div>
          <br/>
      </Card>
      </div> 
      }
    </div>
  );
};

export default Carrito;