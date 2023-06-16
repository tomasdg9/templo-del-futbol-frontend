import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, Navigate } from 'react-router-dom';

const RecuperarContra = () => {
  const [reDirect, setReDirect] = useState(false);

  const { email, token } = useParams();

  const handleChange = () => {
    const password = document.getElementById('password').value;
    axios
      .post("http://127.0.0.1:3001/clientes/newpassword", { email, password, token }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        toast('Se cambió la contraseña.', {
          duration: 5000,
          position: 'bottom-right',
          type: 'success'
        });
        setReDirect(true);
      })
      .catch(error => {
        console.log(error);
        setReDirect(true);
        toast('Ocurrió un error. Intente nuevamente.', {
          duration: 4000,
          position: 'bottom-right',
          type: 'error'
        });
      });
  }

  useEffect(() => {
    if (reDirect) {
      return <Navigate to="/" />;
    }
  }, [reDirect]);

  return (
    <div>
      <Toaster />
      <div className="row justify-content-center d-flex mt-2 mb-2 ">
        <div className="col-md-6 bg-white">
          <h2 className="text-center mb-4">Cambiar contraseña</h2>
          <div className="form-group">
            <label htmlFor="password">Nueva contraseña:</label>
            <input type="text" className="form-control" id="password" placeholder="Ingrese su nueva contraseña" />
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={handleChange} className="btn btn-primary mb-2 mt-2">Cambiar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarContra;
