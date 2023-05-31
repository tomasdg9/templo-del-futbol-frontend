import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

class Producto extends Component {


  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4 mt-2">
        {/* Ejemplo de una Card de Bootstrap. Podemos mostrar las categorias y los productos con esto */}
        <Card className="cardProducto"style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.imagen} />
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center"><Card.Title><b>{this.props.nombre}</b></Card.Title></div>
            <div className="d-flex justify-content-center align-items-center"><Card.Text>${numeral(this.props.precio).format('0,0.00')}</Card.Text></div>
            <div className="d-flex justify-content-center align-items-center">
              <Link to={`/productos/${this.props.id}`} className="btn btn-primary btn-sm mx-2">Ver producto</Link></div>
          </Card.Body>
        </Card>
      </div>
    );
  }
  }

export default Producto;
