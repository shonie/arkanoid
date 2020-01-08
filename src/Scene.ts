import * as Phaser from 'phaser';
import { loadAssets } from './loadAssets';
import { StoreType } from './store';
import { setScore, die } from './actions/progress';

const PADDLE_HEIGHT = 24;
const BALL_HEIGHT = 22;
const BRICK_WIDTH = 64;
const BRICK_HEIGHT = 32;

class Scene extends Phaser.Scene {
  store: StoreType;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  paddle: Phaser.Physics.Arcade.Image;
  ball: Phaser.Physics.Arcade.Image;
  bricks: Phaser.Physics.Arcade.StaticGroup;
  score: Phaser.GameObjects.Text;
  lives: Phaser.Physics.Arcade.StaticGroup;
  message: Phaser.GameObjects.Text;

  constructor(
    store: StoreType,
    config: Phaser.Types.Scenes.SettingsConfig = {}
  ) {
    super(config);
    this.store = store;
  }

  preload() {
    loadAssets(this);
  }

  get width() {
    return this.game.scale.width;
  }

  get height() {
    return this.game.scale.height;
  }

  get bricksConfig() {
    const frameQuantity = Math.floor(this.width / BRICK_WIDTH);
    const leftSpace = this.width - frameQuantity * BRICK_WIDTH;
    const bricksConfig: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
      frameQuantity,
      key: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
      gridAlign: {
        cellWidth: BRICK_WIDTH,
        cellHeight: BRICK_HEIGHT,
        width: frameQuantity,
        height: 6,
        x: BRICK_WIDTH / 2 + leftSpace / 2,
        y: 75,
      },
    };
    return bricksConfig;
  }

  create() {
    this.setupWorld();
    this.addControls();
    this.addBricks();
    this.addPaddle();
    this.addBall();
    this.addLives();
    this.addScore();
    this.addColliders();
  }

  setupWorld() {
    this.physics.world.setBoundsCollision(true, true, true, false);
  }

  addControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
      if (this.ball.getData('onPaddle')) {
        this.ball.x = this.paddle.x;
      }

    }, this);
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this.ball.getData('onPaddle')) {
        this.ball.setVelocity(-75, -300);
        this.ball.setData('onPaddle', false);
      }
    }, this);
  }

  addBricks() {
    this.bricks = this.physics.add.staticGroup(this.bricksConfig);
  }

  addBall() {
    this.ball = this.physics.add
      .image(this.paddle.x, this.height - PADDLE_HEIGHT - BALL_HEIGHT / 2, 'ball')
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setData('onPaddle', true);
  }

  addLives() {
    const { progress } = this.store.getState();
    this.lives = this.physics.add.staticGroup({
      key: 'heart',
      repeat: progress.lives - 1,
      setXY: {
        x: this.width - 120,
        y: 25,
        stepX: 50,
      },
    });
    this.lives.children.iterate((life: Phaser.GameObjects.GameObject | any) =>
      life.setScale(0.02, 0.02)
    );
  }

  addPaddle() {
    this.paddle = this.physics.add.image(this.width / 2, this.height - PADDLE_HEIGHT / 2, 'paddle').setCollideWorldBounds(true).setImmovable().setGravityY(0);
  }

  addScore() {
    const { progress } = this.store.getState();
    this.score = this.add.text(
      this.width / 10 / 2,
      20,
      `Score: ${progress.score}`
    );
  }

  addColliders() {
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle);
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick);
  }

  addGameOverMessage() {
    const style = {
      fontWeight: 'bold',
      fontSize: '32px',
      fill: 'red'
    };
    this.message = this.add.text(this.width / 2 - 80, this.height / 2, 'Game over', style);
  }

  update() {
    const { progress: { gameOver } } = this.store.getState();
    if (gameOver) {
      return this.addGameOverMessage();
    }
    this.updatePaddle();
    this.updateBall();
    this.updateLives();
    this.updateScore();
  }

  updateBricks() {
    this.bricks.createFromConfig(this.bricksConfig);
  }

  updatePaddle() {
    this.paddle.y = this.height - PADDLE_HEIGHT / 2;
    if (this.cursors!.left?.isDown) {
      this.paddle.setVelocityX(-280);
      if (this.ball.getData('onPaddle')) {
        this.keepBallOnPaddle();
      }
    } else if (this.cursors!.right?.isDown) {
      this.paddle.setVelocityX(280);
      if (this.ball.getData('onPaddle')) {
        this.keepBallOnPaddle()
      }
    } else {
      this.paddle.setVelocityX(0);
    }
  }

  updateBall() {
    if (this.ball.y > this.height) {
      this.die();
    }
    if (this.cursors!.space?.isDown) {
      this.ball.setData('onPaddle', false);
      this.ball.setVelocity(-75, -300);
    }
  }

  keepBallOnPaddle() {
    this.ball.setX(this.paddle.x);
  }

  updateLives() {
    const { progress } = this.store.getState();
    if (this.lives.children.size !== progress.lives) {
      this.lives.children.getArray()[0]?.destroy();
    }
  }

  updateScore() {
    const { progress: { score } } = this.store.getState();
    this.score.setText(`Score: ${score}`);
  }

  hitPaddle = (
    ball: Phaser.GameObjects.GameObject | any,
    paddle: Phaser.GameObjects.GameObject | any
  ) => {
    let diff = 0;
    if (ball.getData('onPaddle')) {
      return;
    }
    if (ball.x < paddle.x) {
      diff = paddle.x - ball.x;
      ball.setVelocityX(-8 * diff);
    } else if (ball.x > paddle.x) {
      diff = ball.x - paddle.x;
      ball.setVelocityX(8 * diff);
    } else {
      ball.setVelocityX(2 + Math.random() * 8);
    }
  };

  hitBrick = (
    ball: Phaser.GameObjects.GameObject | any,
    brick: Phaser.GameObjects.GameObject | any
  ) => {
    const { progress: { score } } = this.store.getState();
    brick.disableBody(true, true);
    const newScore = score + 100;
    this.store.dispatch(setScore(newScore));
  };

  resetBall() {
    this.ball.setData('onPaddle', true);
    this.ball.setVelocity(0, 0);
    this.ball.setPosition(this.paddle.x, this.height - PADDLE_HEIGHT - BALL_HEIGHT / 2);
  }

  die = () => {
    this.store.dispatch(die());
    this.resetBall();
  };
}

export default Scene;
