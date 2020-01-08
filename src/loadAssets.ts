import * as Phaser from 'phaser';
import paddleImg from './assets/paddle1.png';
import ballImg from './assets/ball1.png';
import blue1 from './assets/blue1.png';
import red1 from './assets/red1.png';
import green1 from './assets/green1.png';
import yellow1 from './assets/yellow1.png';
import silver1 from './assets/silver1.png';
import purple1 from './assets/purple1.png';
import heart from './assets/heart.png';

export function loadAssets(scene: Phaser.Scene): void {
  scene.load.image('paddle', paddleImg);
  scene.load.image('ball', ballImg);
  scene.load.image('blue1', blue1);
  scene.load.image('red1', red1);
  scene.load.image('green1', green1);
  scene.load.image('yellow1', yellow1);
  scene.load.image('silver1', silver1);
  scene.load.image('purple1', purple1);
  scene.load.image('heart', heart);
}