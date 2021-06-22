class Ball {
  dead = false;
  
  constructor(height) {

    this.x = height / 2;
    this.y = height - 10;
    this.velX = 0; // TODO: randomize velocity
    this.velY = -3;
    this.color = 'blue';
    this.size = 5;
  }

  random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update (size) {
    if (
      (this.x + this.size) >= size || 
      (this.x - this.size) <= 0 ||
      (this.y + this.size) >= size || 
      (this.y - this.size) <= 0
      ) {
      this.isDead = true;
      this.velX = 0;
      this.velY = 0;
    }
    this.x += this.velX;
    this.y += this.velY;
  }
}

export default Ball;
