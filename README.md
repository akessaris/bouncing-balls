# Bouncing Balls

I've been binge-watching YouTube videos that use AI to beat old video games, and I thought I'd give it a go. This project is based on a tutorial by a YouTuber named [Code Bullet](https://www.youtube.com/c/CodeBullet).

The goal is to implement a basic [genetic algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm) to train a population of balls to reach a goal with increased efficiency.

The way the algorithm works is once every ball in a generation has either gone out of bounds or reached the goal, I select the best performing ones to create a new generation with some slight mutations. The idea is since every new generation is based on the winners from the previous generation, over time I will end up with better performing populations as a whole.
