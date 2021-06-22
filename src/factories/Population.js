import Ball from './Ball';

export default class Population {
  balls = [];

  constructor(num, canvasSize) {
    this.canvasSize = canvasSize;
    for (let i = 0; i < num; i++) {
      const ball = new Ball(canvasSize);
      this.balls.push(ball)
    }
  }

  isAllDead () {
    return !this.balls.find(({ isDead }) => !isDead);
  }
}