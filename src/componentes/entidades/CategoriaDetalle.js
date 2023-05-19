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

  const nombre = "Prueba";

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <div>
      <h1>Lista de productos de la categoria {nombre}</h1>
      <ProductoLista 
        categoria={id}
      />
    </div>
  );
}

export default CategoriaDetalle;