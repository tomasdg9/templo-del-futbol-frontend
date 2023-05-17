import React from 'react';
import Caroucel from './Caroucel';
import Footer from './Footer';

function Home() {
    return (
    <div>
      <Caroucel />
		<div className="app container">
        <h1>Bienvenido al Templo del Fútbol</h1>
        <Footer />
		</div>
    </div>
  );
  }
  
  export default Home;
  