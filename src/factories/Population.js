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

  // Have all balls reached the goal or died trying?
  isAllDead () {
    return !this.balls.find(({ dead, reachedGoal }) => !dead && !reachedGoal);
  }

  getBestBall () {
    return this.balls.reduce((acc, ball) => {
      if (!acc) {
        acc = ball;
      } else if (ball.fitness > acc.fitness) {
        acc.isBest = false;
        acc = ball;
      } else {
        ball.isBest = false;
      }
      return acc;
    },null)
  }

  // Choose the balls that performed the best
  naturalSelection () {
    const bestBall = this.getBestBall();
    bestBall.isBest = true;

    this.balls.forEach(ball => {
      ball.brain.coords = [...bestBall.brain.coords];
    });
  }

  // Add slight mutation
  mutate () {
  }

  restart () {
    this.balls.forEach(ball => {
      ball.reset();
    });
  }

  // Reset game state, prioritize best performers
  reset () {
    this.naturalSelection();
    this.mutate();
    this.restart();
  }
}