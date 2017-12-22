import {Spike} from './spike';
import {Checker} from './checker';
import {StateManager} from './stateManager';
import {isOverlap} from './helpers/backgammonUtils';
import {Dices} from './dices';
import {Players} from './players';
import {drawBackground} from './helpers/uiHelper';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {OutsideBoard} from './outsideboard';

export class GameController {
  private spikes: Spike[];
  private checkers: Checker[] = [];
  private outsideBoard: OutsideBoard;
  private dices;
  private gamePlayers: Players;
  private currentPlayerType;
  private backgroundImgUrl = 'assets/images/backgammon.jpg';
  private bar;

  private spikesPositions = [
    {x: 583, y: 42}, {x: 541, y: 42}, {x: 497, y: 42}, {x: 455, y: 42}, {x: 413, y: 42}, {x: 374, y: 42},
    {x: 272, y: 42}, {x: 229, y: 42}, {x: 183, y: 42}, {x: 141, y: 42}, {x: 101, y: 42}, {x: 56, y: 42},

    {x: 62, y: 495}, {x: 104, y: 495}, {x: 145, y: 495}, {x: 188, y: 495}, {x: 228, y: 495}, {x: 272, y: 495},
    {x: 375, y: 495}, {x: 417, y: 495}, {x: 457, y: 495}, {x: 497, y: 495}, {x: 539, y: 495}, {x: 583, y: 495},
  ];

  private checkersInitData = {
    ['0']: {type: Players.playersMap.black, num: 2},
    ['5']: {type: Players.playersMap.white, num: 5},
    ['7']: {type: Players.playersMap.white, num: 3},
    ['11']: {type: Players.playersMap.black, num: 5},
    ['12']: {type: Players.playersMap.white, num: 5},
    ['16']: {type: Players.playersMap.black, num: 3},
    ['18']: {type: Players.playersMap.black, num: 5},
    ['23']: {type: Players.playersMap.white, num: 2},

    // ['0']: {type: Players.playersMap.white, num: 2},
    // ['1']: {type: Players.playersMap.white, num: 5},
    // ['2']: {type: Players.playersMap.white, num: 3},
    // ['4']: {type: Players.playersMap.white, num: 5},
    // ['20']: {type: Players.playersMap.black, num: 5},
    // ['21']: {type: Players.playersMap.black, num: 4},
    // ['22']: {type: Players.playersMap.black, num: 5},
    // ['15']: {type: Players.playersMap.black, num: 1},
  };

  constructor() {
    this.init();
    StateManager.onSelectChecker(this.selectCheckerHandler);
  }

  private init() {
    StateManager.onSelectedCheckerDrop(this.selectedCheckerDropHandler);
    StateManager.onRedraw(this.redrawHandler);
    StateManager.onSkipPlayer(this.skipPlayerHandler);

    drawBackground(this.backgroundImgUrl).subscribe(() => {
      this.initSpikes();
      this.initCheckers();

      this.dices = new Dices();
      this.gamePlayers = new Players();
      this.outsideBoard = new OutsideBoard();
    });
  }

  private initSpikes() {
    let spike, direction;
    this.spikes = [];

    this.bar = {
      checkers: { // todo - move to separate class
        [Players.playersNamesMap[Players.playersMap.white]]: [],
        [Players.playersNamesMap[Players.playersMap.black]]: [],
      },
      getNextCheckerPosition: playerType => playerType === Players.playersMap.black ?
        {x: 325, y: 235 + this.bar.checkers[Players.playersNamesMap[Players.playersMap.black]].length * 7} :
        {x: 325, y: 385 + this.bar.checkers[Players.playersNamesMap[Players.playersMap.white]].length * 7},
    };

    for (let i = 0; i < this.spikesPositions.length; i++) {
      direction = i < this.spikesPositions.length / 2 ? 'down' : 'up';
      spike = new Spike(this.spikesPositions[i].x, this.spikesPositions[i].y, direction);
      this.spikes.push(spike);
    }
  }

  private initCheckers() {
    let playerType, numOfCheckers;
    Object.keys(this.checkersInitData).forEach(spikeIndex => {
      numOfCheckers = this.checkersInitData[spikeIndex].num;
      playerType = this.checkersInitData[spikeIndex].type;

      for (let i = 0; i < numOfCheckers; i++) {
        const position = this.spikes[spikeIndex].getNextCheckerPosition();
        const checker = new Checker(position.x, position.y, playerType, +spikeIndex);
        this.checkers.push(checker);
        this.spikes[spikeIndex].addChecker(checker);
      }
    });
  }

  private selectedCheckerDropHandler = ({x, y, checker}) => {
    let diceResult, currentCheckerPosition, spikeIndex;
    const spikeDirection = this.getSpikeDirection(checker.type);
    const relevantSpikes = [];

    if (this.isValidSpike(checker.currentSpike)) {
      const checkerIndex = this.spikes[checker.currentSpike].checkers.indexOf(checker);
      if (checkerIndex < this.spikes[checker.currentSpike].checkers.length - 1) { // check if it's a top checker
        this.alignCheckersInSpike(checkerIndex, checker);
      }
    }

    diceResult = this.dices && this.dices.dices;
    diceResult.forEach(_diceResult => {                                       // get the possible spikes to move
      spikeIndex = checker.currentSpike + _diceResult * spikeDirection;
      if (this.isValidSpike(spikeIndex)) {
        relevantSpikes.push(this.spikes[spikeIndex]);
      }
    });

    relevantSpikes.forEach(spike => spike.setShowValidMove(false));

    for (let i = 0; i < relevantSpikes.length; i++) {
      if (this.canMoveChecker(x, y, relevantSpikes, i, checker)) {
        this.moveChecker(checker, relevantSpikes[i], diceResult[i]);
        if (this.dices.dices.length > 0) {
          const showNextPlayerBtn = this.showSkipBtn(this.currentPlayerType);
          if (showNextPlayerBtn) {
            Players.showsSkipButton = true;
            this.gamePlayers.drawPlayer();
          }
        }
      }
    }

    if (this.isValidSpike(checker.currentSpike)) {
      this.spikes[checker.currentSpike].checkers.pop();
      currentCheckerPosition = this.spikes[checker.currentSpike].getNextCheckerPosition();
      checker.setPosition(currentCheckerPosition);
      this.spikes[checker.currentSpike].checkers.push(checker);
    } else {
      currentCheckerPosition = this.bar.getNextCheckerPosition(checker.type);
      checker.setPosition(currentCheckerPosition);
    }

    this.redrawHandler();
  };

  private moveChecker(checker, newSpike, diceResult) {
    const spikeDirection = this.getSpikeDirection(checker.type);
    const newSpikeIndex = checker.currentSpike + diceResult * spikeDirection;

    if (newSpike.checkers.length === 1 && newSpike.checkers[0].type !== checker.type) {
      this.checkerHitHandler(newSpike.checkers.pop());
    }

    const newPosition = newSpike.getNextCheckerPosition();
    newSpike.setShowValidMove(false);
    newSpike.checkers.push(checker);

    if (this.isValidSpike(checker.currentSpike)) {
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
    this.redrawHandler();
  }

  private selectCheckerHandler = ({x, y, checker}) => {
    let checkersArr, spikeIndex;
    const spikeDirection = this.getSpikeDirection(checker.type);

    this.dices.dices.forEach(diceResult => {
      spikeIndex = checker.currentSpike + diceResult * spikeDirection;
      if (this.isValidSpike(spikeIndex)) {
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
    if (checker.type === Players.playersMap.black) {
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
    const targetY = spike.direction === 'down' ? spike.y - 10 : spike.y - 150;
    const spikeCheckers = spike.checkers;
    const isSpikeContainChecker = spikeCheckers.indexOf(checker) > -1;
    return !isSpikeContainChecker &&
      (spikeCheckers.length < 2 || spikeCheckers[0].type === checker.type) &&
      isOverlap(x, y - 10, spike.x + 10, targetY, 20, 180) &&
      !this.hasOtherOutChecker(checker);
  }

  private showSkipBtn(playerType) {
    let showNextPlayerBtn = true;
    const spikeDirection = this.getSpikeDirection(playerType);

    if (this.bar.checkers[Players.playersNamesMap[playerType]].length > 0) {
      const startSpikeIndex = playerType === Players.playersMap.black ? -1 : 24;
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
      if (this.isValidSpike(spikeIndex)) {
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

      if (Players.currentState !== this.currentPlayerType && Players.currentState % 2 === 1) {
        this.currentPlayerType = Players.currentState;
        const showNextPlayerBtn = this.showSkipBtn(this.currentPlayerType);
        if (showNextPlayerBtn) {
          Players.showsSkipButton = true;
          this.gamePlayers.drawPlayer();
        }
      }
    });
  };

  private checkIfOffBoardState(currentChecker) {
    let spikeIndex;
    const spikeDirection = this.getSpikeDirection(currentChecker.type);

    if (this.countWinningCheckers(currentChecker.type) === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2) {
      for (let i = 0; i < this.dices.dices.length; i++) {
        spikeIndex = currentChecker.currentSpike + spikeDirection * this.dices.dices[i];
        if (spikeIndex > 23 || spikeIndex < 0) {
          return true;
        }
      }
    }
  }

  private countWinningCheckers(checkerType) {
    let winningCheckersCounter = 0;
    const winningIndex = checkerType === Players.playersMap.black ? 18 : 5;

    this.checkers
      .filter(checker => checker.type === checkerType)
      .forEach(checker => {
        if (checker.type === Players.playersMap.black) {
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

  private isValidSpike(spikeNum) {
    return spikeNum > -1 && spikeNum < 24;
  }

  private getSpikeDirection(playerType) {
    return playerType === Players.playersMap.black ? 1 : -1
  }

  private skipPlayerHandler = () => {
    this.dices.dices = [];
    this.dices.setShowRollButton(true);
  }

  private hasOtherOutChecker(checker) {
    return this.bar.checkers[Players.playersNamesMap[checker.type]].length > 0 &&
      this.bar.checkers[Players.playersNamesMap[checker.type]].indexOf(checker) === -1;
  }
}
