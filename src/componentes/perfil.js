import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import numeral from 'numeral';
import Pagination from 'react-js-pagination';
const cookies = new Cookies();

class perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: true,
      visualizando: -1, // -1 si no está visualizando un pedido. visualizando>=0 si está visualizando el detalle de un pedido.
      productosDelPedido: [],
      pedidos: [],
      currentPage: 1,
      itemsPerPage: 3,
    };
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  componentDidMount() {
    if(this.props.ingreso)
      this.obtenerPedidos();
  }    

  volver = () => {
    this.setState({
      visualizando: -1,
      currentPage: 1,
      productosDelPedido: [],
    });
  }

  calcularPrecioTotal() {
    let total = 0;
    this.state.productosDelPedido.forEach((producto) => {
      total += producto.precio * producto.cantidadpedida;
    });
    return total;
  }

  obtenerPedidos = () => {
    /* Obtener los pedidos del usuario */
    let URL = "http://127.0.0.1:3001/pedidos/email/"+cookies.get('email')+"/"+cookies.get('token');
    fetch(URL)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        resultado.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        this.setState({
          pedidos: resultado,
          cargando: false
        });
      })
      .catch(error => console.log(error));
  }

  obtenerDetalle = (id) => { // ¿Tendria que validar con un token?
    this.setState({cargando: true, visualizando: id}, () => {
      let URL = "http://127.0.0.1:3001/pedidos/verdetalle/"+id;
      fetch(URL)
        .then(respuesta => respuesta.json())
        .then(resultado => {
          this.setState({
            productosDelPedido: resultado,
            cargando: false
          });
        })
        .catch(error => console.log(error)); 
    });

  }

  formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString('en-US');
    const formattedTime = dateTime.toLocaleTimeString('en-US', { hour12: false });
  
    return `${formattedDate} ${formattedTime}`;
  };

  render() {
    // Si no está logeado no se le permite el acceso a esta página.
    if (this.props.ingreso == false) {
      return <Navigate to="/" />;
    }

    if(this.state.cargando == true){
      return <div className="container text-center">
      <CircularProgress />
      </div>;
    }

    if(this.state.visualizando == -1){ // Visualizando sus pedidos
    const { pedidos, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pedidosPaginados = pedidos.slice(startIndex, endIndex);  
    return (
        <div>
          <div className="container">
          <div className="d-flex justify-content-center mb-2">
             <h1>Tus pedidos</h1>
            </div>
              {/* Cards */}
              <div className="d-flex justify-content-center">
              {pedidosPaginados.map((pedido) => (
                <div className="card mt-2 w-50 mx-2">
                  <div className="card-body">
                    <h5 className="card-title">Pedido {this.formatDate(pedido.created_at)}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Cantidad de productos: {pedido.cantidadproductos}</h6>
                    <p className="card-text">{pedido.descripcion}</p>
                  </div>
                  <div className="d-flex justify-content-center">
                  <button onClick={() => this.obtenerDetalle(pedido.id)} type="button" className="mb-2 mx-2 w-50 btn btn-success">Ver detalle</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        { /* Barra de paginación */ }
        <div className="pagination mt-2">
          <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={pedidos.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
          />
        </div>

        </div>
      )
    } else { // Visualización de un pedido en particular.
      const precioTotal = this.calcularPrecioTotal();
        return (
          <div className="container">
             <div className="d-flex justify-content-center mb-2">
             <h1>Información sobre el pedido: {this.state.visualizando}</h1>
            </div>
            <div className="d-flex justify-content-center">
              {this.state.productosDelPedido.map((producto) => (
                  <div className="card w-25 mx-2">
                    <img className="card-img-top w-50" src={producto.imagen} alt="Card image cap"/>
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre_producto}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{producto.nombre_categoria}</h6>
                      <p className="card-text"><b>Precio:</b> ${numeral(producto.precio).format('0,0.00')}</p>
                      <p className="card-text"><b>Cantidad pedida:</b> {producto.cantidadpedida}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-2">
              <h3>Costo total del pedido: ${numeral(precioTotal).format('0,0.00')}</h3>
            </div>
            <div className="d-flex justify-content-center">
              <button onClick={() => this.volver()} type="button" className="mb-2 mx-2 w-25 btn btn-success">Volver</button>
            </div>
          </div>
        )
    }
    }      
}


export default perfil;
