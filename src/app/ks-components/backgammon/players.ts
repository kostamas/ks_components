import {Canvas} from "./canvas";
import {StateManager} from "./stateManager";
import {isOverlap} from "./helpers/backgammonUtils";

export class Players {
  public static playersMap = {
    black: 1,
    white: 3
  }

  public static playersNamesMap = {
    [Players.playersMap.black]: 'black',
    [Players.playersMap.white]: 'white'
  }

  public static playerStates = {
    0: 'none',
    1: 'black',
    2: 'none',
    3: 'white'
  }

  public static currentState = 0;

  public static showsSkipButton = false;

  public static nextPlayer() {
    Players.currentState = (Players.currentState + 1) % 4;
  }

  private winningPlayer = -1;

  constructor() {
    this.init()
  }

  private init() {
    StateManager.onMouseClick(this.skipTurn, 'player');
    this.drawPlayer();
  }

  public drawPlayer() {
    Canvas.context.font = '25px serif';
    Canvas.context.fillStyle = "#f7f01b";
    Canvas.context.fillText('Player:', 12, 27);

    Canvas.context.beginPath();
    Canvas.context.moveTo(90, 22);
    Canvas.context.lineWidth = 7;
    Canvas.context.strokeStyle = Players.currentState < 2 ? '#000' : '#fff';
    Canvas.context.lineTo(110, 22);
    Canvas.context.stroke();

    if (Players.showsSkipButton) {
      Canvas.context.font = '25px serif';
      Canvas.context.fillStyle = 'white';
      Canvas.context.fillText('Skip', 160, 30);
    }

    if(this.winningPlayer >= 0 ){
      this.showWinningPlayer(this.winningPlayer)
    }
  }

  private skipTurn({x, y}) {
    if (Players.showsSkipButton && isOverlap(x, y, 160, 10, 60, 40)) {
      if (Players.currentState < 2) {
        Players.currentState = 2;
      } else {
        Players.currentState = 0
      }
      StateManager.notifySkipPlayer();
      StateManager.notifyRedraw();
      Players.showsSkipButton = false;
    }
  }

  public showWinningPlayer(playerType){
    this.winningPlayer = playerType;
    Canvas.context.fillStyle='rgba(0,0,0,0.5)';
    Canvas.context.fillRect(0,0,684,575);

    Canvas.context.font = '40px serif';
    Canvas.context.fillStyle = 'white';
    Canvas.context.fillText(`${Players.playersNamesMap[playerType]} Won!`, 250, 270);
  }
}
