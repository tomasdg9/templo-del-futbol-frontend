import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import ProductosLista from './componentes/ProductosLista';
import NotFound from './componentes/NotFound';
import Home from './componentes/Home';
import './css/styles.css';

function App() {
  return (
   <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosLista />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
