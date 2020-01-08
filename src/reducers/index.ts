import { combineReducers } from 'redux';
import paddle, { PaddleState } from './paddle';
import progress, { ProgressState } from './progress';

export interface RootState {
  paddle: PaddleState;
  progress: ProgressState;
}

export default combineReducers({
  paddle,
  progress,
});