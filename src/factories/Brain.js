export default class Brain {
  step = 0;
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

  get current () {
    return this.coords[this.step];
  }

  get hasNext () {
    return this.step < this.coords.length;
  }

  next () {
    this.step++;
  }

  random (min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  reset () {
    this.step = 0;
  }
}