import * as Phaser from 'phaser';
import bomb from './assets/bomb.png';
import dude from './assets/dude.png';
import platform from './assets/platform.png';
import sky from './assets/sky.png';
import star from './assets/star.png';

let platforms: Phaser.Physics.Arcade.StaticGroup;
let player: Phaser.Physics.Arcade.Sprite;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let stars: Phaser.Physics.Arcade.Group;
let score = 0;
let scoreText: Phaser.GameObjects.Text;
let bombs: Phaser.Physics.Arcade.Group;
let gameOver = false;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};
new Phaser.Game(config);

function preload(this: Phaser.Scene) {
  this.load.image('sky', sky);
  this.load.image('ground', platform);
  this.load.image('star', star);
  this.load.image('bomb', bomb);
  this.load.spritesheet('dude', dude, {
    frameWidth: 32,
    frameHeight: 48,
  });
}
function create(this: Phaser.Scene) {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.3);
  player.setCollideWorldBounds(true);
  player.setGravityY(500);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', {
      start: 5,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate((child: Phaser.GameObjects.GameObject | any) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(player, platforms);

  this.physics.add.collider(stars, platforms);

  this.physics.add.overlap(player, stars, collectStar);

  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000',
  });

  bombs = this.physics.add.group();

  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, undefined, this);
}

function update() {
  if (cursors!.left?.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors!.right?.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  if (cursors.up?.isDown && player.body.touching.down) {
    player.setVelocityY(-660);
  }
}

function collectStar(
  player: Phaser.GameObjects.GameObject,
  star: Phaser.GameObjects.GameObject | any
) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);
  if (stars.countActive(true) === 0) {
    dropBomb();
  }
}

function dropBomb() {
  stars.children.iterate((child: Phaser.GameObjects.GameObject | any) => {
    child.enableBody(true, child.x, 0, true, true);
  });

  const x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  const bomb = bombs.create(x, 16, 'bomb');
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}

function hitBomb(
  this: Phaser.Scene,
  player: Phaser.GameObjects.GameObject | any
) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}
