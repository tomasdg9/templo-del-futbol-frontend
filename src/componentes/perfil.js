import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const baseUrl = "http://127.0.0.1:3001/clientes/login";
const cookies = new Cookies();

class perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
          logeado: false
        };
      }

      componentDidMount() {
        if (cookies.get('email')) {
          this.setState({ logeado: true });
        }
      }
      
  render() {

    // Si no está logeado no se le permite el acceso a esta página.
    if (this.state.shouldRedirect) {
      return <Navigate to="/" />;
    }

    // Lógica si está logeado.
    return (
        <div>
          { cookies.get('email') }
          { cookies.get('token') }
            Hola.
        </div>
      )
    }      
}


export default perfil;
