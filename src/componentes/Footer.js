/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Footer() {
    return (
        <div className="mt-3">
      <div className="footerColor align-items-center">
        <div className="row justify-content-center text-center">
          <div className="col mx-3">
            <img src="/img/mercadopago.svg" className="img-fluid mt-4" />
          </div>
          <div className="col">
            <img src="/img/americanexpress.svg"className="img-fluid mt-4" />
          </div>
          <div className="col">
            <img src="/img/mastercard.svg" className="img-fluid mt-4" />
          </div>
          <div className="col">
            <img src="/img/naranja.webp" className="img-fluid mt-4" />
          </div>
          <div className="col">
            <img src="/img/pagofacil.svg" className="img-fluid mt-4" />
          </div>
          <div className="col">
            <img src="/img/rapipago.svg" className="img-fluid mt-4" />
          </div>
          <div className="col mx-3">
            <img src="/img/visa.svg" className="img-fluid mt-4" />
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Footer;
  