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

@Injectable()
export class GameController {
  private spikes: Spike[] = [];
  private checkers: Checker[] = [];
  private outsideBoard: OutsideBoard;
  private dices;
  private gamePlayers: Players;
  private currentState;
  private backgroundImgUrl = 'assets/images/backgammon.jpg';
  private bar;
  private isOnline = false;
  private gameState;
  private gameStateObservable;
  private gameId;

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

    drawBackground(this.backgroundImgUrl).subscribe(() => {
      this.initSpikes();
      this.initCheckers();
      this.initBar();

      this.dices = new Dices();
      this.gamePlayers = new Players();
      this.outsideBoard = new OutsideBoard();

      if (isOnline) {
        this.isOnline = true;
        this.gameId = gameId;
        this.gameStateObservable = this.backgammonDBService.getGameStateObserveable(gameId)
          .do(gameState => this.gameState = gameState)
          .subscribe(this.gameHandler);
      } else {
        this.gameHandler(gameData);
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
      getNextCheckerPosition: playerType => playerType === Players.playersMap.Black ?
        {x: 325, y: 235 + this.bar.checkers[Players.playersNamesMap[Players.playersMap.Black]].length * 7} :
        {x: 325, y: 385 + this.bar.checkers[Players.playersNamesMap[Players.playersMap.White]].length * 7},
    };
  }

  private initCheckers() {
    for (let i = 0; i < 15; i++) {
      const checker = new Checker(0, 0, Players.playersMap.Black, null);
      this.checkers.push(checker);
    }

    for (let i = 15; i < 30; i++) {
      const checker = new Checker(0, 0, Players.playersMap.White, null);
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

    diceResult = this.dices && this.dices.dices;
    diceResult.forEach(_diceResult => {                                       // get the possible spikes to move
      spikeIndex = checker.currentSpike + _diceResult * spikeDirection;
      if (isValidSpike(spikeIndex)) {
        relevantSpikes.push(this.spikes[spikeIndex]);
      }
    });

    relevantSpikes.forEach(spike => spike.setShowValidMove(false));

    for (let i = 0; i < relevantSpikes.length; i++) {
      if (this.canMoveChecker(x, y, relevantSpikes, i, checker)) {
        this.moveChecker(checker, relevantSpikes[i]);
        if (this.dices.dices.length > 0) {
          const showNextPlayerBtn = this.showSkipBtn(this.currentState);
          if (showNextPlayerBtn) {
            Players.showsSkipButton = true;
            this.gamePlayers.drawPlayer();
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

    const diceIndex = this.dices.dices.indexOf(diceResult);
    this.dices.dices.splice(diceIndex, 1);
    if (this.dices.dices.length === 0) {
      this.dices.setShowRollButton(true);
      Players.nextPlayer();
    }
    this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = false;
    if (this.isOnline) {
      this.updateState();
    } else {
      this.redrawHandler();
    }
  }

  private bearingOff(checker: Checker) {
    const position = this.outsideBoard.getNextCheckerPosition(checker.type);
    checker.setPosition(position);
    this.spikes[checker.currentSpike].checkers.pop();
    checker.currentSpike = null;
    checker.isOffBoard = true;
    this.outsideBoard.showArrow[Players.playersNamesMap[checker.type]] = false;
    this.outsideBoard.checkers[Players.playersNamesMap[checker.type]].push(checker);

    const maxDice = Math.max(...this.dices.dices);
    const diceIndex = this.dices.dices.indexOf(maxDice);
    this.dices.dices.splice(diceIndex, 1);
    this.spikes.forEach(spike => spike.setShowValidMove(false));

    const numOfOffBoardCheckers = this.checkers
      .filter(_checker => _checker.type === checker.type)
      .reduce((counter: number, _checker: Checker) => _checker.isOffBoard ? counter + 1 : counter, 0);

    if (numOfOffBoardCheckers === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2) {
      this.winningHandler(checker.type);
    }

    if (this.dices.dices.length === 0) {
      this.dices.setShowRollButton(true);
      Players.nextPlayer();
    }
    if (!this.isOnline) {
      this.redrawHandler();
    }
  }

  private selectCheckerHandler = ({x, y, checker}) => {
    let checkersArr, spikeIndex;
    const spikeDirection = getSpikeDirection(checker.type, Players);
    this.dices.dices.forEach(diceResult => {
      spikeIndex = checker.currentSpike + diceResult * spikeDirection;
      if (isValidSpike(spikeIndex)) {
        checkersArr = this.spikes[spikeIndex].checkers;
        if (!this.hasOtherOutChecker(checker) && (checkersArr.length <= 1 || checkersArr[0].type === checker.type)) {
          this.spikes[spikeIndex].setShowValidMove(true);
        }
      }
      this.offBoardCheckerHandler(checker);
    });
    this.redrawHandler();
  };

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
    for (let i = 0; i < this.dices.dices.length; i++) {
      spikeIndex = startSpikeIndex + spikeDirection * this.dices.dices[i];
      if (isValidSpike(spikeIndex)) {
        currSpike = this.spikes[spikeIndex];
        if (currSpike && (currSpike.checkers.length <= 1 || currSpike.checkers[0].type === playerType)) {
          return true;
        }
      }
    }
    return false;
  }

  private redrawHandler = () => {
    drawBackground(this.backgroundImgUrl).subscribe(() => {
      this.checkers.forEach(checker => checker.drawChecker());
      this.spikes.forEach(spikes => spikes.drawSpike());
      this.dices.drawDices();
      this.gamePlayers.drawPlayer();
      this.outsideBoard.draw();

      if (Players.currentState !== this.currentState && Players.currentState % 2 === 1) {
        this.currentState = Players.currentState;
        const showNextPlayerBtn = this.showSkipBtn(this.currentState);
        if (showNextPlayerBtn) {
          Players.showsSkipButton = true;
          this.gamePlayers.drawPlayer();
        }
      }
    });
  };

  private checkIfOffBoardState(currentChecker) {
    let spikeIndex;
    const spikeDirection = getSpikeDirection(currentChecker.type, Players);

    if (this.countWinningCheckers(currentChecker.type) === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2) {
      for (let i = 0; i < this.dices.dices.length; i++) {
        spikeIndex = currentChecker.currentSpike + spikeDirection * this.dices.dices[i];
        if (spikeIndex > 23 || spikeIndex < 0) {
          return true;
        }
      }
    }
  }

  private gameHandler = (gameData) => {
    BackgammonStateManager.gameState = gameData;
    if (this.isOnline) {
      Players.playersRealNames[Players.playersNamesMap[Players.playersMap.Black]] = gameData.players.black;
      Players.playersRealNames[Players.playersNamesMap[Players.playersMap.White]] = gameData.players.white;
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
          checker.setPosition(this.bar.getNextCheckerPosition([Players.playersNamesMap[checker.type]]));
          this.bar.checkers[Players.playersNamesMap[checker.type]].push(checker);
        }
      }
    });

    this.dices.dices = !!gameData.dices ? Object.values(gameData.dices) : [];

    Players.currentState = gameData.currentState;
    this.currentState = gameData.currentState;

    if (Players.currentState % 2 === 1) { // todo - duplication
      if (this.showSkipBtn(this.currentState)) {
        Players.showsSkipButton = true;
        this.gamePlayers.drawPlayer();
      }
    }

    if (this.outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.White]].length === 15) {
      this.gamePlayers.winningPlayer = Players.playersMap.White;
    }

    if (this.outsideBoard.checkers[Players.playersNamesMap[Players.playersMap.Black]].length === 15) {
      this.gamePlayers.winningPlayer = Players.playersMap.Black;
    }
    this.dices.showRollButton = Players.currentState % 2 === 0;

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

  private offBoardCheckerHandler(currentChecker) {
    if (this.checkIfOffBoardState(currentChecker)) {
      this.outsideBoard.showArrow[Players.playersNamesMap[currentChecker.type]] = true;
      this.outsideBoard.draw();
    }
  }


  private skipPlayerHandler = () => {
    this.dices.dices = [];
    this.dices.setShowRollButton(true);
    if (this.isOnline) {
      this.updateState();
    }
  }

  private hasOtherOutChecker(checker) {
    return this.bar.checkers[Players.playersNamesMap[checker.type]].length > 0 &&
      this.bar.checkers[Players.playersNamesMap[checker.type]].indexOf(checker) === -1;
  }

  private winningHandler(playerType) {
    this.gamePlayers.showWinningPlayer(playerType);
  }

  private updateState() {
    const newState = {
      checkers: {},
      dices: {},
      currentState: Players.currentState,
      winningPlayer: this.gamePlayers.winningPlayer,
      players: this.gameState.players,
    };
    this.checkers.forEach((checker: any, index) => {
      newState.checkers[index + 1] = {
        currentSpike: checker.currentSpike,
        isOffBoard: checker.isOffBoard
      };
    });

    this.dices.dices.forEach((dice, index) => {
      newState.dices[index] = dice;
    });

    this.backgammonDBService.updateGameState(this.gameId, newState);
  }

  public destroy() {
    Checker.destroy();
    Spike.destroy();
    Players.destroy();
    this.dices = [];
    this.checkers = [];
    this.spikes = [];
    this.isOnline = false;
    if (this.gameStateObservable) {
      this.gameStateObservable.unsubscribe();
    }
  }
}
