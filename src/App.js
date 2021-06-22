import React from 'react';
import './App.css';
import CanvasComponent from './components/Canvas/CanvasComponent';
import Population from './factories/Population';

function App() {
  const canvasSize = 500;
  const population = new Population(5, canvasSize);
  
  return (
    <div className="App">
      <CanvasComponent population={population}/>
    </div>
  );
}

export default App;
