import React, { Component } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

class recuperarcontra extends Component {

  handleChange = () => {
    let email = document.getElementById('email').value;
    axios.post("https://de-giusti-berti-api-nodejs-nicolasberti.vercel.app/clientes/changepassword", { email }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        toast('Se envió un mail para cambiar la contraseña.', {
          duration: 5000,
          position: 'bottom-right',
          type: 'success'
        });
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            toast('El cliente ingresado no existe.', {
              duration: 4000,
              position: 'bottom-right',
              type: 'error'
            });
          } else if (error.response.status === 401) {
            toast('Ya solicitaste un cambio de contraseña.', {
              duration: 4000,
              position: 'bottom-right',
              type: 'error'
            });
          }
        } else {
          // ..
        }
      });
  }
  

  render() {
    return (
      <div>
        <Toaster />
        <div className="row justify-content-center d-flex mt-2 mb-2 ">
            <div className="col-md-6 bg-white">
              <h2 className="text-center mb-4">Recuperar contraseña</h2>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su email" />
              </div>
              <div className="d-flex justify-content-center">
                <button onClick={this.handleChange} className="btn btn-primary mb-2 mt-2">Recuperar</button>
              </div>
            </div>
          </div>
      </div>
    )
  }
        
}

export default recuperarcontra;
