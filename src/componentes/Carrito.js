import React, { useContext } from 'react';
import CarritoContexto from '../contextos/CarritoContexto';

const Carrito = (props) => {
  const { vaciarCarrito } = useContext(CarritoContexto);

  return (
    <div>
        <p>Soy el carrito {props.nombre}!</p>
      <button onClick={() => vaciarCarrito()}>Vaciar</button>
    </div>
  );
};

export default Carrito;
