import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Login from './Login.tsx';
import Home from './Home.tsx';
import MapaAdd from './MapaAdd.tsx';
import DescriptionAdd from './DescriptionAdd.tsx';
import MapWithProblems from './MapWithProblems.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/mapaAdd" element={<PrivateRoute><MapaAdd /></PrivateRoute>}/>
        <Route path="/descriptionAdd" element={<PrivateRoute><DescriptionAdd /></PrivateRoute>}/>
        <Route path="/mapWithProblems" element={<MapWithProblems />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
