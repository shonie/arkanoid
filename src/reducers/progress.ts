import { createReducer } from 'redux-create-reducer';
import { ProgressAction, SET_SCORE, DIE, SetScore, Die } from '../actions/progress';

export type ProgressState = {
  score: number;
  lives: number;
  gameOver: boolean;
};

const defaultState: ProgressState = {
  score: 0,
  lives: 3,
  gameOver: false,
};

export default createReducer<ProgressState, ProgressAction>(defaultState, {
  [SET_SCORE]: (state: ProgressState, action: SetScore) => ({
    ...state,
    score: action.score,
  }),
  [DIE]: (state: ProgressState, action: Die) => ({
    ...state,
    lives: state.lives > 0 ? state.lives - 1 : 0,
    gameOver: state.gameOver || state.lives - 1 === 0,
  }),
});