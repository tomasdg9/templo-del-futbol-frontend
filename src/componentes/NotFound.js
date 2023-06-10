import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div className="text-center p-5">
			<h1 >404 :(</h1>
            <h2 className="display-4">PÁGINA NO ENCONTRADA</h2>
            <p>Revisá si la página ingresada es correcta.</p>
            <br/>
            <Link to={`/`}>
            <Button variant="primary">Volver al inicio</Button>
            </Link>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
