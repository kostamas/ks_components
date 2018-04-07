import {Checker} from './checker';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {drawArrow} from "./helpers/uiHelper";

export class Spike {
  private static spikesCount = 0;
  public spikeIndex;
  public checkers: Checker [];
  public x: number;
  public y: number;
  public direction: string;
  private showValidMove;

  constructor(x: number, y: number, direction: string) {
    this.spikeIndex = Spike.spikesCount;
    Spike.spikesCount++;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.checkers = [];
  }

  public addChecker(checker) {
    this.checkers.push(checker);
  }

  public getLastChecker() {
    return this.checkers.length ? this.checkers[this.checkers.length - 1] : null;
  }

  public getNextCheckerPosition(index?) {
    let yOffset;
    const {CHECKERS_SIZE} = BACKGAMMON_CONSTANTS;
    const checkersArrLen = this.checkers.length;
    if (index || index === 0) {
      yOffset = index * CHECKERS_SIZE;
    } else {
      yOffset = checkersArrLen < 5 ? checkersArrLen * CHECKERS_SIZE : (checkersArrLen % 5) * CHECKERS_SIZE + 10;
    }
    let y = this.y;
    y += this.direction === 'down' ? yOffset : -yOffset;
    return {x: this.x, y};
  }

  public draw() {
    if (this.showValidMove) {
      let p1, p2;

      if (this.direction === 'down') {
        p1 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2 + 3, this.y + 248];
        p2 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2 + 3, this.y + 218];
      } else {
        p1 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y - 210];
        p2 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y - 180];
      }
      drawArrow(p1, p2);
    }
  }

  public getShowValidMove() {
    return this.showValidMove;
  }

  public setShowValidMove(showValidMove) {
    this.showValidMove = showValidMove;
  }

  public clearCheckers() {
    this.checkers = [];
  }

  public static destroy() {
    Spike.spikesCount = 0;
  }
}
