import { useParams, Navigate  } from 'react-router-dom';
import ProductoLista from '../ProductosLista';

function CategoriaDetalle() {
  const { id } = useParams();

  const valido = Number.isInteger(Number(id)) && Number(id) >= 0;

  if (!valido) {
    // Redireccionar a la página de "Not Found"
    return <Navigate to="/not-found" />;
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <div>
      <ProductoLista 
        categoria={id}
        categorianombre=""
      />
    </div>
  );
}

export default CategoriaDetalle;