import {Checker} from './checker';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {drawArrow} from "./helpers/uiHelper";

export class Spike {
  private static spikesCount = 0;

  public checkers: Checker [];
  public x: number;  // todo - check readonly usage
  public y: number;
  public direction: string;
  private showValidMove;

  constructor(x: number, y: number, direction: string) {
    Spike.spikesCount++;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.checkers = [];
    this.init();
  }

  public addChecker(checker) {
    this.checkers.push(checker);
  }

  public getNextCheckerPosition(index?) {
    let yOffset;
    if(index || index === 0){
      yOffset = index * BACKGAMMON_CONSTANTS.CHECKERS_SIZE
    } else {
      yOffset = this.checkers.length * BACKGAMMON_CONSTANTS.CHECKERS_SIZE;
    }
    let y = this.y;
    y += this.direction === 'down' ? yOffset : -yOffset;
    return {x: this.x, y};
  }

  private init() {
  }

  public drawSpike() {
    if (this.showValidMove) {
      let p1, p2;

      if (this.direction === 'down') {
        p1 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2 + 3, this.y + 248];
        p2 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2 + 3, this.y + 218]
      } else {
        p1 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y - 210];
        p2 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y - 180];
      }
      drawArrow(p1, p2);
    }
  }

  public setShowValidMove(showValidMove) {
    this.showValidMove = showValidMove;
  }
}
