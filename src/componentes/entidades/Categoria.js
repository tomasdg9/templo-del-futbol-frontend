import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Categoria = (props) => {

    return (
        <Card className="bg-light" style={{ width: '18rem' }} sx={{ maxWidth: 250 }}>
          <Card.Body>
            <Card.Title><p>{props.nombre}</p></Card.Title>
            <Card.Text>{props.descripcion}</Card.Text>
            <div className="d-flex justify-content-center align-items-center">
              <Link to={`/categorias/${props.id}`} className="btn btn-primary btn-sm mx-2">Ver productos</Link>
            </div>
          </Card.Body>
        </Card>
    );
}

export default Categoria;
