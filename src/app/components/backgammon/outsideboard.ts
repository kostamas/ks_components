import {Canvas} from './canvas';
import {Players} from './players';
import {drawArrow} from './helpers/uiHelper';

export class OutsideBoard {
  public checkers;
  public showArrow;
  readonly position;
  readonly dimensions;

  constructor() {
    this.checkers = {
      [Players.playersNamesMap[Players.playersMap.White]]: [],
      [Players.playersNamesMap[Players.playersMap.Black]]: []
    };

    this.showArrow = {
      [Players.playersNamesMap[Players.playersMap.Black]]: false,
      [Players.playersNamesMap[Players.playersMap.White]]: false
    };

    this.position = {
      [Players.playersNamesMap[Players.playersMap.Black]]: {x: 643, y: 322},
      [Players.playersNamesMap[Players.playersMap.White]]: {x: 643, y: 42}
    };

    this.dimensions = {
      width: 35,
      height: 210
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
    Canvas.context.beginPath();
    Canvas.context.lineWidth = 1;
    Canvas.context.strokeStyle = Players.currentState < 2 ? '#005300' : '#9aa8ff';

    if (this.showArrow[Players.playersNamesMap[Players.playersMap.Black]]) {
      x = this.position[Players.playersNamesMap[Players.playersMap.Black]].x;
      y = this.position[Players.playersNamesMap[Players.playersMap.Black]].y;
      drawArrow([660, 280], [660, 310]);
      Canvas.context.rect(x, y, this.dimensions.width, this.dimensions.height);
      Canvas.context.stroke();
    }
    if (this.showArrow[Players.playersNamesMap[Players.playersMap.White]]) {
      x = this.position[Players.playersNamesMap[Players.playersMap.White]].x;
      y = this.position[Players.playersNamesMap[Players.playersMap.White]].y;
      drawArrow([660, 290], [660, 260]);
      Canvas.context.rect(x, y, this.dimensions.width, this.dimensions.height);
      Canvas.context.stroke();
    }
  }

  public init() {
    this.draw();
  }
}
