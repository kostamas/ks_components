import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {isOverlap} from './helpers/backgammonUtils';
import {getCheckerSvg} from './helpers/uiHelper';
import {Players} from './players';

const {playersMap} = Players;

export class Checker {
  private static checkersCount = 0;
  public static selectedCheckers: any = {};
  readonly id;
  readonly checkerSvgImg;
  public x;
  public y;
  public type;
  public currentSpike;
  public isOffBoard = false;
  readonly radius;  // todo - define as constant
  private isHovered;
  private isClicked;
  private svgData;
  private static animFrame = null;
  private static timeout = null;
  private static isGlobalClicked = false;

  constructor(x, y, type, currentSpike) {
    Checker.checkersCount++;
    this.id = Checker.checkersCount;
    this.checkerSvgImg = new Image();
    this.type = type;  // black or white
    this.x = x;
    this.y = y;
    this.currentSpike = currentSpike;
    this.radius = BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2;
    this.init();
  }

  private init() {
    this.initPosition();
    this.subscribeToMouseEvents();
  }

  public setPosition({x, y}) {
    this.x = x;
    this.y = y;
  }

  private subscribeToMouseEvents = () => {
    BackgammonStateManager.onMouseClick(this.mouseClickHandler, this.id);
    BackgammonStateManager.onMouseMove(this.mouseMoveHandler, this.id);
  }

  private mouseMoveHandler = ({x, y}) => {
    if (this.type !== Players.currentState || !Players.isCurrentOnlinePlayer()) {
      return;
    }

    if (this.isClicked) {
      BackgammonStateManager.notifySelectedCheckerMove({x, y, checker: this});
      BackgammonStateManager.notifyRedraw();
      this.x = x - this.radius * 1.5;
      this.y = y - this.radius * 1.5;
    }

    if (isOverlap(x, y, this.x, this.y, BACKGAMMON_CONSTANTS.CHECKERS_SIZE, BACKGAMMON_CONSTANTS.CHECKERS_SIZE)) {
      if (!this.isHovered) {
        Canvas.context.beginPath();
        Canvas.context.arc(this.x + this.radius, this.y + this.radius, this.radius - 5, 0, 2 * Math.PI, false);
        Canvas.context.fillStyle = this.type === playersMap.Black ? 'rgba(0, 255, 0, 0.4)' : 'rgba(0, 0, 255, 0.4)';
        Canvas.context.fill();
        this.isHovered = true;
      }
    } else {
      if (this.isHovered) {
        this.draw();
      }
      this.isHovered = false;
    }
  };

  private mouseClickHandler = ({x, y}) => {

    if (this.type !== Players.currentState || this.isOffBoard || !Players.isCurrentOnlinePlayer()) {
      return;
    }

    if (this.isClicked) {
      BackgammonStateManager.notifySelectedCheckerDrop({x, y, checker: this});
      this.isClicked = false;
      setTimeout(() => Checker.isGlobalClicked = false, 0);
      Checker.selectedCheckers[this.type] = false;
      window.cancelAnimationFrame(Checker.animFrame);
      clearTimeout(Checker.timeout);
      Checker.animFrame = null;
      this.draw();
    } else {
      if (!Checker.selectedCheckers[this.type] && !Checker.isGlobalClicked &&
        isOverlap(x, y, this.x, this.y, BACKGAMMON_CONSTANTS.CHECKERS_SIZE, BACKGAMMON_CONSTANTS.CHECKERS_SIZE)) {
        let x = Checker.isGlobalClicked;
        this.isClicked = true;
        Checker.isGlobalClicked = true;
        Checker.selectedCheckers[this.type] = true;
        BackgammonStateManager.notifySelectChecker({x, y, checker: this});
      }
    }
  }

  private initPosition() {
    const svgAsString = getCheckerSvg(Players.playersNamesMap[this.type]);
    const _window: any = window;
    const DOMURL = _window.URL || _window.webkitURL || _window;

    const svgBlob = new Blob([svgAsString], {type: 'image/svg+xml'});
    const url = DOMURL.createObjectURL(svgBlob);

    this.svgData = {svgBlob: url};

    this.checkerSvgImg.onload = () => {
      this.draw();
    };
    this.checkerSvgImg.src = url;
  }

  public draw = (x?, y?) => {
    const _window: any = window;
    const DOMURL = _window.URL || _window.webkitURL || _window;
    Canvas.context.drawImage(this.checkerSvgImg, x || this.x, y || this.y);
    DOMURL.revokeObjectURL(this.svgData.url);

    if (this.isClicked) {
      Canvas.context.beginPath();
      Canvas.context.arc(x || this.x + this.radius, y || this.y + this.radius, this.radius - 5, 0, 2 * Math.PI, false);
      Canvas.context.fillStyle = this.type === playersMap.Black ? 'rgba(0, 255, 0, 0.6)' : 'rgba(0, 0, 255, 0.6)';
      Canvas.context.fill();
    }
  };

  public getCheckerId() {
    return this.id;
  }

  public static destroy() {
    Checker.checkersCount = 0;
    Checker.selectedCheckers = {};
    window.cancelAnimationFrame(Checker.animFrame);
    clearTimeout(Checker.timeout);
    Checker.animFrame = null;
  }

  // todo - create clear functions for mousemove, click, subscriptions...
}
