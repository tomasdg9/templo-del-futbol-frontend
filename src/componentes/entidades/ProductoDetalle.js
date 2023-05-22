import { useParams, Navigate  } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import BotonComprar from '../botones/BotonComprar';
import BotonAnterior from '../botones/BotonAnterior';
import BotonSiguiente from '../botones/BotonSiguiente';
import CardCategoria from '../CardCategoria';

function ProductoDetalle() {
    const { id, imagen } = useParams();
  const valido = Number.isInteger(Number(id)) && Number(id) >= 0;

  // IMPORTANTE: Falta validar que exista en la API. Si no existe, tambien que redireccione a not-found. Usar la misma variable.

  if (!valido) {
    // Redireccionar a la página de "Not Found"
    return <Navigate to="/not-found" />;
  }
  return (
    
      
      <div class="container-lg">
        <Card className="cardDetalleProd">
          <div className='productoDetalle'>
           
          <div class='contenedorTitulo'><h1>Botines Puma Ultra</h1></div>
            <div class="row">
              <div class="col text-center">
                <img src="/img/botines.jpeg" ></img>{/* Obtener la imagen por id */}
                <div class="my-4"></div>
              </div>
              <div class="col">
              <Card className='cardProdDescripcion'>
                <div class="row">
                  <p class='categoriaProducto'>Botines</p>{/* Esta seria la categoria */}
                  </div>
                <div class="descripcion">
                    <p>Libera un potencial ilimitado con la energía y el rendimiento de nuestra colección Ultra. El diseño impecable de nuestras botas de fútbol Ultra Match te da ventaja durante la competición gracias a nuestro exclusivo exterior potenciado con GRIP CONTROL que mejora el control del balón, una SPEEDPLATE de TPU que ofrece una tracción, control y propulsión increíbles, y un ajuste óptimo realzado por un cuello de punto de corte bajo. Son adecuadas para el training en césped.</p>
                    <p>Estado: Nuevo</p>
                    <p class='precio'>$5.000</p>
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
            <BotonAnterior/> 
          </div>
          <div className="col-md-3 col-sm-6 mb-5">
            <CardCategoria imagen='https://http2.mlstatic.com/D_NQ_NP_886305-MLA45795334348_052021-O.webp' precio='$25.000' nombre='Botines Puma Borussia' onClick={handleClickCard}/>{/* Aca se obtiene la imagen y el precio por api */}
          </div>
          <div className="col-md-3 col-sm-6 mb-5">
            <CardCategoria imagen='https://http2.mlstatic.com/D_NQ_NP_886305-MLA45795334348_052021-O.webp' precio='$25.000' nombre='Botines Puma Borussia' onClick={handleClickCard}/>{/* Aca se obtiene la imagen y el precio por api */}
          </div>
          <div className="col-md-3 col-sm-6 mb-5">
            <CardCategoria imagen='https://http2.mlstatic.com/D_NQ_NP_886305-MLA45795334348_052021-O.webp' precio='$25.000' nombre='Botines Puma Borussia' onClick={handleClickCard}/>{/* Aca se obtiene la imagen y el precio por api */}
            <BotonSiguiente class='alinearDerecha'/>
          </div>
        </div>
        </Card>
        
      </div>
      
      <br/>
      </div>
    
    
  );
}

const handleClickCard =() =>{
  console.log('se hizo click en la card. Deberia ir al link del producto')
};

const handleClick = () => {
  // Lógica que se ejecutará al hacer clic en el botón
  console.log('Se hizo clic en el botón Comprar');
  // Otras acciones que desees realizar
};

export default ProductoDetalle;