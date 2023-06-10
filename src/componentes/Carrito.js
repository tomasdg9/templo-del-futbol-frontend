import React, { useContext, useState, useEffect } from 'react';
import CarritoContexto from '../contextos/CarritoContexto';
import Card from 'react-bootstrap/Card';
import BotonBorrar from './botones/BotonBorrar';
import BotonVaciar from './botones/BotonVaciar';
import BotonComprarCarrito from './botones/BotonComprarCarrito';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const Carrito = (props) => {
  const { vaciarCarrito, carrito, eliminarElemento } = useContext(CarritoContexto);
  const [ comprando, setComprando ] = useState(false);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cantidadesSeleccionadas, setCantidadesSeleccionadas] = useState([]);
  const [ cargando, setCargando ] = useState(true);
  const [open, setOpen] = useState(false);
  const [showDescripcion, setshowDescripcion] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [openBorrar, setOpenBorrar] = useState(false);
  const [indexBorrar, setIndexBorrar] = useState(null);
  const DeshandleClose = () => setshowDescripcion(false);
  const DeshandleShow = () => setshowDescripcion(true);
  const DeshandleChange = (event) => setDescripcion(event.target.value);

  const actualizarCarrito = () => {
    obtenerProductos();
	toast('Se actualizó el carrito', {
		duration: 3000,
        position: 'bottom-right',
		icon: '⚠️',
	});
  }

  const obtenerProductos = async () => {
    const URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/productos/";
  
    const promesas = carrito.map((idProd) => {
      const productoURL = URL + idProd;
      return fetch(productoURL)
        .then(respuesta => respuesta.json());
    });
  
    try {
      let productos = await Promise.all(promesas);
      setProductosCarrito(productos);
      setCantidadesSeleccionadas(Array(productos.length).fill(1));
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleConfirmDelete = () =>{
    eliminarElemento(indexBorrar);
    setOpenBorrar(false);
  }

  const handleCancelDelete = () =>{
    setOpenBorrar(false);
  }

  const modalBorrarProducto = (index) => {
    setIndexBorrar(index);
  }

  useEffect(() => {
    if (indexBorrar !== null) {
      setOpenBorrar(true);
    }
  }, [indexBorrar]);

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
    const input = document.getElementById('clienteEmail');
    const valor = input.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email

    if (regex.test(valor)) {
      DeshandleShow();
    } else {
      toast('El email es inválido', {
        duration: 2000,
        position: 'bottom-right',
        type: 'error'
      });
    }
  }

  const DeshandleSubmit = async () => {
    let cadenaAPI = "";
    for (let index = 0; index < productosCarrito.length; index++) {
      const producto = productosCarrito[index];
      if (producto.stock > 0) {
        for (let i = 0; i < cantidadesSeleccionadas[index]; i++) {
          cadenaAPI = cadenaAPI + producto.id + "-";
        }
      }
    }
    let ids = cadenaAPI.slice(0, -1);
    const input = document.getElementById('clienteEmail');
    const email = input.value;
    if(descripcion === "") {
        alert("Debes incluir una descripción para el pedido.")
    } else {
      setComprando(true);
      const data = {
        email: email,
        descripcion: descripcion,
        ids: ids
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch('https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/pedidos/crear', requestOptions);
        if (response.ok) {
          toast('Pedido completado con éxito\nEmail: '+email+"\nDescripción: "+descripcion, {
            duration: 5000,
            position: 'bottom-right',
            type: 'success'
          });
          vaciarCarrito();
          setComprando(false);
        } else {
          throw new Error('Esta intentando comprar un producto sin stock o se produjo un error en la solicitud.');
        }
      } catch (error) {
        alert(error);
        actualizarCarrito();
      }
      DeshandleClose();
    }
  };
  


  const obtenerPrecio = () => {
    let precioTotal = 0;
    productosCarrito.forEach((producto, index) => {
      const { precio, stock } = producto;
      if(stock > 0) {
        const cantidad = cantidadesSeleccionadas[index];
        const precioFloat = parseFloat(precio);
        const subtotal = precioFloat * cantidad;
        precioTotal += subtotal;
      }
    });

    return precioTotal;
  };

  const handleCantidadSeleccionada = (index, e) => {
    const cantidad = parseInt(e.target.value);
    const nuevasCantidades = [...cantidadesSeleccionadas];
    nuevasCantidades[index] = cantidad;
    setCantidadesSeleccionadas(nuevasCantidades);
  };

  useEffect(() => {
    obtenerProductos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrito]);

  const renderProductos = () => {

    return productosCarrito.map((producto, index) => {
      const { id, nombre, imagen, precio, stock} = producto;
      if(stock > 0) { // Productos con stock
        return (
          <tr key={id}>
            <th>
            <Link to={`/productos/${id}`} >{nombre}</Link>
              <br></br>
              <img className='imgCarrito' src={imagen} alt={nombre} />
            </th>
            <td>${numeral(precio).format('0,0.00')}</td>
            <td>
            <select value={cantidadesSeleccionadas[index]} onChange={(e) => handleCantidadSeleccionada(index, e)}>
              {[...Array(stock)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            </td>
            <td>
              <button onClick={() => modalBorrarProducto(index)} type="button" className="btn btn-danger mr-2">Borrar</button>
            </td>
          </tr>
        );
      } else { // Productos sin stock
        return ( <tr key={id}>
        <th>
          {nombre}
          <br></br>
          <img className='imgCarrito' src={imagen} alt={nombre} />
        </th>
        <td><del>${numeral(precio).format('0,0.00')}</del></td>
        <td>
        No disponible
        </td>
        <td>
          <button onClick={() => modalBorrarProducto(index)} type="button" className="btn btn-danger mr-2">Borrar</button>
        </td>
      </tr> );
      }
    });
  };

  return (
    <div>
      <Toaster />
      { /* Modal vaciar carrito */ }
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
      { /* Modal descripción del producto */ }
      <Modal show={showDescripcion} onHide={DeshandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Descripción del pedido</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        { comprando === false && <div>
          <label htmlFor="descripcion">Ingrese la descripción:</label>
          <input
            type="text"
            id="descripcion"
            className="form-control"
            value={descripcion}
            onChange={DeshandleChange}
          />
          </div>
        }
        { comprando === true && <div>Comprando...</div> }
        </Modal.Body>
        <Modal.Footer>
        { comprando === false && <div>
          <Button variant="secondary" onClick={DeshandleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={DeshandleSubmit}>
            Comprar
          </Button>
          </div>
        }
        </Modal.Footer>
      </Modal>

      { /* Modal borrar producto */ }
      <Modal show={openBorrar} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que quieres borrar el producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
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
          <br></br>
          <h1>El carrito está vacío.</h1>
          <br></br>
          <Link to={`/productos`} className="btn mx-1 btn-success">Ver productos</Link>
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
          
          <div className='d-flex align-items-center justify-content-center'><Card className='precioCarrito'><b>Precio total (productos disponibles): ${numeral(obtenerPrecio()).format('0,0.00')}</b></Card></div>
          <div className='d-flex align-items-center justify-content-center'>
          
          <br/>
            <label>
            <div className="mt-2">
              Cliente (*):  
              <input id="clienteEmail" className='email mt-2 mx-2' type="text" name="email" placeholder='cliente@gmail.com' />
              </div>
            </label>
            </div>
            <br/>
          
          <div className='d-flex align-items-center justify-content-center'>
            <BotonVaciar className='botonRojo' onClick={() => vaciarCarritoAux()}></BotonVaciar>
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