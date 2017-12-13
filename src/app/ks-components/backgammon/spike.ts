import {Checker} from './checker';

export class Spike {
  private static CHECKER_SIZE = 34;

  private checkers: Checker [];
  private x: number;
  private y: number;
  private direction: string;

  constructor(x: number, y: number, direction: string) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.checkers = [];
  }

  public addChecker(type) {
    let yOffset = this.checkers.length * Spike.CHECKER_SIZE;
    let y = this.y;
    y += this.direction === 'down' ? yOffset : -yOffset;

    let checker = new Checker(this.x, y, type);
    this.checkers.push(checker);
  }
}
