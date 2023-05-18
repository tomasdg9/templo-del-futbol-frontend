import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

class Categoria extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4 mt-2">
        <Card className="bg-dark" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{this.props.nombre}</Card.Title>
            <Card.Text>
				        {this.props.descripcion}
            </Card.Text>
            <div className="d-flex justify-content-center align-items-center">
              <Link to={`/categorias/${this.props.id}`} className="btn btn-primary">Ver detalle</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Categoria;
