import { createReducer } from 'redux-create-reducer';
import { PaddleAction, START_MOVING_PADDLE_LEFT, START_MOVING_PADDLE_RIGHT } from '../actions/paddle';

export interface PaddleState {
  movingLeft: boolean;
  movingRight: boolean;
}

const defaultState: PaddleState = {
  movingLeft: false,
  movingRight: false,
};

export default createReducer<PaddleState, PaddleAction>(defaultState, {
  [START_MOVING_PADDLE_LEFT]: (state: PaddleState) => ({
    ...state,
    movingRight: false,
    movingLeft: true,
  }),
  [START_MOVING_PADDLE_RIGHT]: (state: PaddleState) => ({
    ...state,
    movingRight: true,
    movingLeft: false,
  }),
});