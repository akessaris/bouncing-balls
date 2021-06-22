import React from 'react';
import './App.css';
import CanvasComponent from './components/Canvas/CanvasComponent';
import Ball from './factories/Ball';

function App() {
  const ball = new Ball(15, 25, 4, 4, 'blue', 10);
  const draw = ball.draw.bind(ball);
  const update = ball.update.bind(ball);

  return (
    <div className="App">
      <CanvasComponent draw={draw} update={update}/>
    </div>
  );
}

export default App;
