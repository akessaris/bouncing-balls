import React, { useRef, useEffect } from 'react';

const CanvasComponent = props => {
  const { population, ...rest } = props
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const height = population.canvasSize;
    const width = population.canvasSize;

    canvas.width = width;
    canvas.height = height;

    let animationFrameId;
    let frameCount = 0;

    const render = () => {
      frameCount++;

      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);

      if (population.isAllDead()) {
        console.log('They\'re all dead!');
      } else {
        for (const ball of population.balls) {
          ball.update(width, height);
          ball.draw(context, frameCount);
        }
        animationFrameId = window.requestAnimationFrame(render)
      }
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [population]);

  return <canvas ref={canvasRef} {...rest}/>;
};

export default CanvasComponent;