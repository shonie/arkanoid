import { BonusType } from './Bonus';

export enum BrickColor {
  blue,
  red,
  green,
  purple,
  silver,
  yellow,
}

export interface BrickType {
  color: BrickColor;
  breakable: boolean;
  bonus: BonusType | null;
}

export class Brick implements BrickType {
  public color: BrickColor = BrickColor.silver;
  public breakable: boolean = true;
  public bonus: BonusType | null = null;

  static blue() {
    return new Brick().setColor(BrickColor.blue);
  }
  static red() {
    return new Brick().setColor(BrickColor.red);
  }
  static green() {
    return new Brick().setColor(BrickColor.green);
  }
  static purple() {
    return new Brick().setColor(BrickColor.purple);
  }
  static silver() {
    return new Brick().setColor(BrickColor.silver);
  }
  static yellow() {
    return new Brick().setColor(BrickColor.yellow);
  }
  setColor(color: BrickColor) {
    this.color = color;
    return this;
  }
  setBonus(bonus: BonusType) {
    this.bonus = bonus;
    return this;
  }
  setBreakable(breakable: boolean) {
    this.breakable = breakable;
    return this;
  }
  duplicate(times: number) {
    return new Array(times).fill(null).map(() => this.toObject());
  }
  toObject() {
    const { color, breakable, bonus } = this;
    return { color, breakable, bonus };
  }
}