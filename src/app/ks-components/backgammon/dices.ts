import {getDiceSvg} from './helpers/uiHelper';
import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {isOverlap, rollDices} from './helpers/backgammonUtils';
import {Players} from './players';

export class Dices {
  public dices = [];
  private svgData;
  private svgImg = {};
  private showRollButton;
  private rollButtonPosition = {x: 598, y: 288};

  constructor() {
    for (let i = 1; i < 7; i++) {
      this.svgImg[i] = new Image();
    }
    this.showRollButton = true;
    this.init();
  }

  private init() {
    this.drawRollButton();
    BackgammonStateManager.onMouseClick(this.clickHandler, 'Dices');

    for (let diceNum = 1; diceNum < 7; diceNum++) {

      let svgAsString = getDiceSvg(diceNum);
      const _window: any = window;
      const DOMURL = _window.URL || _window.webkitURL || _window;

      const svgBlob = new Blob([svgAsString], {type: 'image/svg+xml'});
      const url = DOMURL.createObjectURL(svgBlob);

      this.svgData = {svgBlob: url};

      this.svgImg[diceNum].onload = () => {
        const _window: any = window;
        const DOMURL = _window.URL || _window.webkitURL || _window;
        DOMURL.revokeObjectURL(this.svgData.url);
      };
      this.svgImg[diceNum].src = url;
    }
  }

  public drawRollButton() {
    Canvas.context.beginPath();
    Canvas.context.arc(598, 288, 30, 0, 2 * Math.PI, false);
    Canvas.context.fillStyle = '#B7272A';
    Canvas.context.fill();
    Canvas.context.lineWidth = 5;
    Canvas.context.strokeStyle = '#003300';
    Canvas.context.stroke();
    Canvas.context.font = '25px serif';
    Canvas.context.fillStyle = '#fff';
    Canvas.context.fillText('Roll', 576, 296);
  }

  public rollDicesHandler = () => {
    this.dices = [2];
    // this.dices = rollDices();
    this.showRollButton = false;
    BackgammonStateManager.notifyRedraw();
  }

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
