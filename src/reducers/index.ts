import { combineReducers } from 'redux';
import paddle, { PaddleState } from './paddle';
import progress, { ProgressState } from './progress';
import levels, { LevelsState } from './levels';

export interface RootState {
  paddle: PaddleState;
  progress: ProgressState;
  levels: LevelsState;
}

export default combineReducers({
  paddle,
  progress,
  levels,
});