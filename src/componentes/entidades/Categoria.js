//import React, { useContext } from 'react';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
//import CarritoContexto from '../../contextos/CarritoContexto';

const Categoria = (props) => {
  //const { agregarProducto } = useContext(CarritoContexto);

    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4 mt-2 mx-2">
        <Card className="bg-light" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title><p>{props.nombre}</p></Card.Title>
            <Card.Text>{props.descripcion}</Card.Text>
            <div className="d-flex justify-content-center align-items-center">
              <Link to={`/categorias/${props.id}`} className="btn btn-primary btn-sm mx-2">Ver productos</Link>
              { /* "Ver productos" le manda a ProductosLista el parametro "idCategoria" 
                  para que busque los productos en la API de esa categoria */ }
            </div>
          </Card.Body>
        </Card>
      </div>
    );
}

export default Categoria;
