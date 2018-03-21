import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {isOverlap} from './helpers/backgammonUtils';

export class Players {
  public static canSurrenderPlayer = -1;

  public static playersMap = {
    Black: 1,
    White: 3
  }

  public static playersNamesMap = {
    [Players.playersMap.Black]: 'Black',
    [Players.playersMap.White]: 'White'
  }

  public static onlinePlayersName = {
    [Players.playersNamesMap[Players.playersMap.Black]]: '',
    [Players.playersNamesMap[Players.playersMap.White]]: ''
  }

  public static currentState = 0;

  public static showsSkipButton = false;

  public winningPlayer = -1;

  private skipBtnCoordinates: any = {x: 320, y: 30};
  private surrenderCoordinates: any = {x: 570, y: 30};

  constructor() {
    this.init();
  }

  public static nextPlayer() {
    Players.currentState = (Players.currentState + 1) % 4;
  }

  private init() {
    BackgammonStateManager.onMouseClick(this.mouseClickHandler, 'player');
    this.draw();
  }

  private skipTurnHandler(x, y) {
    const {skipBtnCoordinates} = this;
    const {canSurrenderPlayer, onlinePlayersName, playersNamesMap} = Players;
    const currentType = Players.currentState > 1 ? 3 : 1;
    const currentPlayer = Players.onlinePlayersName[Players.playersNamesMap[currentType]];
    const localUserName = BackgammonStateManager.localUser && BackgammonStateManager.localUser.name;

    if (Players.showsSkipButton &&  currentPlayer === localUserName &&
      isOverlap(x, y, skipBtnCoordinates.x, skipBtnCoordinates.y - 10, 60, 40)) {
      if (Players.currentState < 2) {
        Players.currentState = 2;
      } else {
        Players.currentState = 0;
      }
      BackgammonStateManager.notifySkipPlayer();
      Players.showsSkipButton = false;
    }
  }

  private surrenderHandler = (x, y) => {
    const {surrenderCoordinates} = this;
    const localUserName = BackgammonStateManager.localUser.name;
    const {canSurrenderPlayer, onlinePlayersName, playersNamesMap} = Players;
    const canSurrenderPlayerName = onlinePlayersName[playersNamesMap[canSurrenderPlayer]];
    const _isOverlap = isOverlap(x, y, surrenderCoordinates.x, surrenderCoordinates.y - 10, 100, 17);

    if (canSurrenderPlayer > -1 && localUserName === canSurrenderPlayerName && _isOverlap) {
      BackgammonStateManager.notifySurrender(canSurrenderPlayer);
    }
  }

  private mouseClickHandler = ({x, y}) => {
    this.skipTurnHandler(x, y);
    if (BackgammonStateManager.localUser) {
      this.surrenderHandler(x, y);
    }
  }

  public showWinningPlayer(playerType) {
    const {canSurrenderPlayer, onlinePlayersName, playersNamesMap} = Players;

    this.winningPlayer = playerType;
    const onlinePlayerName = Players.onlinePlayersName[Players.playersNamesMap[playerType]];
    const winningPlayerName = onlinePlayerName || Players.playersNamesMap[playerType];

    Canvas.context.fillStyle = 'rgba(0,0,0,0.7)';
    Canvas.context.fillRect(0, 0, 684, 575);

    Canvas.context.font = '35px Lato';
    Canvas.context.fillStyle = 'white';
    Canvas.context.fillText(`${winningPlayerName} Won!`, 270, 240);
  }

  public static isCurrentOnlinePlayer() {
    const localUserName = BackgammonStateManager.localUser && BackgammonStateManager.localUser.name; // isOnline.
    const currentPlayerType = Players.currentState < 2 ? Players.playersMap.Black : Players.playersMap.White;
    const currentPlayerName = Players.onlinePlayersName[Players.playersNamesMap[currentPlayerType]];
    return !localUserName || localUserName && localUserName === currentPlayerName;
  }

  public draw() {
    Canvas.context.font = '25px serif';
    Canvas.context.fillStyle = '#f7f01b';
    Canvas.context.fillText('Player:', 12, 27);

    Canvas.context.beginPath();
    Canvas.context.moveTo(90, 22);
    Canvas.context.lineWidth = 7;
    Canvas.context.strokeStyle = Players.currentState < 2 ? '#000' : '#fff';
    Canvas.context.lineTo(110, 22);
    Canvas.context.stroke();

    if (Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]] ||
      Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]]) {
      Canvas.context.fillStyle = Players.currentState < 2 ? '#000' : '#fff';

      if (Players.currentState < 2) {
        Canvas.context.fillText(Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]], 120, 29);
      } else {
        Canvas.context.fillText(Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]], 120, 29);
      }
    }

    if (Players.showsSkipButton) {
      Canvas.context.font = '25px serif';
      Canvas.context.fillStyle = 'white';
      Canvas.context.fillText('Skip', 320, 30);
    }

    const {onlinePlayersName, canSurrenderPlayer, playersNamesMap} = Players;
    const {localUser} = BackgammonStateManager;
    const isCurrentUserSurrendered = localUser && localUser.name === onlinePlayersName[playersNamesMap[canSurrenderPlayer]];
    if (canSurrenderPlayer > -1 && isCurrentUserSurrendered) {
      Canvas.context.font = '25px serif';
      Canvas.context.fillStyle = '#f4f700';
      Canvas.context.fillText('Surrender', this.surrenderCoordinates.x, this.surrenderCoordinates.y);
    }

    if (this.winningPlayer >= 0) {
      this.showWinningPlayer(this.winningPlayer);
    }
  }

  public static destroy() {
    Players.currentState = 0;
    Players.showsSkipButton = false;
    Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]] = '';
    Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]] = '';
  }
}
