import {BackgammonDBToken} from './backgammonDb.types';
import {getSpikeDirection, isOverlap, isValidSpike, isOnline, isVSComputer} from './helpers/backgammonUtils';
import {BackgammonStateManager} from './backgammonStateManager';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {drawBackground} from './helpers/uiHelper';
import {OutsideBoard} from './outsideboard';
import {Inject, Injectable} from '@angular/core';
import {Players} from './players';
import {Checker} from './checker';
import {Spike} from './spike';
import {Dices} from './dices';
import {Canvas} from './canvas';
import {BackgammonComputer} from './backgammonComputer';

@Injectable()
export class GameController {
  private spikes: Spike[] = [];
  private checkers: Checker[] = [];
  private outsideBoard: OutsideBoard;
  private dicesObj;
  private gamePlayers: Players;
  private backgammonComputer: BackgammonComputer;
  private currentState;
  private backgroundImgUrl = 'assets/images/backgammon.jpg';
  private bar;
  private gameState;
  private gameStateObservable;
  private selectedCheckerObservable;
  private gameId;
  private showPlayAgain;

  private spikesPositions = [
    {x: 583, y: 42}, {x: 541, y: 42}, {x: 497, y: 42}, {x: 455, y: 42}, {x: 413, y: 42}, {x: 374, y: 42},
    {x: 272, y: 42}, {x: 229, y: 42}, {x: 183, y: 42}, {x: 141, y: 42}, {x: 101, y: 42}, {x: 56, y: 42},

    {x: 62, y: 495}, {x: 104, y: 495}, {x: 145, y: 495}, {x: 188, y: 495}, {x: 228, y: 495}, {x: 272, y: 495},
    {x: 375, y: 495}, {x: 417, y: 495}, {x: 457, y: 495}, {x: 497, y: 495}, {x: 539, y: 495}, {x: 583, y: 495},
  ];

  constructor(@Inject(BackgammonDBToken) private backgammonDBService) {
  }

  public init(gameData, gameMode, gameId?) {
    BackgammonStateManager.onSelectedCheckerDrop(this.selectedCheckerDropHandler);
    BackgammonStateManager.onRedraw(this.redrawHandler);
    BackgammonStateManager.onSkipPlayer(this.skipPlayerHandler);
    BackgammonStateManager.onSelectChecker(this.selectCheckerHandler);
    BackgammonStateManager.onSelectedCheckerMove(this.onSelectedCheckerMove);
    BackgammonStateManager.onSurrender(this.onSurrender);
    BackgammonStateManager.onMouseClick(this.newGame, 'gameController');
    BackgammonStateManager.onMouseMove(this.hoverOnNewGame, 'gameController');

    Players.currentState = 0;

    drawBackground(this.backgroundImgUrl).subscribe(() => {
      this.initSpikes();
      this.initCheckers();
      this.initBar();

      this.dicesObj = new Dices();
      this.gamePlayers = new Players();
      this.outsideBoard = new OutsideBoard();

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE) {
        this.gameId = gameId;
        this.gameStateObservable = this.backgammonDBService.getGameStateObserveable(gameId)
          .do(gameState => this.gameState = gameState)
          .subscribe(this.gameHandler);
        this.selectedCheckerObservable = this.backgammonDBService.getSelectedCheckerObservable(gameId)
          .subscribe(this.secondPlayerSelectedCheckerMoveHandler);
        BackgammonStateManager.onRollClick(this.updateState);
      }

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL) {
        this.gameState = gameData;
        setTimeout(this.gameHandler.bind(this, gameData));
      }

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER) {
        BackgammonStateManager.onComputerMove(this.gameHandler);
        this.gameState = gameData;
        this.gameState.players.black = 'You';
        this.gameState.players.white = 'Computer';
        setTimeout(this.gameHandler.bind(this, gameData));

        this.backgammonComputer = new BackgammonComputer(Players.playersMap.White, this.dicesObj);
      }
    });
  }

  private initSpikes() {
    let spike, direction;
    this.spikes = [];

    for (let i = 0; i < this.spikesPositions.length; i++) {
      direction = i < this.spikesPositions.length / 2 ? 'down' : 'up';
      spike = new Spike(this.spikesPositions[i].x, this.spikesPositions[i].y, direction);
      this.spikes.push(spike);
    }
  }

  private initBar() {
    this.bar = {
      checkers: {
        [Players.playersNamesMap[Players.playersMap.White]]: [],
        [Players.playersNamesMap[Players.playersMap.Black]]: [],
      },
      getNextCheckerPosition: (playerType) => playerType === Players.playersMap.Black ?
        {x: 325, y: 235 + this.bar.checkers[Players.playersNamesMap[Players.playersMap.Black]].length * 7} :
        {x: 325, y: 385 + this.bar.checkers[Players.playersNamesMap[Players.playersMap.White]].length * 7},
    };
  }

  private initCheckers() {
    for (let i = 0; i < 30; i++) {
      const type = i < 15 ? Players.playersMap.Black : Players.playersMap.White;
      const checker = new Checker(0, 0, type, null);
      this.checkers.push(checker);
    }
  }

  private selectedCheckerDropHandler = ({x, y, checker}) => {
    let diceResult, currentCheckerPosition, spikeIndex;
    const spikeDirection = getSpikeDirection(checker.type, Players);
    const relevantSpikes = [];

    if (isValidSpike(checker.currentSpike)) {
      const checkerIndex = this.spikes[checker.currentSpike].checkers.indexOf(checker);
      if (checkerIndex < this.spikes[checker.currentSpike].checkers.length - 1) { // check if it's a top checker
        this.alignCheckersInSpike(checkerIndex, checker);
      }
    }

    if (this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]]) {
      const position = this.outsideBoard.getPosition(checker.type);
      const dimensions = this.outsideBoard.getDimensions();
      if (isOverlap(x, y, position.x, position.y, dimensions.width, dimensions.height)) {
        this.bearingOff(checker);
        this.updateState();
        return;
      }
    }

    diceResult = this.dicesObj && this.dicesObj.dices;
    diceResult.forEach(_diceResult => {                                       // get the possible spikes to move
      spikeIndex = checker.currentSpike + _diceResult * spikeDirection;
      if (isValidSpike(spikeIndex)) {
        relevantSpikes.push(this.spikes[spikeIndex]);
      }
    });

    relevantSpikes.forEach(spike => spike.setShowValidMove(false));
    this.outsideBoard.showArrow[Players.playersNamesMap[Players.playersMap.Black]] = false;
    this.outsideBoard.showArrow[Players.playersNamesMap[Players.playersMap.White]] = false;

    for (let i = 0; i < relevantSpikes.length; i++) {
      if (this.canMoveChecker(x, y, relevantSpikes, i, checker)) {
        this.moveChecker(checker, relevantSpikes[i]);
      }
    }

    if (isValidSpike(checker.currentSpike)) {
      this.spikes[checker.currentSpike].checkers.pop();
      currentCheckerPosition = this.spikes[checker.currentSpike].getNextCheckerPosition();
      checker.setPosition(currentCheckerPosition);
      this.spikes[checker.currentSpike].checkers.push(checker);
    } else {
      currentCheckerPosition = this.bar.getNextCheckerPosition(checker.type);
      checker.setPosition(currentCheckerPosition);
    }
    this.updateState();
  };

  private moveChecker(checker, newSpike) {
    const diceResult = Math.abs(checker.currentSpike - newSpike.spikeIndex);
    const spikeDirection = getSpikeDirection(checker.type, Players);
    const newSpikeIndex = checker.currentSpike + diceResult * spikeDirection;

    if (newSpike.checkers.length === 1 && newSpike.checkers[0].type !== checker.type) {
      this.checkerHitHandler(newSpike.checkers.pop());
    }

    const newPosition = newSpike.getNextCheckerPosition();
    newSpike.setShowValidMove(false);
    newSpike.checkers.push(checker);

    if (isValidSpike(checker.currentSpike)) {
      this.spikes[checker.currentSpike].checkers.pop();
    } else {
      const checkerIndex = this.bar.checkers[Players.playersNamesMap[checker.type]].indexOf(checker);
      this.bar.checkers[Players.playersNamesMap[checker.type]].splice(checkerIndex, 1);
    }

    checker.setPosition(newPosition);
    checker.currentSpike = newSpikeIndex;

    const diceIndex = this.dicesObj.dices.indexOf(diceResult);
    this.dicesObj.dices.splice(diceIndex, 1);
    if (this.dicesObj.dices.length === 0) {
      this.dicesObj.setShowRollButton(true);
      Players.nextPlayerState();
    }
    this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = false;
    this.updateState();
  }

  private bearingOff = (checker: Checker) => {
    const position = this.outsideBoard.getNextCheckerPosition(checker.type);
    checker.setPosition(position);
    this.spikes[checker.currentSpike].checkers.pop();
    checker.isOffBoard = true;
    this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = false;
    this.outsideBoard.checkers[Players.playersNamesMap[checker.type]].push(checker);

    const currentSpike = checker.currentSpike;
    const homeSpike = checker.type === Players.playersMap.White ? currentSpike + 1 : 24 - currentSpike;
    checker.currentSpike = null;

    let diceToRemove = 7, diceIndex;
    this.dicesObj.dices.forEach(diceResult => {
      if (diceResult >= homeSpike && diceResult < diceToRemove) {
        diceToRemove = diceResult;
      }
    });

    diceIndex = this.dicesObj.dices.indexOf(diceToRemove);
    this.dicesObj.dices.splice(diceIndex, 1);
    this.spikes.forEach(spike => spike.setShowValidMove(false));

    const numOfOffBoardCheckers = this.checkers
      .filter(_checker => _checker.type === checker.type)
      .reduce((counter: number, _checker: Checker) => _checker.isOffBoard ? counter + 1 : counter, 0);

    if (numOfOffBoardCheckers === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2) {
      this.winningHandler(checker.type);
    }

    if (this.dicesObj.dices.length === 0) {
      this.dicesObj.setShowRollButton(true);
      Players.nextPlayerState();
    }

    if (!isOnline()) {
      this.redrawHandler();
    }
  }

  private selectCheckerHandler = ({checker}) => {
    let checkersArr, spikeIndex, updateState;
    const spikeDirection = getSpikeDirection(checker.type, Players);

    if (this.checkIfOffBoardState(checker.type)) {
      const currentSpike = checker.currentSpike;
      const checkerHomeSpike = checker.type === Players.playersMap.White ? currentSpike + 1 : 24 - currentSpike;
      const highestCheckerSpikeNumber = this.getHighestCheckerSpikeNumber(checker);
      this.dicesObj.dices.forEach(diceResult => {
        if (checkerHomeSpike === diceResult) {
          this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = true;
          updateState = true;
        }

        spikeIndex = checker.currentSpike + diceResult * spikeDirection;
        checkersArr = this.spikes[spikeIndex] && this.spikes[spikeIndex].checkers;
        if (checkerHomeSpike > diceResult && (checkersArr.length <= 1 || checkersArr[0].type === checker.type)) {
          this.spikes[spikeIndex].setShowValidMove(true);
          updateState = true;
        }

        if (checkerHomeSpike < diceResult && highestCheckerSpikeNumber === checkerHomeSpike) {
          this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = true;
          updateState = true;
        }
      });

    } else {
      this.dicesObj.dices.forEach(diceResult => {
        spikeIndex = checker.currentSpike + diceResult * spikeDirection;
        if (isValidSpike(spikeIndex)) {
          checkersArr = this.spikes[spikeIndex].checkers;
          if (!this.hasOtherOutChecker(checker) && (checkersArr.length <= 1 || checkersArr[0].type === checker.type)) {
            this.spikes[spikeIndex].setShowValidMove(true);
            updateState = true;
          }
        }
      });
    }

    if (updateState) {
      this.updateState();
    }
  };

  private getHighestCheckerSpikeNumber(checker) {
    const homeSpikesDirection = checker.type === Players.playersMap.White ?
      {runningSpike: 5, direction: -1} : {runningSpike: 18, direction: 1};  // todo - use getSpikeDirection

    for (let i = 0; i < 6; i++) {
      const checkersArr = this.spikes[homeSpikesDirection.runningSpike + i * homeSpikesDirection.direction].checkers;
      if (checkersArr.length > 0 && checker.type === checkersArr[0].type) {
        return 6 - i;
      }
    }
  }

  private checkerHitHandler(checker) {
    checker.setPosition(this.bar.getNextCheckerPosition(checker.type));

    this.bar.checkers[Players.playersNamesMap[checker.type]].push(checker);
    if (checker.type === Players.playersMap.Black) {
      checker.currentSpike = BACKGAMMON_CONSTANTS.BLACK_BAR_INDEX;
    } else {
      checker.currentSpike = BACKGAMMON_CONSTANTS.WHITE_BAR_INDEX;
    }
  }

  private alignCheckersInSpike(indexToAlign, currentChecker) {
    const currentSpike = this.spikes[currentChecker.currentSpike];
    const checkerToAlign = currentSpike.checkers[currentSpike.checkers.length - 1];
    const nextPosition = this.spikes[currentChecker.currentSpike].getNextCheckerPosition(indexToAlign);
    checkerToAlign.setPosition(nextPosition);
    currentSpike.checkers.splice(indexToAlign, 1, checkerToAlign);
    currentSpike.checkers.pop();
    currentSpike.checkers.push(currentChecker);
  }

  private canMoveChecker(x, y, relevantSpikes, spikeIndex, checker) {
    const spike = relevantSpikes[spikeIndex];
    const targetY = spike.direction === 'down' ? spike.y : spike.y - 190;
    const spikeCheckers = spike.checkers;
    const isSpikeContainChecker = spikeCheckers.indexOf(checker) > -1;

    return !isSpikeContainChecker &&
      (spikeCheckers.length < 2 || spikeCheckers[0].type === checker.type) &&
      isOverlap(x - 10, y - 10, spike.x + 1, targetY, 30, 230) &&
      !this.hasOtherOutChecker(checker);
  }

  private showSkipBtn = (playerType) => {
    debugger
    let showNextPlayerBtn = true;
    const spikeDirection = getSpikeDirection(playerType, Players);
    if (this.checkIfOffBoardState(playerType)) {
      let highestCheckerIndex, nextSpikeIndex, currSpikeIndex, checkersArr;
      const homeSpikeIndex = playerType === Players.playersMap.White ? 5 : 18;
      for (let i = 0; i < 6 && showNextPlayerBtn; i++) {
        currSpikeIndex = i * spikeDirection + homeSpikeIndex;
        const checkerHomeSpike = playerType === Players.playersMap.White ? currSpikeIndex + 1 : 24 - currSpikeIndex;

        const spike = this.spikes[currSpikeIndex];
        if (spike.checkers.length > 0 && spike.checkers[0].type === playerType) {
          if (!highestCheckerIndex) {
            highestCheckerIndex = currSpikeIndex;
          }
          this.dicesObj.dices.forEach(diceResult => {
            if (checkerHomeSpike === diceResult) {
              showNextPlayerBtn = false;
            }

            nextSpikeIndex = currSpikeIndex + diceResult * spikeDirection;
            checkersArr = this.spikes[nextSpikeIndex] && this.spikes[nextSpikeIndex].checkers;
            if (checkerHomeSpike > diceResult && checkersArr &&
              (checkersArr.length <= 1 || checkersArr[0].type === playerType)) {
              showNextPlayerBtn = false;
            }

            if (checkerHomeSpike < diceResult && currSpikeIndex === highestCheckerIndex) {
              showNextPlayerBtn = false;
            }
          });
        }
      }
      return showNextPlayerBtn;
    }

    if (this.bar.checkers[Players.playersNamesMap[playerType]].length > 0) {
      const {BLACK_BAR_INDEX, WHITE_BAR_INDEX} = BACKGAMMON_CONSTANTS;
      const startSpikeIndex = playerType === Players.playersMap.Black ? BLACK_BAR_INDEX : WHITE_BAR_INDEX;
      showNextPlayerBtn = !this.checkPossibleMovesForSpike(playerType, startSpikeIndex, spikeDirection);
      return showNextPlayerBtn;
    }

    for (let i = 0; i < this.spikes.length; i++) {
      if (this.spikes[i].checkers[0] && this.spikes[i].checkers[0].type === playerType) {
        if (this.checkPossibleMovesForSpike(playerType, i, spikeDirection)) {
          showNextPlayerBtn = false;
          return showNextPlayerBtn;
        }
      }
    }
    return showNextPlayerBtn;
  }

  private checkPossibleMovesForSpike = (playerType, startSpikeIndex, spikeDirection) => {
    let currSpike, spikeIndex;
    for (let i = 0; i < this.dicesObj.dices.length; i++) {
      spikeIndex = startSpikeIndex + spikeDirection * this.dicesObj.dices[i];
      if (isValidSpike(spikeIndex)) {
        currSpike = this.spikes[spikeIndex];
        if (currSpike && (currSpike.checkers.length <= 1 || currSpike.checkers[0].type === playerType)) {
          return true;
        }
      }
    }
    return false;
  }

  private checkIfOffBoardState(checkerType) {
    return this.countWinningCheckers(checkerType) === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2;
  }

  private gameHandler = (gameData) => {
    BackgammonStateManager.gameState = gameData;

    if (isOnline()) {
      Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]] = gameData.players.black;
      Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]] = gameData.players.white;
    }

    this.spikes.forEach(spike => spike.clearCheckers());
    this.outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.Black]] = [];
    this.outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.White]] = [];
    this.bar.checkers[Players.playersNamesMap[Players.playersMap.White]] = [];
    this.bar.checkers[Players.playersNamesMap[Players.playersMap.Black]] = [];

    this.checkers.forEach(checker => {
      checker.isOffBoard = gameData.checkers[checker.getCheckerId()].isOffBoard;
      if (checker.isOffBoard) {
        this.outsideBoard.checkers[Players.playersNamesMap[checker.type]].push(checker);
        checker.setPosition(this.outsideBoard.getNextCheckerPosition(checker.type));
      } else {
        checker.currentSpike = gameData.checkers[checker.getCheckerId()].currentSpike;
        if (isValidSpike(checker.currentSpike)) {
          checker.setPosition(this.spikes[checker.currentSpike].getNextCheckerPosition());
          this.spikes[checker.currentSpike].checkers.push(checker);
        } else {
          checker.setPosition(this.bar.getNextCheckerPosition(checker.type));
          this.bar.checkers[Players.playersNamesMap[checker.type]].push(checker);
        }
      }
    });

    this.spikes.forEach(spike => spike.setShowValidMove(false));

    if (gameData.moveSuggestion) {
      Object.keys(gameData.moveSuggestion).forEach(spikeIndex => this.spikes[spikeIndex].setShowValidMove(true));
    }

    this.dicesObj.dices = !!gameData.dices ? Object.values(gameData.dices) : [];

    Players.currentState = gameData.currentState;
    this.currentState = gameData.currentState;

    Players.showsSkipButton = false;

    if (Players.currentState % 2 === 1) {
      if (this.showSkipBtn(this.currentState)) {
        Players.showsSkipButton = true;
        this.gamePlayers.draw();
      }
    } else {
      if (this.checkIfToSkipTurn()) { // one scenario - there is a checker on the bar and the whole home is occupied
        Players.currentState = (Players.currentState + 2) % 4;
      }
    }

    this.showPlayAgain = false;
    this.gamePlayers.winningPlayer = -1;
    Players.canSurrenderPlayer = -1;
    const {outsideBoard} = this;
    const numOfWhiteWinningCheckers = outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.White]].length;
    const numOfBlackWinningCheckers = outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.Black]].length;

    if (numOfWhiteWinningCheckers === 15 || gameData.surrenderedPlayer === Players.playersMap.Black) {
      Players.canSurrenderPlayer = gameData.surrenderedPlayer;
      this.gamePlayers.winningPlayer = Players.playersMap.White;
      this.showPlayAgain = isOnline();
    }

    if (numOfBlackWinningCheckers === 15 || gameData.surrenderedPlayer === Players.playersMap.White) {
      Players.canSurrenderPlayer = gameData.surrenderedPlayer;
      this.gamePlayers.winningPlayer = Players.playersMap.Black;
      this.showPlayAgain = isOnline();
    }

    if (isOnline() && numOfWhiteWinningCheckers > 2 && numOfWhiteWinningCheckers > numOfBlackWinningCheckers + 2) {
      Players.canSurrenderPlayer = Players.playersMap.Black;
    }

    if (isOnline() && numOfBlackWinningCheckers > 2 && numOfBlackWinningCheckers > numOfWhiteWinningCheckers + 2) {
      Players.canSurrenderPlayer = Players.playersMap.White;
    }
    this.dicesObj.showRollButton = Players.currentState % 2 === 0;

    this.redrawHandler();
  }

  private countWinningCheckers(checkerType) {
    let winningCheckersCounter = 0;
    const winningIndex = checkerType === Players.playersMap.Black ? 18 : 5;

    this.checkers
      .filter(checker => checker.type === checkerType)
      .forEach(checker => {
        if (checker.type === Players.playersMap.Black) {
          winningCheckersCounter += checker.currentSpike >= winningIndex || checker.isOffBoard ? 1 : 0;
        } else {
          winningCheckersCounter += checker.currentSpike <= winningIndex || checker.isOffBoard ? 1 : 0;
        }
      });
    return winningCheckersCounter;
  }

  private onSelectedCheckerMove = ({x, y, checker}) => {
    if (isOnline()) {
      this.backgammonDBService.updateSelectedCheckerMove(x, y, checker, this.gameId, BackgammonStateManager.localUser);
    }
  }

  private skipPlayerHandler = () => {
    this.dicesObj.dices = [];
    this.dicesObj.setShowRollButton(true);
    this.updateState();
  }

  private onSurrender = (surrenderedPlayer) => {
    this.gameState.surrenderedPlayer = surrenderedPlayer;
    this.updateState();
  }

  private hasOtherOutChecker(checker) {
    return this.bar.checkers[Players.playersNamesMap[checker.type]].length > 0 &&
      this.bar.checkers[Players.playersNamesMap[checker.type]].indexOf(checker) === -1;
  }

  private winningHandler(playerType) {
    this.gamePlayers.showWinningPlayer(playerType);
  }

  private secondPlayerSelectedCheckerMoveHandler = (data) => {
    if (data.player && BackgammonStateManager.localUser.name !== data.player && data.id > -1) {
      const radius = BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2;
      this.checkers[data.id - 1].setPosition({x: data.x - radius * 1.5, y: data.y - radius * 1.5});
      this.redrawHandler();
    }
  }

  private updateState = () => {
    const newState = {
      checkers: {},
      dices: {},
      currentState: Players.currentState,
      winningPlayer: this.gamePlayers.winningPlayer,
      moveSuggestion: {},
      players: this.gameState.players,
      surrenderedPlayer: this.gameState.surrenderedPlayer || -1,
      timeStamp: Date.now()  // patch - trigger firebase observable change
    };

    this.checkers.forEach((checker: any, index) => {
      newState.checkers[index + 1] = {
        currentSpike: checker.currentSpike,
        isOffBoard: checker.isOffBoard
      };
    });

    this.spikes.forEach((spike: any, index: number) => {
      if (spike.getShowValidMove()) {
        newState.moveSuggestion[index] = true;
      }
    });

    this.dicesObj.dices.forEach((dice, index) => {
      newState.dices[index] = dice;
    });

    const updatedGame = {
      state: newState,
      selectedChecker: {index: -1, x: -1, y: -1}
    };

    if (isOnline()) {
      this.backgammonDBService.updateGameState(this.gameId, updatedGame);
    } else {
      this.gameHandler(updatedGame.state);
    }
  }

  private drawPlayAgainOption(color?) {
    Canvas.context.font = '20px serif';
    Canvas.context.fillStyle = color || '#f7f723';
    Canvas.context.fillText('New Game', 292, 350);
    Canvas.context.stroke();
  }

  private newGame = ({x, y}) => {
    const target = BACKGAMMON_CONSTANTS.PLAY_AGAIN_POSITION;
    const random = Math.floor(Math.random() * 2);
    const blackPlayerName = Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]];
    const whitePlayerName = Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]];
    if (this.showPlayAgain && isOverlap(x, y, target.x, target.y, 100, 20)) {
      const firstPlayerName = !!random ? blackPlayerName : whitePlayerName;
      const secondPlayerName = !!random ? whitePlayerName : blackPlayerName;
      this.backgammonDBService.newGame(firstPlayerName, secondPlayerName, this.gameId);
    }
  }

  private hoverOnNewGame = ({x, y}) => {
    const target = BACKGAMMON_CONSTANTS.PLAY_AGAIN_POSITION;
    if (this.showPlayAgain && isOverlap(x, y, target.x, target.y, 100, 20)) {
      this.drawPlayAgainOption('#b3f744');
    }
  }

  private checkIfToSkipTurn() {
    const currentPlayerType = Players.getCurrentPlayerType();
    const homeSpikeIndex = currentPlayerType === Players.playersMap.White ? 18 : 5;
    const spikeDirection = -1 * getSpikeDirection(currentPlayerType, Players);

    for (let i = 0; i < 6; i++) {
      const currSpikeIndex = i * spikeDirection + homeSpikeIndex;
      const checkersArr = this.spikes[currSpikeIndex].checkers;
      if (checkersArr.length < 2 || checkersArr[0].type === currentPlayerType) {
        return false;
      }
    }
    return true;
  }

  private redrawHandler = () => {
    drawBackground(this.backgroundImgUrl).subscribe(() => {
      this.checkers.forEach(checker => checker.draw());
      this.spikes.forEach(spikes => spikes.draw());
      this.dicesObj.draw();
      this.gamePlayers.draw();
      this.outsideBoard.draw();

      if (Players.currentState !== this.currentState && Players.currentState % 2 === 1) {
        this.currentState = Players.currentState;
        const showNextPlayerBtn = this.showSkipBtn(this.currentState);
        if (showNextPlayerBtn) {
          Players.showsSkipButton = true;
          this.gamePlayers.draw();
        }
      }

      if (this.showPlayAgain) {
        this.drawPlayAgainOption();
      }
    });
  }

  public destroy = () => {
    Checker.destroy();
    Spike.destroy();
    Players.destroy();
    this.dicesObj = null;
    this.checkers = [];
    this.spikes = [];
    if (this.gameStateObservable) {
      this.gameStateObservable.unsubscribe();
    }
    if (this.selectedCheckerObservable) {
      this.selectedCheckerObservable.unsubscribe();
    }
  }
}
