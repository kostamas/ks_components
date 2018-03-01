import {BackgammonDBService} from '../../adapters/backgammon-adapter/backgammonDB.service';
import {getSpikeDirection, isOverlap, isValidSpike} from './helpers/backgammonUtils';
import {BackgammonStateManager} from './backgammonStateManager';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {drawBackground} from './helpers/uiHelper';
import {OutsideBoard} from './outsideboard';
import {Injectable} from '@angular/core';
import {Players} from './players';
import {Checker} from './checker';
import {Spike} from './spike';
import {Dices} from './dices';
import {Canvas} from "./canvas";

@Injectable()
export class GameController {
  private spikes: Spike[] = [];
  private checkers: Checker[] = [];
  private outsideBoard: OutsideBoard;
  private dicesObj;
  private gamePlayers: Players;
  private currentState;
  private backgroundImgUrl = 'assets/images/backgammon.jpg';
  private bar;
  private isOnline = false;
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

  constructor(private backgammonDBService: BackgammonDBService) {
  }

  public init(gameData, isOnline?, gameId?) {
    BackgammonStateManager.onSelectedCheckerDrop(this.selectedCheckerDropHandler);
    BackgammonStateManager.onRedraw(this.redrawHandler);
    BackgammonStateManager.onSkipPlayer(this.skipPlayerHandler);
    BackgammonStateManager.onSelectChecker(this.selectCheckerHandler);
    BackgammonStateManager.onSelectedCheckerMove(this.onSelectedCheckerMove);
    BackgammonStateManager.onMouseClick(this.newGame, 'gameController');
    BackgammonStateManager.onMouseClick(this.hoverNewGame, 'gameController');

    drawBackground(this.backgroundImgUrl).subscribe(() => {
      this.initSpikes();
      this.initCheckers();
      this.initBar();

      this.dicesObj = new Dices();
      this.gamePlayers = new Players();
      this.outsideBoard = new OutsideBoard();

      if (isOnline) {
        this.isOnline = true;
        this.gameId = gameId;
        this.gameStateObservable = this.backgammonDBService.getGameStateObserveable(gameId)
          .do(gameState => this.gameState = gameState)
          .subscribe(this.gameHandler);
        this.selectedCheckerObservable = this.backgammonDBService.getSelectedCheckerObservable(gameId)
          .subscribe(this.secondPlayerSelectedCheckerMoveHandler);
        BackgammonStateManager.onRollClick(this.updateState);
      } else {
        setTimeout(this.gameHandler.bind(this, gameData));
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
        if (this.isOnline) {
          this.updateState();
        }
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
        if (this.dicesObj.dices.length > 0) {
          const showNextPlayerBtn = this.showSkipBtn(this.currentState);
          if (showNextPlayerBtn) {
            Players.showsSkipButton = true;
            this.gamePlayers.draw();
          }
        }
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
    if (this.isOnline) {
      this.updateState();
    } else {
      this.redrawHandler();
    }
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
      Players.nextPlayer();
    }
    this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = false;
    if (this.isOnline) {
      this.updateState();
    } else {
      this.redrawHandler();
    }
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
      Players.nextPlayer();
    }
    if (!this.isOnline) {
      this.redrawHandler();
    }
  }

  private selectCheckerHandler = ({x, y, checker}) => {
    let checkersArr, spikeIndex, updateState;
    const spikeDirection = getSpikeDirection(checker.type, Players);

    if (this.checkIfOffBoardState(checker)) {
      const currentSpike = checker.currentSpike;
      const checkerHomeSpike = checker.type === Players.playersMap.White ? currentSpike + 1 : 24 - currentSpike;
      const highestCheckerSpikeNumber = this.getHighestCheckerSpikeNumber(checker);
      this.dicesObj.dices.forEach(diceResult => {
        if (checkerHomeSpike === diceResult) {
          this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = true;
        }

        if (checkerHomeSpike > diceResult) {
          spikeIndex = checker.currentSpike + diceResult * spikeDirection;
          this.spikes[spikeIndex].setShowValidMove(true);
        }

        if (checkerHomeSpike < diceResult && highestCheckerSpikeNumber === checkerHomeSpike) {
          this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = true;
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

    if (this.isOnline && updateState) {
      this.updateState();
    } else {
      this.redrawHandler();
    }
  };

  private getHighestCheckerSpikeNumber(checker) {
    const homeSpikesDirection = checker.type === Players.playersMap.White ?
      {runningSpike: 5, direction: -1} : {runningSpike: 18, direction: 1};

    for (let i = 0; i < 6; i++) {
      if (this.spikes[homeSpikesDirection.runningSpike + i * homeSpikesDirection.direction].checkers.length > 0) {
        return 6 - i;
      }
    }
  }

  private checkerHitHandler(checker) {
    checker.setPosition(this.bar.getNextCheckerPosition(checker.type));

    this.bar.checkers[Players.playersNamesMap[checker.type]].push(checker);
    if (checker.type === Players.playersMap.Black) {
      checker.currentSpike = -1;
    } else {
      checker.currentSpike = 24;
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

  private showSkipBtn(playerType) {
    let showNextPlayerBtn = true;
    const spikeDirection = getSpikeDirection(playerType, Players);

    if (this.bar.checkers[Players.playersNamesMap[playerType]].length > 0) {
      const startSpikeIndex = playerType === Players.playersMap.Black ? -1 : 24;
      showNextPlayerBtn = !this.checkPossibleMovesForSpike(playerType, startSpikeIndex, spikeDirection);
      return showNextPlayerBtn;
    }

    if (this.countWinningCheckers(playerType) === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2) {
      return false;
    }

    for (let i = 0; i < this.spikes.length && showNextPlayerBtn; i++) {
      if (this.spikes[i].checkers[0] && this.spikes[i].checkers[0].type === playerType) {
        if (this.checkPossibleMovesForSpike(playerType, i, spikeDirection)) {
          showNextPlayerBtn = false;
        }
      }
    }

    return showNextPlayerBtn;
  }

  private checkPossibleMovesForSpike(playerType, startSpikeIndex, spikeDirection) {
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

  private checkIfOffBoardState(currentChecker) {
    return this.countWinningCheckers(currentChecker.type) === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2;
  }

  private gameHandler = (gameData) => {
    BackgammonStateManager.gameState = gameData.state;

    if (this.isOnline) {
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
    if (Players.currentState % 2 === 1) { // todo - duplication
      if (this.showSkipBtn(this.currentState)) {
        Players.showsSkipButton = true;
        this.gamePlayers.draw();
      }
    }

    this.showPlayAgain = false;
    this.gamePlayers.winningPlayer = -1;
    if (this.outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.White]].length === 15) {
      this.gamePlayers.winningPlayer = Players.playersMap.White;
      this.showPlayAgain = this.isOnline;
    }

    if (this.outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.Black]].length === 15) {
      this.gamePlayers.winningPlayer = Players.playersMap.Black;
      this.showPlayAgain = this.isOnline;
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
    if (this.isOnline) {
      this.backgammonDBService.updateSelectedCheckerMove(x, y, checker, this.gameId, BackgammonStateManager.localUser);
    }
  }

  private skipPlayerHandler = () => {
    this.dicesObj.dices = [];
    this.dicesObj.setShowRollButton(true);
    if (this.isOnline) {
      this.updateState();
    } else {
      this.redrawHandler();
    }
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
    }
    this.backgammonDBService.updateGameState(this.gameId, updatedGame);
  }

  private drawPlayAgainOption() {
    Canvas.context.font = '25px serif';
    Canvas.context.fillStyle = '#f7f723';
    Canvas.context.fillText('New Game', 292, 350);
    Canvas.context.stroke();
  }

  private newGame = ({x, y}) => {
    const target = BACKGAMMON_CONSTANTS.PLAY_AGAIN_POSITION;
    const random = Math.floor(Math.random() * 2);
    const blackPlayerName = Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]];
    const whitePlayerName  = Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]];
    if (this.showPlayAgain && isOverlap(x, y, target.x, target.y, 100, 20)) {
      const firstPlayerName = !!random ? blackPlayerName : whitePlayerName;
      const secondPlayerName = !!random ? whitePlayerName : blackPlayerName;
      this.backgammonDBService.newGame(firstPlayerName, secondPlayerName, this.gameId);
    }
  }

  private hoverNewGame =({x,y})=>{
    const target = BACKGAMMON_CONSTANTS.PLAY_AGAIN_POSITION;
    if (this.showPlayAgain && isOverlap(x, y, target.x, target.y, 100, 20)) {
      Canvas.context.font = '25px serif';
      Canvas.context.fillStyle = '#b3f744';
      Canvas.context.fillText('New Game', 292, 350);
      Canvas.context.stroke();    }
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
    this.isOnline = false;
    if (this.gameStateObservable) {
      this.gameStateObservable.unsubscribe();
    }
    if (this.selectedCheckerObservable) {
      this.selectedCheckerObservable.unsubscribe();
    }
  }
}
