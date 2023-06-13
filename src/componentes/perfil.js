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
          shouldRedirect: false
        };
      }

  render() {
    return (
        <div>
            
        </div>
      )
    }      
}


export default perfil;
