class Ball {
  dead = false;
  reachedGoal = false;
  
  constructor(canvasSize) {
    this.x = canvasSize / 2;
    this.y = canvasSize - 10;
    this.color = 'blue';
    this.size = 5;
    this.canvasSize = canvasSize;
  }

  random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  calculateDistance (x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    const c = Math.sqrt( a*a + b*b );
    return c;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  isOutOfBounds () {
    return (
      (this.x + this.size) >= this.canvasSize || 
      (this.x - this.size) <= 0 ||
      (this.y + this.size) >= this.canvasSize || 
      (this.y - this.size) <= 0
    );
  }

  hasReachedGoal () {
    const dist = this.calculateDistance(this.x, this.y, this.canvasSize / 2, 40);
    return dist < this.size;
  }

  move () {
    this.x += this.random(-10, 10);
    this.y += this.random(-10, 5);
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
