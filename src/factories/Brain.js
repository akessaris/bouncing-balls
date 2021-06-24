export default class Brain {
  step = 0;
  coords = [];

  constructor (canvasSize) {
    this.canvasSize = canvasSize;

    let x = canvasSize / 2;
    let y = 10;

    const maxStep = 1000;
    for (let i = 1; i < maxStep; i++) {
      this.coords.push({ x, y });
      x += this.randomX();
      y += this.randomY();
    }
  }

  get current () {
    return this.coords[this.step];
  }

  get hasNext () {
    return this.step + 1 < this.coords.length;
  }

  next () {
    this.step++;
  }

  random (min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  randomX () {
    return this.random(-4, 4);
  }

  randomY () {
    return this.random(-2, 4);
  }

  reset () {
    this.step = 0;
  }

  mutate (minStep) {
    // Make sure we're not exceeding the minumum number of steps
    this.coords.splice(minStep);

    const mutationRate = 0.01; //chance that any vector in directions gets changed
    for (let i = 1; i < this.coords.length; i++) {
      const rand = Math.random();
      if (rand < mutationRate) {
        const prevX = this.coords[i-1]?.x ?? 0;
        const prevY = this.coords[i-1]?.y ?? 0;

        const x = prevX + this.randomX();
        const y = prevY + this.randomY();

        this.coords[i] = { x, y };
      }
    }
  }
}