import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home.tsx';
import MapaAdd from './MapaAdd.tsx';
import DescriptionAdd from './DescriptionAdd.tsx';
import MapWithProblems from './MapWithProblems.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/mapaAdd" element={<MapaAdd />}/>
        <Route path="/descriptionAdd" element={<DescriptionAdd />}/>
        <Route path="/mapWithProblems" element={<MapWithProblems />}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
