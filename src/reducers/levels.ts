import { levels, Level } from '../levels';
import { createReducer } from 'redux-create-reducer';
import { LevelsAction, NEXT_LEVEL } from '../actions/levels';

export interface LevelsState {
  levels: Level[];
  current: number;
}

const defaultState: LevelsState = {
  levels,
  current: 0,
};

export default createReducer<LevelsState, LevelsAction>(defaultState, {
  [NEXT_LEVEL]: (state: LevelsState) => ({
    ...state,
    current: state.current + 1 > state.levels.length - 1 ? state.current : state.current + 1,
  }),
});
