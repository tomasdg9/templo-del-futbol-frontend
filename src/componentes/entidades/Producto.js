import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Producto extends Component {
  
  render() {
    return (
      <div className="col-md-3 mb-4 mt-2">
        {/* Ejemplo de una Card de Bootstrap. Podemos mostrar las categorias y los productos con esto */}
        <Card className="bg-dark" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.imagen} />
          <Card.Body>
            <Card.Title>{this.props.nombre}</Card.Title>
            <Card.Text>
				{this.props.descripcion}
            </Card.Text>
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="primary">Comprar</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Producto;
