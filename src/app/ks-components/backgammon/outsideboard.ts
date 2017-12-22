import {Canvas} from './canvas';
import {Players} from './players';
import {drawArrow} from './helpers/uiHelper';

export class OutsideBoard {
  public offTheBoardCheckers;
  public showArrow;

  constructor() {
    this.offTheBoardCheckers = {
      checkers: {
        [Players.playersNamesMap[Players.playersMap.white]]: [],
        [Players.playersNamesMap[Players.playersMap.black]]: []
      }
    };

    this.showArrow = {
      [Players.playersNamesMap[Players.playersMap.black]]: false,
      [Players.playersNamesMap[Players.playersMap.white]]: false
    };

    this.init();
  }

  public getNextCheckerPosition(playerType) {
    if (playerType === Players.playersMap.black) {
      return {x: 525, y: 235 + this.offTheBoardCheckers[Players.playersNamesMap[Players.playersMap.black]].length * 7};
    } else {
      return {x: 525, y: 385 + this.offTheBoardCheckers[Players.playersNamesMap[Players.playersMap.white]].length * 7}
    }
  }

  public draw() {
    Canvas.context.lineWidth = 1;
    Canvas.context.strokeStyle = '#003b0d';

    if (this.showArrow[Players.playersNamesMap[Players.playersMap.black]]) {
      drawArrow([660, 320], [660, 350]);
      Canvas.context.rect(643, 360, 35, 80);
      Canvas.context.stroke();
    }
    if (this.showArrow[Players.playersNamesMap[Players.playersMap.white]]) {
      drawArrow([660, 255], [660, 225]);
      Canvas.context.rect(643, 135, 35, 80);
      Canvas.context.stroke();
    }
  }

  public init() {
    this.draw();
  }
}
