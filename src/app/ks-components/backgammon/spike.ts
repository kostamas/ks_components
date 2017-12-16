import {Checker} from './checker';
import {BACKGAMMON_CONSTANTS} from './backgammonConstants';
import {StateManager} from './stateManager';
import {isOverlap} from "./helpers/backgammonUtils";

export class Spike {
  private static spikesCount = 0;

  private checkers: Checker [];
  private x: number;
  private y: number;
  private direction: string;

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
    StateManager.onSelectedCheckerMove(this.checkerMoveHandler, Spike.spikesCount);
  }

  private checkerMoveHandler = ({x, y, checkerId}) => {
    const targetY = this.direction === 'down' ? this.y - 10 : this.y - 160 + 10;
    if (isOverlap(x, y - 10, this.x, targetY, 50, 160)) {
      console.log({x, y, checkerId});
    }
  }
}
