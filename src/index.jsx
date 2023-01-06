import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './js/Experience.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Canvas>
      <Experience />
    </Canvas>
  </React.StrictMode>,
);
