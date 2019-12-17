import Game from './Game.js';
import { addInteractivity } from './addInteractivity.js';
import { draw } from './draw.js';

const canvas = document.getElementById('main');

const ctx = canvas.getContext('2d');

const game = new Game({
  bricks: {
    x: 5,
    y: 3,
  },
  ball: {
    x: canvas.width / 2,
    y: canvas.height - 30,
  }
});

addInteractivity(game);

draw(game, ctx);
