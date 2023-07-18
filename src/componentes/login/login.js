import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const baseUrl = "https://de-giusti-berti-api-nodejs-nicolasberti.vercel.app/clientes/login";
const cookies = new Cookies();

// Tareas -> Cuando se apreta "registrarse" quiere guardar los datos, no debe hacer eso.
class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          shouldRedirect: false,
          redirectRegister: false,
          cargando: false
        };
      }

  componentDidMount() {
    if (cookies.get('email')) {
      this.setState({ shouldRedirect: true });
    }
  }

  handleRegisterClick = () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    emailInput.value = '';
    passwordInput.value = '';

    this.setState({ redirectRegister: true });
  }

  handleChange = () => {
    let email = document.getElementById('email').value;
    let password = md5(document.getElementById('password').value);
    this.setState({cargando: true});
    axios.post(baseUrl, { email, password }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            cookies.set('email', response.data.email, {path: "/"});
            cookies.set('token', response.data.token, {path: "/"});
            this.props.onLogin();
            this.setState({ shouldRedirect: true, cargando: false });
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 3); // Caduca en 3 días
            cookies.set('token', response.data.token, { expires: expirationDate });
            cookies.set('email', response.data.email, { expires: expirationDate });
            toast('Se inició sesión ('+email+')', {
                duration: 5000,
                position: 'bottom-right',
                type: 'success'
              });
      })
      .catch(error => {
        this.setState({ cargando: false });
        toast('No se pudo iniciar sesión', {
            duration: 4000,
            position: 'bottom-right',
            type: 'error'
          });
        //console.log(error);
      });
  }

  render() {

    if (this.state.shouldRedirect) {
        return <Navigate to="/" />;
    }

    if (this.state.redirectRegister) {
      return <Navigate to="/register" />;
  }

    return (
        <div className="container">
              

          <Toaster />
          {cookies.get('email')}
          {cookies.get('token')}
          <div className="row justify-content-center mt-2 mb-2">
            <div className="col-md-6 bg-white">
              <h2 className="text-center mb-4">Ingresar</h2>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su email" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
              </div>
              {this.state.cargando == false && <div>
              <div className="d-flex justify-content-center">
                <button onClick={this.handleChange} className="btn btn-primary mb-2 mt-2">Ingresar</button>
                {/*  <Link onClick={this.clearInputs} to={`/register`} className="btn btn-primary mb-2 mt-2 mx-2">Registrarse</Link>
              */}
              <Link onClick={this.handleRegisterClick} className="btn btn-primary mb-2 mt-2 mx-2">
                Registrarse
              </Link>
              </div>
              <div className="d-flex justify-content-center mb-2">
                <Link to={`/recuperar`}><p>¿Olvidó su contraseña?</p></Link>
              </div>
              </div>}
              {this.state.cargando == true && <div className="d-flex justify-content-center mb-2 mt-2"><CircularProgress /></div>}

            </div>
          </div>
        </div>
      )
    }      
}


export default login;
