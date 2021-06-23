import Brain from './Brain';

class Ball {
  dead = false;
  reachedGoal = false;
  fitness = 0;
  isBest = false;
  
  constructor(canvasSize) {
    this.color = 'blue';
    this.size = 5;
    this.canvasSize = canvasSize;
    this.brain = new Brain(1000, canvasSize);
  }

  calculateFitness () {
    if (this.reachedGoal) {
      this.fitness = 1*1000 - this.brain.step;
    } else {
      const distanceFromGoal = this.calculateDistanceFromGoal();
      this.fitness = 1*100 - distanceFromGoal;
    }
    if (this.fitness < 0) this.fitness = 0;
  }

  isOutOfBounds () {
    const { x, y } = this.brain.current;
    return (
      (x + this.size) >= this.canvasSize || 
      (x - this.size) <= 0 ||
      (y + this.size) >= this.canvasSize || 
      (y - this.size) <= 0
    );
  }

  calculateDistance (x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    const c = Math.abs(Math.sqrt( a*a + b*b ));
    return c;
  }

  calculateDistanceFromGoal () {
    const { x, y } = this.brain.current;
    return this.calculateDistance(x, y, this.canvasSize / 2, 40);
  }

  hasReachedGoal () {
    const dist = this.calculateDistanceFromGoal();
    return dist < this.size;
  }

  reset () {
    this.brain.reset();
    this.dead = false;
    this.reachedGoal = false;
  }

  move () {
    if (!this.brain.hasNext) {
      this.dead = true;
    } else {
      this.brain.next();
    }
  }

  draw (ctx) {
    const { x, y } = this.brain.current;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update () {
    if (!this.dead && !this.reachedGoal) {
      this.move();
      if (this.hasReachedGoal()) {
        this.reachedGoal = true;
        this.calculateFitness();
      } else if (this.isOutOfBounds()) {
        this.dead = true;
        this.calculateFitness();
      }
    }
  }
}

export default Ball;
