import React from 'react';
import './App.css';
import CanvasComponent from './components/Canvas/CanvasComponent';
import Population from './factories/Population';
import Goal from './factories/Goal';

function App() {
  const canvasSize = 1000;
  const population = new Population(1000, canvasSize);
  const goal = new Goal(canvasSize/2, canvasSize - 40);
  
  return (
    <div className="App">
      <CanvasComponent population={population} goal={goal}/>
    </div>
  );
}

export default App;
