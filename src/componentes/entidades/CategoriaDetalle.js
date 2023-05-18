import { useParams, Navigate  } from 'react-router-dom';

function CategoriaDetalle() {
  const { id } = useParams();

  // Validar que el id sea un número entero mayor o igual a cero
  const isValidId = Number.isInteger(Number(id)) && Number(id) >= 0;

  // IMPORTANTE: Falta validar que exista en la API. Si no existe, tambien que redireccione a not-found. Usar la misma variable.

  if (!isValidId) {
    // Redireccionar a la página de "Not Found"
    return <Navigate to="/not-found" />;
  }

  return (
    <div>
      Hola {id}!
    </div>
  );
}

export default CategoriaDetalle;
