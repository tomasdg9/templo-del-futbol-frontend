/* eslint-disable jsx-a11y/alt-text */
import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import CarritoContexto from '../../contextos/CarritoContexto';
import BotonComprar from '../botones/BotonComprar';
import CardCategoria from '../CardCategoria';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

function ProductoDetalle() {
  let { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [valido, setValido] = useState(true);
  const { agregarProducto } = useContext(CarritoContexto);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
    
  useEffect(() => {
    setValido(Number.isInteger(Number(id)) && Number(id) >= 0);
    obtenerProducto();
    obtenerRecientes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!valido) {
    return <Navigate to="/not-found" />;
  }

  if (!producto || cargando === true) {
    return <div className="mt-2 mb-2 container d-flex flex-column align-items-center"><CircularProgress /></div>;
  }

  function handleClickCard(idClick) {
    if(producto.id !== idClick) {
      id = idClick;
      setCargando(true);
      obtenerProducto();
    }
  };

  function obtenerProducto() {
    const URL = "http://127.0.0.1:8000/rest/productos/" + id;
    fetch(URL)
      .then(respuesta => {
        if (respuesta.status === 200) return respuesta.json();
        else setValido(false);
      })
      .then(resultado => {
        setProducto(resultado);
        setCargando(false);
      })
      .catch(error => console.log(error));
  }

  function obtenerRecientes(){
    const URL = "http://127.0.0.1:8000/rest/productos/masnuevos";
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => setProductos(resultado))
      .catch(error => console.log(error));
  }
  
  return (      
      <div className="container ">
        { cargando === false && <div>
          <div className="mt-2 d-flex justify-content-center align-items-center">
          <Card style={{ width: '50rem' }}>
              <div className="d-flex align-items-center justify-content-center">
                <Card.Img variant="top" src={producto.imagen} style={{ width: '50%', height: 'auto' }} />
              </div>
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{producto.nombre_categoria}</Card.Subtitle>
                <Card.Subtitle className="mb-2">${numeral(producto.precio).format('0,0.00')}</Card.Subtitle>
                <Card.Text className="mt-2">
                {producto.estado} - Stock: {producto.stock}
                </Card.Text>
                {producto.descripcion}
                <div className='mt-2 d-flex justify-content-center align-items-center mb-2'>
                {producto.stock > 0 ? 
                <BotonComprar className='botonProducto' onClick={() => agregarProducto(id)}></BotonComprar>
                : <div>No se puede comprar este producto.</div> }
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>}
      <br/>

      {/* Productos más nuevos */}
      <div className='d-flex justify-content-center align-items-center'>
        
        <Card className='cardDetalleProd'>
          
        <div className="row mx-2">
        {productos.length > 0 && <div className='d-flex justify-content-center align-items-center mt-2'><h1>Productos recientes</h1></div>}
          
        {productos.length > 0 && productos.map((prod) => (
          <div className="col-md-3 col-sm-6 mb-5">
              <Link to={`/productos/${prod.id}`}>
        <CardCategoria
          nombre={prod.nombre}
          id={prod.id}
          precio={prod.precio}
          imagen={prod.imagen}
          onClick={() => handleClickCard(prod.id)}
        />
        </Link>
                </div>
            ))} 
        </div>
        </Card>
        
      </div>
      
      <br/>
      </div>
    
    
  );
}
export default ProductoDetalle;