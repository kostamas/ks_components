import {Canvas} from "./canvas";
import {StateManager} from "./stateManager";
import {BACKGAMMON_CONSTANTS} from "./backgammonConstants";
import {isOverlap} from "./backgammonUtils";
import {calcPointsCircle, getCheckerSvg} from "./helpers/uiHelper";

export class Checker {
  private static checkersCount = 0;
  private checkerSvgImg;
  private type;
  private x;
  private y;
  private id;
  private radius;
  private isHovered;
  private isClicked;
  private svgData;
  private animFrame = null;
  private timeout = null;

  constructor(x, y, type) {
    Checker.checkersCount++;
    this.id = Checker.checkersCount;
    this.checkerSvgImg = new Image();
    this.type = type;
    this.x = x;
    this.y = y;
    this.radius = BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2;
    this.init();
  }

  private init() {
    this.initPosition();
    this.subscribeToMouseEvents();
  }

  private subscribeToMouseEvents = () => {
    StateManager.onMouseMove(this.mouseMoveHandler, this.id);
    StateManager.onMouseClick(this.mouseClickHandler, this.id);
  };

  private mouseMoveHandler = ({x, y}) => {
    if (this.isClicked) {
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
      this.isClicked = false;
      window.cancelAnimationFrame(this.animFrame);
      clearTimeout(this.timeout);
      this.animFrame = null;
      this.drawChecker();
    } else {
      if (isOverlap(x, y, this.x, this.y, BACKGAMMON_CONSTANTS.CHECKERS_SIZE, BACKGAMMON_CONSTANTS.CHECKERS_SIZE)) {
        this.isClicked = true;
        this.animateSelectedChecker(0);
      }
    }
  };

  private animateSelectedChecker = (degrees) => {
    const animatFn = () => {
      this.drawChecker();
      Canvas.context.save();
      Canvas.context.translate(this.x + this.radius, this.y + this.radius);
      Canvas.context.rotate(degrees * (Math.PI / 180));
      calcPointsCircle(0, 0, this.radius - 1, 1, Canvas.context);
      Canvas.context.rotate(-degrees * (Math.PI / 180));
      Canvas.context.translate((this.x + this.radius) * -1, (this.y + this.radius) * -1);
      Canvas.context.restore();
      degrees += 20;
      this.timeout = setTimeout(() => this.animFrame = window.requestAnimationFrame(animatFn), 100);
    };
    this.animFrame = window.requestAnimationFrame(animatFn);
  };

  private initPosition() {
    let svgData = getCheckerSvg(this.type);
    const _window: any = window;
    const DOMURL = _window.URL || _window.webkitURL || _window;

    const svgBlob = new Blob([svgData], {type: 'image/svg+xml'});
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

  // todo - create clear functions for mousemove, click, subscriptions...
}
