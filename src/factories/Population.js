import Ball from './Ball';

export default class Population {
  balls = [];
  gen = 0;

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

  getFitnessSum () {
    return this.balls.reduce((acc, { fitness }) => acc += fitness,0);
  }

  //this function works by randomly choosing a value between 0 and the sum of all the fitnesses
  //then go through all the dots and add their fitness to a running sum and if that sum is greater than the random value generated that dot is chosen
  //since dots with a higher fitness function add more to the running sum then they have a higher chance of being chosen
  selectChild (fitnessSum) {
    const rand = Math.random() * fitnessSum;
    let runningSum = 0;
    for (let i = 0; i< this.balls.length; i++) {
      runningSum+= this.balls[i].fitness;
      if (runningSum > rand) {
        return this.balls[i];
      }
    }
    //should never get to this point
    return this.balls[0];
  }

  // Choose the balls that performed the best
  naturalSelection () {
    // Get best performing ball to make sure we don' mutate it
    this.balls[0] = this.getBestBall();
    this.balls[0].isBest = true;

    const maxStep = this.balls[0].brain.step;

    // Set next generation based on fitness
    const fitnessSum = this.getFitnessSum();
    for (let i = 1; i < this.balls.length; i++) {
      this.balls[i] = this.selectChild(fitnessSum);
      this.balls[i].brain.mutate();
      this.balls[i].maxStep = maxStep;
    }
  }

  restart () {
    this.balls.forEach(ball => {
      ball.reset();
    });
  }

  // Reset game state, prioritize best performers
  reset () {
    this.naturalSelection();
    this.restart();
    this.gen++;
  }
}