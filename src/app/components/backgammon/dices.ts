import {getCheckerSvg, getDiceSvg, getRollDiceSvg} from './helpers/uiHelper';
import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {isOverlap, rollDices} from './helpers/backgammonUtils';
import {Players} from './players';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';

export class Dices {
  public dices = [];
  private svgData;
  private svgImg = {};
  private showRollButton;
  private rollButtonPosition = {x: 598, y: 288};
  private rollDiceImg = new Image();
  private isHovering = false;

  constructor() {
    for (let i = 1; i < 7; i++) {
      this.svgImg[i] = new Image();
    }
    this.showRollButton = true;
    this.init();
  }

  private init() {
    let svgAsString;
    let svgBlob;
    let url;
    let DOMURL;
    const _window: any = window;
    this.drawRollButton();
    BackgammonStateManager.onMouseClick(this.clickHandler, 'Dices');
    BackgammonStateManager.onMouseMove(this.mouseMoveHandler, 'Dices');
    let diceNum;

    for (diceNum = 1; diceNum < 7; diceNum++) {

      svgAsString = getDiceSvg(diceNum);
      DOMURL = _window.URL || _window.webkitURL || _window;

      svgBlob = new Blob([svgAsString], {type: 'image/svg+xml'});
      url = DOMURL.createObjectURL(svgBlob);

      this.svgData = {svgBlob: url};

      this.svgImg[diceNum].onload = () => {
        DOMURL.revokeObjectURL(this.svgData.url);
      };
      this.svgImg[diceNum].src = url;

    }

    svgAsString = getRollDiceSvg();
    DOMURL = _window.URL || _window.webkitURL || _window;
    svgBlob = new Blob([svgAsString], {type: 'image/svg+xml'});
    url = DOMURL.createObjectURL(svgBlob);

    this.svgData = {svgBlob: url};

    this.rollDiceImg.onload = () => {
      DOMURL.revokeObjectURL(this.svgData.url);
    };

    this.rollDiceImg.src = url;
  }

  public drawRollButton() {
    Canvas.context.beginPath();
    Canvas.context.arc(598, 287, 35, 0, 2 * Math.PI, false);
    Canvas.context.fillStyle = Players.currentState < 2 ? '#005300' : '#6A6BFF';
    Canvas.context.fill();
    Canvas.context.lineWidth = 5;
    Canvas.context.strokeStyle = '#272727';
    Canvas.context.stroke();
    Canvas.context.font = '22px serif';
    Canvas.context.drawImage(this.rollDiceImg, 575, 265);
  }

  public rollDicesHandler = () => {
    this.dices = rollDices();
    this.showRollButton = false;
    BackgammonStateManager.notifyRedraw();
  };

  private clickHandler = ({x, y}) => {
    if (this.showRollButton
      && Players.isCurrentOnlinePlayer()
      && isOverlap(x, y, this.rollButtonPosition.x - 30, this.rollButtonPosition.y - 30, 60, 60)) {
      this.rollDicesHandler();
      Players.nextPlayerState();
      BackgammonStateManager.notifyRollClick();
    }
  };

  private drawDicesResult() {
    const dicesXPosition = [290, 360];
    const numOfDicesToDraw = this.dices.length > 2 ? 2 : this.dices.length;

    for (let i = 0; i < numOfDicesToDraw; i++) {
      this.drawOneDice(this.dices[i], dicesXPosition[i]);
    }

    if (this.dices.length > 2) {
      Canvas.context.font = '25px serif';
      Canvas.context.fillStyle = 'white';
      Canvas.context.fillText(`+${this.dices.length - 2}`, 410, 560);
    }
  }

  private mouseMoveHandler = ({x, y}) => {
    if (this.showRollButton && isOverlap(x, y, this.rollButtonPosition.x - 30, this.rollButtonPosition.y - 30, 60, 60)) {
      if (!this.isHovering) {
        this.isHovering = true;
        Canvas.context.beginPath();
        Canvas.context.arc(598, 287, 32, 0, 2 * Math.PI, false);
        Canvas.context.fillStyle = Players.currentState < 2 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(227, 237, 240, 0.1)';
        Canvas.context.fill();
      }
    } else {
      this.isHovering = false;
      this.draw();
    }
  };

  private drawOneDice(svgImgKey, x) {
    Canvas.context.drawImage(this.svgImg[svgImgKey], x, 535);
  }

  public draw() {
    if (this.showRollButton) {
      this.drawRollButton();
    }
    this.drawDicesResult();
  }

  public setShowRollButton(showRollButton) {
    this.showRollButton = showRollButton;
  }
}
