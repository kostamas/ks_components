import {Checker} from './checker';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {StateManager} from './stateManager';
import {isOverlap} from "./helpers/backgammonUtils";
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

  public getNextCheckerPosition() {
    const yOffset = this.checkers.length * BACKGAMMON_CONSTANTS.CHECKERS_SIZE;
    let y = this.y;
    y += this.direction === 'down' ? yOffset : -yOffset;
    return {x: this.x, y};
  }

  private init() {
  }

  private isContainChecker(checkerId) {
    for (let i = 0; i < this.checkers.length; i++) {
      if (this.checkers[i].getCheckerId() === checkerId) {
        return true;
      }
    }
  }

  public drawSpike() {
    if (this.showValidMove) {
      let p1, p2;

      if (this.direction === 'down') {
        p1 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y + 248];
        p2 = [this.x + BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y + 218]
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
