import { Level } from './types';
import { Brick } from '../Brick';

export const level1: Level = [
  Brick.blue().duplicate(10),
  Brick.red().duplicate(10),
  Brick.green().duplicate(10),
  Brick.purple().duplicate(10),
  Brick.silver().duplicate(10),
  Brick.yellow().duplicate(10),
]
