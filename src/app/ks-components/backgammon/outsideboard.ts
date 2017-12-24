import {Canvas} from './canvas';
import {Players} from './players';
import {drawArrow} from './helpers/uiHelper';

export class OutsideBoard {
  public checkers;
  public showArrow;
  private position;
  private dimensions;

  constructor() {
    this.checkers = {
        [Players.playersNamesMap[Players.playersMap.white]]: [],
        [Players.playersNamesMap[Players.playersMap.black]]: []

    };

    this.showArrow = {
      [Players.playersNamesMap[Players.playersMap.black]]: false,
      [Players.playersNamesMap[Players.playersMap.white]]: false
    };

    this.position = {
      [Players.playersNamesMap[Players.playersMap.black]]: {x: 643, y: 360},
      [Players.playersNamesMap[Players.playersMap.white]]: {x: 643, y: 95}
    };

    this.dimensions = {
      width: 35,
      height: 120
    };

    this.init();
  }

  public getNextCheckerPosition(playerType) {
    let x, y;
    x = this.position[Players.playersNamesMap[playerType]].x;
    y = this.position[Players.playersNamesMap[playerType]].y;
    return {x: x, y: y + this.checkers[Players.playersNamesMap[playerType]].length * 7};
  }

  public getPosition(playerType) {
    return this.position[Players.playersNamesMap[playerType]];
  }

  public getDimensions() {
    return this.dimensions;
  }

  public draw() {
    let x, y;
    Canvas.context.lineWidth = 1;
    Canvas.context.strokeStyle = '#003b0d';

    if (this.showArrow[Players.playersNamesMap[Players.playersMap.black]]) {
      x = this.position[Players.playersNamesMap[Players.playersMap.black]].x;
      y = this.position[Players.playersNamesMap[Players.playersMap.black]].y;
      drawArrow([660, 320], [660, 350]);
      Canvas.context.rect(x, y, this.dimensions.width, this.dimensions.height);
      Canvas.context.stroke();
    }
    if (this.showArrow[Players.playersNamesMap[Players.playersMap.white]]) {
      x = this.position[Players.playersNamesMap[Players.playersMap.white]].x;
      y = this.position[Players.playersNamesMap[Players.playersMap.white]].y;
      drawArrow([660, 255], [660, 225]);
      Canvas.context.rect(x, y, this.dimensions.width, this.dimensions.height);
      Canvas.context.stroke();
      Canvas.context.stroke();
    }
  }

  public init() {
    this.draw();
  }
}
