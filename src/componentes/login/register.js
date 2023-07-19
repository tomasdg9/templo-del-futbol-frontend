import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const baseUrl = "https://de-giusti-berti-api-nodejs-nicolasberti.vercel.app/clientes/register"; // api node.js cambiar luego por el otro vercel.
const cookies = new Cookies();

class register extends Component {

    constructor(props) {
        super(props);
        this.state = {
          shouldRedirect: false
        };
      }

  componentDidMount() {
    if (cookies.get('email')) {
      this.setState({ shouldRedirect: true });
    }
  }

  handleChange = () => {
    let email = document.getElementById('email').value;
    let password = md5(document.getElementById('password').value);
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
  
    axios.post(baseUrl, { email, password, nombre, apellido }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 3); // Caduca en 3 días
            cookies.set('token', response.data.token, { expires: expirationDate });
            cookies.set('email', response.data.email, { expires: expirationDate });
            this.props.onLogin();
            this.setState({ shouldRedirect: true });
            toast('Se registró el usuario con éxito ('+email+')', {
                duration: 5000,
                position: 'bottom-right',
                type: 'success'
              });
            
      })
      .catch(error => {
        toast('Revisá los datos. No son correctos.', {
          duration: 5000,
          position: 'bottom-right',
          type: 'error'
        });
      });
  }

  render() {

    if (this.state.shouldRedirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <Toaster />
            {cookies.get('email')}
            {cookies.get('token')}
            <div className="row justify-content-center mt-2 mb-2">
            <div className="col-md-6 bg-white">
                <h2 className="text-center mb-4">Nuevo cliente</h2>
                <div className="form-group">
                    <label for="email">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Ingrese su email"/>
                </div>
                
                <div className="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña"/>
                </div>
                <div className="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Ingrese su nombre"/>
                </div>
                <div className="form-group">
                    <label for="apellido">Apellido:</label>
                    <input type="text" className="form-control" id="apellido" placeholder="Ingrese su apellido"/>
                </div>
                <div className="d-flex justify-content-center">
                  <button onClick={this.handleChange} className="btn btn-primary mb-2 mt-2">Registrarse</button>
                </div>
            </div>
            </div>
        </div>)
  }
}


export default register;
