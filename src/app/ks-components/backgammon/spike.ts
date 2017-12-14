import {Checker} from './checker';
import {BACKGAMMON_CONSTANTS} from './backgammonConstants';

export class Spike {

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

  public addChecker(checker) {
    this.checkers.push(checker);
  }

  public getNextCheckerPosition() {
    let yOffset = this.checkers.length * BACKGAMMON_CONSTANTS.CHECKERS_SIZE;
    let y = this.y;
    y += this.direction === 'down' ? yOffset : -yOffset;

    return {x: this.x, y};
  }
}
