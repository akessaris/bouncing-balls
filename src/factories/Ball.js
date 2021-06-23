import Brain from './Brain';

class Ball {
  dead = false;
  reachedGoal = false;
  brainIndex = 0;
  
  constructor(canvasSize) {
    this.color = 'blue';
    this.size = 5;
    this.canvasSize = canvasSize;
    this.brain = new Brain(1000, canvasSize);
  }

  isOutOfBounds () {
    return (
      (this.x + this.size) >= this.canvasSize || 
      (this.x - this.size) <= 0 ||
      (this.y + this.size) >= this.canvasSize || 
      (this.y - this.size) <= 0
    );
  }

  calculateDistance (x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    const c = Math.sqrt( a*a + b*b );
    return c;
  }

  hasReachedGoal () {
    const dist = this.calculateDistance(this.x, this.y, this.canvasSize / 2, 40);
    return dist < this.size;
  }

  move () {
    const { x, y } = this.brain.getNextCoord();
    this.x = x;
    this.y = y;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update () {
    if (!this.dead) {
      this.move();

      if (this.hasReachedGoal()) {
        this.reachedGoal = true;
        console.log('Ball reached goal')
        this.dead = true;
      } else if (this.isOutOfBounds()) {
        this.dead = true;
      }
    }
  }
}

export default Ball;
