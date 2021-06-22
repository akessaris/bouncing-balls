import React, { useRef, useEffect } from 'react';

const CanvasComponent = props => {
  const { draw, update, ...rest } = props
  const canvasRef = useRef(null);

  const width = 500;
  const height = 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    let animationFrameId;
    let frameCount = 0;

    const render = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)

      frameCount++;
      update(width, height);
      draw(context, frameCount)

      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw]);

  return <canvas ref={canvasRef} {...rest}/>;
};

export default CanvasComponent;