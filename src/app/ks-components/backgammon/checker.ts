import {Canvas} from './canvas';
import {StateManager} from './stateManager';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {isOverlap} from './helpers/backgammonUtils';
import {calcPointsCircle, getCheckerSvg} from './helpers/uiHelper';
import {Players} from "./players";

export class Checker {
  private static checkersCount = 0;
  private id;
  private checkerSvgImg;
  private x;
  private y;
  public type; // todo use readonly
  public currentSpike; // todo use readonly
  private radius;
  private isHovered;
  private isClicked;
  private svgData;
  private animFrame = null;
  private timeout = null;

  constructor(x, y, type, currentSpike) {
    Checker.checkersCount++;
    this.id = Checker.checkersCount;
    this.checkerSvgImg = new Image();
    this.type = type;
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
    StateManager.onMouseClick(this.mouseClickHandler, this.id);
    StateManager.onMouseMove(this.mouseMoveHandler, this.id);
  };

  private mouseMoveHandler = ({x, y}) => {
    if (this.isClicked) {
      StateManager.notifySelectedCheckerMove({x, y, checkerId: this.id});
      StateManager.notifyRedraw();
      this.x = x - this.radius * 1.5;
      this.y = y - this.radius * 1.5;
    }

    if (isOverlap(x, y, this.x, this.y, BACKGAMMON_CONSTANTS.CHECKERS_SIZE, BACKGAMMON_CONSTANTS.CHECKERS_SIZE)) {
      if (!this.isHovered) {
        Canvas.context.beginPath();
        Canvas.context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI, false);
        Canvas.context.fillStyle = 'rgba(255, 0, 0, 0.6)';
        Canvas.context.fill();
        this.isHovered = true;
      }
    } else {
      if (this.isHovered) {
        this.drawChecker();
      }
      this.isHovered = false;
    }
  };

  private mouseClickHandler = ({x, y}) => {
    if (this.isClicked) {
      StateManager.notifySelectedCheckerDrop({x, y, checker: this});
      this.isClicked = false;
      window.cancelAnimationFrame(this.animFrame);
      clearTimeout(this.timeout);
      this.animFrame = null;
      this.drawChecker();
    } else {
      if (isOverlap(x, y, this.x, this.y, BACKGAMMON_CONSTANTS.CHECKERS_SIZE, BACKGAMMON_CONSTANTS.CHECKERS_SIZE)) {
        this.isClicked = true;
        this.animateSelectedChecker();
        StateManager.notifySelectChecker({x, y, checker: this});
      }
    }
  };

  private animateSelectedChecker = () => {
    let degrees = 0;
    const animatFn = () => {
      this.drawChecker();
      Canvas.context.save();
      Canvas.context.translate(this.x + this.radius, this.y + this.radius);
      Canvas.context.rotate(degrees * (Math.PI / 180));
      calcPointsCircle(0, 0, this.radius - 1, 1);
      Canvas.context.rotate(-degrees * (Math.PI / 180));
      Canvas.context.translate((this.x + this.radius) * -1, (this.y + this.radius) * -1);
      Canvas.context.restore();
      degrees += 20;
      this.timeout = setTimeout(() => this.animFrame = window.requestAnimationFrame(animatFn), 100);
    };
    this.animFrame = window.requestAnimationFrame(animatFn);
  };

  private initPosition() {
    let svgAsString = getCheckerSvg(Players.playersNamesMap[this.type]);
    const _window: any = window;
    const DOMURL = _window.URL || _window.webkitURL || _window;

    const svgBlob = new Blob([svgAsString], {type: 'image/svg+xml'});
    const url = DOMURL.createObjectURL(svgBlob);

    this.svgData = {svgBlob: url};

    this.checkerSvgImg.onload = () => {
      this.drawChecker();
    };
    this.checkerSvgImg.src = url;
  }

  public drawChecker(x?, y?) {
    const _window: any = window;
    const DOMURL = _window.URL || _window.webkitURL || _window;
    Canvas.context.drawImage(this.checkerSvgImg, x || this.x, y || this.y);
    DOMURL.revokeObjectURL(this.svgData.url);
  }

  public getCheckerId() {
    return this.id;
  }

  // todo - create clear functions for mousemove, click, subscriptions...
}
