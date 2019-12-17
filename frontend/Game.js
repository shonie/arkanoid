import { makeBricks } from './bricks.js';
import Ball from './Ball.js';

class Game {
  constructor({ bricks, ball }) {
    this.isPlaying = false;
    this.bricks = makeBricks(bricks.x, bricks.y);
    this.movingLeft = false;
    this.movingRight = false;
    this.ball = new Ball({
      initialCoordinates: {
        x: ball.x,
        y: ball.y,
      },
    });
    this.score = 0;
  }

  stopMoving() {
    this.movingLeft = false;
    this.movingRight = false;
  }

  startMovingLeft() {
    this.movingLeft = true;
    this.movingRight = false;
  }

  startMovingRight() {
    this.movingLeft = false;
    this.movingRight = true;
  }

  start() {
    this.isPlaying = true;
  }

  finish() {
    this.isPlaying = false;
  }
}

export default Game;
