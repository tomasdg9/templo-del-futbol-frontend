import React, { useState, useEffect } from 'react';
import CaroucelImg from './CaroucelImg';
import Footer from './Footer';
import Producto from './entidades/Producto';
import Grid from '@mui/material/Grid';

function Home() {
  let URL = "http://127.0.0.1:8000/rest/productos/masnuevos";
  const [productos, setProductos] = useState([]);
    
  useEffect(() => {
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => setProductos(resultado))
      .catch(error => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CaroucelImg />
      <div className="app container">
        <div className="mt-2 mb-2 container d-flex justify-content-center align-items-center">
            <h1 className="display-4">Bienvenidos al Templo del Fútbol</h1>
        </div>
        <hr></hr>
        <div>
        <div className="d-flex justify-content-center">
          {productos.length > 0 && (<div><h1>LO MÁS NUEVO</h1><br></br></div>)}
        </div>
        <div className="d-flex justify-content-center">
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
            {productos.length > 0 && productos.map((producto) => (
              <Producto
                key={producto.id}
                categoria={producto.categoria_id}
                id={producto.id}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen}
                />
            ))}
          </Grid>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
  }
  
  export default Home;
  