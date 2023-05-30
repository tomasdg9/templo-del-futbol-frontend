import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import CarritoContexto from '../../contextos/CarritoContexto';
import BotonComprar from '../botones/BotonComprar';
import CardCategoria from '../CardCategoria';
import CircularProgress from '@mui/material/CircularProgress';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [valido, setValido] = useState(true);
  const { agregarProducto } = useContext(CarritoContexto);

  useEffect(() => {
    setValido(Number.isInteger(Number(id)) && Number(id) >= 0);
    obtenerProducto();
  }, []);
  
  if (!valido) {
    return <Navigate to="/not-found" />;
  }

  if (!producto) {
    return <div className="mt-2 mb-2 container d-flex flex-column align-items-center"><CircularProgress /></div>;
  }

  function handleClickCard() {
    console.log('se hizo click en la card. Deberia ir al link del producto');
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
      })
      .catch(error => console.log(error));
  }
  
return (      
      <div className="container-lg">
        <Card className="cardDetalleProd">
          <div className='productoDetalle'>
           
          <div className='contenedorTitulo'><h1>{producto.nombre}</h1></div>
            <div className="row">
              <div className="col text-center">
                <img height="550px" src={producto.imagen} ></img>{/* Obtener la imagen por id */}
                <div className="my-4"></div>
              </div>
              <div className="col">
              <Card className='cardProdDescripcion'>
                <div className="row">
                  <p className='categoriaProducto'>Categoria: {producto.nombre_categoria}</p>{/* Esta seria la categoria */}
                  <br></br><br></br>
                  </div>
                <div className="descripcion">
                    <p><b>Descripción:</b> {producto.descripcion}</p>
                    <p><b>Estado:</b> {producto.estado}</p>
                    <p><b>Stock disponible:</b> {producto.stock}</p> {/*si no hay stock disponible hay que ver que se podria hacer, se podria mostrar el producto sin la opcion comprar*/ }
                    <p className='precio'>${producto.precio}</p>
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
      <br/>
      <div className='d-flex justify-content-center align-items-center'>
        <Card className='cardDetalleProd'>
          
        <div className="row">
           
         
        <div className="col-md-3 col-sm-6 mb-5">
            <CardCategoria imagen='https://http2.mlstatic.com/D_NQ_NP_886305-MLA45795334348_052021-O.webp' precio='$25.000' nombre='Botines Puma Borussia' onClick={handleClickCard}/>{/* Aca se obtiene la imagen y el precio por api */}
          </div>
          <div className="col-md-3 col-sm-6 mb-5">
            <CardCategoria imagen='https://http2.mlstatic.com/D_NQ_NP_886305-MLA45795334348_052021-O.webp' precio='$25.000' nombre='Botines Puma Borussia' onClick={handleClickCard}/>{/* Aca se obtiene la imagen y el precio por api */}
          </div>
          <div className="col-md-3 col-sm-6 mb-5">
            <CardCategoria imagen='https://http2.mlstatic.com/D_NQ_NP_886305-MLA45795334348_052021-O.webp' precio='$25.000' nombre='Botines Puma Borussia' onClick={handleClickCard}/>{/* Aca se obtiene la imagen y el precio por api */}
          </div>
          <div className="col-md-3 col-sm-6 mb-5">
            <CardCategoria imagen='https://http2.mlstatic.com/D_NQ_NP_886305-MLA45795334348_052021-O.webp' precio='$25.000' nombre='Botines Puma Borussia' onClick={handleClickCard}/>{/* Aca se obtiene la imagen y el precio por api */}
          </div>
        </div>
        </Card>
        
      </div>
      
      <br/>
      </div>
    
    
  );
}
export default ProductoDetalle;