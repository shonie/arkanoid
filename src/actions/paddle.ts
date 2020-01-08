import { Action } from 'redux';

export const START_MOVING_PADDLE_LEFT = 'START_MOVING_PADDLE_LEFT';
export const START_MOVING_PADDLE_RIGHT = 'START_MOVING_PADDLE_RIGHT';

export interface StartMovingPaddleLeft extends Action {
  type: 'START_MOVING_PADDLE_LEFT';
}

export interface StartMovingPaddleRight extends Action {
  type: 'START_MOVING_PADDLE_RIGHT';
}

export const startMovingPaddleLeft = (): StartMovingPaddleLeft => ({
  type: START_MOVING_PADDLE_LEFT,
});

export const startMovingPaddleRight = (): StartMovingPaddleRight => ({
  type: START_MOVING_PADDLE_RIGHT,
});

export type PaddleAction = StartMovingPaddleLeft | StartMovingPaddleRight;