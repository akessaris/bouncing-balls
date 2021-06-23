import React, { useRef, useEffect } from 'react';

const CanvasComponent = props => {
  const { population, goal, ...rest } = props
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const height = population.canvasSize;
    const width = population.canvasSize;

    canvas.width = width;
    canvas.height = height;

    let animationFrameId;
    const render = () => {
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);

      goal.draw(context);

      if (population.isAllDead()) {
        console.log('They\'re all dead!');
        population.reset();
      } 

      for (const ball of population.balls) {
        ball.update();
        ball.draw(context);
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [population, goal]);

  return <canvas ref={canvasRef} {...rest}/>;
};

export default CanvasComponent;