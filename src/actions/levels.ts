import { Action } from 'redux';

export const NEXT_LEVEL = 'NEXT_LEVEL';

export interface NextLevel extends Action {
  type: 'NEXT_LEVEL';
}

export const nextLevel = (): NextLevel => ({
  type: NEXT_LEVEL,
});

export type LevelsAction = NextLevel;
