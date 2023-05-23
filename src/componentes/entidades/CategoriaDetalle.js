import { useParams, Navigate  } from 'react-router-dom';
import ProductoLista from '../ProductosLista';

function CategoriaDetalle() {
  const { id } = useParams();

  const valido = Number.isInteger(Number(id)) && Number(id) >= 0;

  // IMPORTANTE: Falta validar que exista en la API. Si no existe, tambien que redireccione a not-found. Usar la misma variable.

  if (!valido) {
    // Redireccionar a la página de "Not Found"
    return <Navigate to="/not-found" />;
  }

  let categoria = [];

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    let URL = "http://127.0.0.1:8000/rest/categorias/"+id;
    
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => {categoria= resultado})
      .catch(error => console.log(error));

  return (
    <div>
      <ProductoLista 
        categoria={id}
        nombrecategoria={categoria.nombre} // no funciona. revisar
      />
    </div>
  );
}

export default CategoriaDetalle;