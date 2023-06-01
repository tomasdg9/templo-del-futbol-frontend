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
    if(producto.id != idClick) {
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
      <div className="container-lg">
        { cargando === false && <div>
        <Card className="cardDetalleProd">
          <div className='productoDetalle'>
           
          <div className='contenedorTitulo mt-3'><h1>{producto.nombre}</h1></div>
            <div className="row">
              <div className="col text-center">
                <img src={producto.imagen} />{/* Obtener la imagen por id */}
                <div className="my-4"></div>
              </div>
              <div className="col">
              <Card className='cardProdDescripcion'>
                <div className="descripcion mx-2 mt-2">
                    <p className='categoriaProducto'>Categoria: {producto.nombre_categoria}</p>{/* Esta seria la categoria */}
                    <p><b>Descripción:</b> {producto.descripcion}</p>
                    <p><b>Estado:</b> {producto.estado}</p>
                    <p><b>Stock disponible:</b> {producto.stock}</p> {/*si no hay stock disponible hay que ver que se podria hacer, se podria mostrar el producto sin la opcion comprar*/ }
                    <p className='precio'>${numeral(producto.precio).format('0,0.00')}</p>
                </div>
                <br/>
                    </Card>
              </div>

              <div className='d-flex justify-content-center align-items-center mb-2'>
              {producto.stock > 0 ? 
                <BotonComprar className='botonProducto' onClick={() => agregarProducto(id)}></BotonComprar>
                : <div>No se puede comprar este producto.</div> }
                </div>
            </div>
          </div>
          
        </Card>
        </div>}
      <br/>
      <div className='d-flex justify-content-center align-items-center'>
        
        <Card className='cardDetalleProd'>
          
        <div className="row">
        {productos.length > 0 && <div className='d-flex justify-content-center align-items-center mt-2'><h1>Productos recientes</h1></div>}
          
        {productos.length > 0 && productos.map((prod) => (
          <div className="col-md-3 col-sm-6 mb-5">
              <Link to={`/productos/${prod.id}`}>
        <CardCategoria
          key={prod.id}
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