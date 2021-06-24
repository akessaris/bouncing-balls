import Brain from './Brain';

class Ball {
  dead = false;
  reachedGoal = false;
  fitness = 0;
  isBest = false;

  static id = 0;
  
  constructor(canvasSize) {
    this._id = Ball.id++;
    this.color = 'blue';
    this.size = 5;
    this.canvasSize = canvasSize;
    this.brain = new Brain(canvasSize);
  }

  calculateFitness () {
    if (this.reachedGoal) {
      this.fitness = 1.0/16 + 1.0*10000/(this.brain.step*this.brain.step);
    } else {
      const distanceFromGoal = this.calculateDistanceFromGoal();
      this.fitness = 1.0/(distanceFromGoal*distanceFromGoal);
    }
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
    return this.calculateDistance(x, y, this.canvasSize / 2, this.canvasSize - 40);
  }

  hasReachedGoal () {
    const dist = this.calculateDistanceFromGoal();
    return dist < this.size + 5;
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
      } else if (this.isOutOfBounds()) {
        this.dead = true;
      }
      if (this.reachedGoal || this.dead) {
        this.calculateFitness();
      }
    }
  }
}

export default Ball;
