export default class Brain {
  index = 0;
  coords = [];

  constructor (steps, canvasSize) {
    let x = canvasSize / 2;
    let y = canvasSize - 10;

    for (let i = 0; i < steps; i++) {
      x += this.random(-10, 10);
      y += this.random(-10, 5);
      this.coords.push({ x, y });
    }
  }

  random (min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  getNextCoord () {
    return this.coords[this.index++] || {};
  }
}