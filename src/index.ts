import * as Phaser from 'phaser';
import Scene from './Scene';
import store from './store';
import './style.css';

function createConfig(scene: Phaser.Scene) {
  const config: Phaser.Types.Core.GameConfig = {
    scene,
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0,
          x: 0,
        },
        debug: !!process.env.DEBUG,
      },
    },
    scale: {
      parent: 'body',
      mode: Phaser.Scale.RESIZE,
    },
  }
  return config;
}

const scene = new Scene(store);

const game = new Phaser.Game(createConfig(scene));

game.scale.on('orientationchange', () => {
  game.scale.setGameSize(window.innerWidth, window.innerHeight);
});

if (process.env.DEBUG) {
  type Globals = {
    game: Phaser.Game;
    scene: Scene;
  }
  type DebuggableGlobal = typeof globalThis & Globals;
  const global: DebuggableGlobal = globalThis as DebuggableGlobal;
  global.game = game;
  global.scene = scene;
}
