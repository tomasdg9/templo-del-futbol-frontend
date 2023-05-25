import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import BotonComprar from '../botones/BotonComprar';
import CardCategoria from '../CardCategoria';

function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const valido = Number.isInteger(Number(id)) && Number(id) >= 0;

  useEffect(() => {
    if (!valido) {
      return;
    }

    obtenerProducto();
    //obtenerCategoria();
  }, [valido]);

  const obtenerProducto = () => {
    const URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/productos/" + id;
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        setProducto(resultado);
      })
      .catch(error => console.log(error));
  }

  if (!valido) {
    return <Navigate to="/not-found" />;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const { nombre, imagen, descripcion, precio, stock, estado, categoria_id, nombre_categoria } = producto;

  const handleClickCard = () => {
    console.log('se hizo click en la card. Deberia ir al link del producto');
  };

  const handleClick = () => {
    console.log('Se hizo clic en el botón Comprar');
  };

  

 const obtenerCategoria = () => {
    if (!categoria_id) {
      return;
    }
    
    const URL = "https://de-giusti-berti-laravel-tomasdg9.vercel.app/rest/productos/categoria/" + categoria_id;
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultados => {
        setCategoria(resultados); // Guardar los resultados directamente
        
        // Agrupar los productos en un arreglo
        const productos = resultados.map(resultado => resultado.producto);
        console.log(productos);
        
        // Realizar otras operaciones con la colección de productos agrupados
        // ...
      })
      .catch(error => console.log(error));
  }

return (      
      <div class="container-lg">
        <Card className="cardDetalleProd">
          <div className='productoDetalle'>
           
          <div class='contenedorTitulo'><h1>{nombre}</h1></div>
            <div class="row">
              <div class="col text-center">
                <img src={imagen} ></img>{/* Obtener la imagen por id */}
                <div class="my-4"></div>
              </div>
              <div class="col">
              <Card className='cardProdDescripcion'>
                <div class="row">
                  <p class='categoriaProducto'>{nombre_categoria}</p>{/* Esta seria la categoria */}
                  </div>
                <div class="descripcion">
                    <p>{descripcion}</p>
                    <p>{estado}</p>
                    <p>Stock disponible: {stock}</p> {/** si no hay stock disponible hay que ver que se podria hacer, se podria mostrar el producto sin la opcion comprar */}
                    <p class='precio'>${precio}</p>
                </div>
                <br/>
                    </Card>
              </div>

              <div class='d-flex justify-content-center align-items-center'><BotonComprar class='botonProducto' onClick={handleClick}></BotonComprar></div>
            </div>
          </div>
          
        </Card>
      <br/>
      <div class='d-flex justify-content-center align-items-center'>
        <Card className='cardDetalleProd'>
          
        <div class="row">
           
         
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