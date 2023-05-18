import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Producto extends Component {
  
  /*
  <div class="container">
  <div class="row">
    <div class="col-lg-3 col-md-4 col-sm-6">
      <div class="card mb-4">
        <!-- Contenido de la card -->
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6">
      <div class="card mb-4">
        <!-- Contenido de la card -->
      </div>
    </div>
    <!-- Repite estas columnas para cada card adicional -->
  </div>
</div>

*/
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4 mt-2">
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
