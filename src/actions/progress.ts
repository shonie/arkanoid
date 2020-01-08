import { Action } from 'redux';

export const SET_SCORE = 'SET_SCORE';
export const DIE = 'DIE';

export interface SetScore extends Action {
  type: 'SET_SCORE';
  score: number;
}

export interface Die extends Action {
  type: 'DIE';
}

export const setScore = (score: number): SetScore => ({
  score,
  type: SET_SCORE,
});

export const die = (): Die => ({
  type: DIE,
});

export type ProgressAction = SetScore | Die;