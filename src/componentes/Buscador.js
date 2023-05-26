import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Buscador extends Component {
    busquedaRef = React.createRef();

    obtenerDatos = (e) => {
        e.preventDefault();
        const termino = this.busquedaRef.current.value; // Hace referencia a lo que se coloca en el input
        this.props.datosBusqueda(termino); // Invoca la función "datosBusqueda" con "termino" de su padre
    }

    
    render(){
        return (
            <Form onSubmit={this.obtenerDatos} className="d-flex">
                <Form.Control
                    ref={this.busquedaRef}
                    type="search"
                    placeholder="Buscar"
                    className="me-2"
                    aria-label="Search"
                />
                <Button type="submit" variant="btn btn-success">
                    <i className="bi bi-search"></i>
                </Button>
            </Form>
        );
    }
}

export default Buscador;
