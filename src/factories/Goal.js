class Goal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = 'green';
    this.size = 10;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

export default Goal;