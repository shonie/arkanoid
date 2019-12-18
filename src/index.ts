import * as Phaser from 'phaser';
import bomb from './assets/bomb.png';
import dude from './assets/dude.png';
import platform from './assets/platform.png';
import sky from './assets/sky.png';
import star from './assets/star.png';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  }
};
const game = (window as any).game = new Phaser.Game(config);

function preload(this: Phaser.Scene) {
  this.load.image('sky', sky);
  this.load.image('ground', platform);
  this.load.image('star', star);
  this.load.image('bomb', bomb);
  this.load.spritesheet('dude',
    dude,
    { frameWidth: 32, frameHeight: 48 }
  );
}
function create(this: Phaser.Scene) {
  this.add.image(400, 300, 'sky');
}
function update() { }