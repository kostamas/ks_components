import {Spike} from './spike';
import {Canvas} from './canvas';
import {Observable} from 'rxjs/Observable';
import {Checker} from './checker';
import {StateManager} from './stateManager';
import {isOverlap} from "./helpers/backgammonUtils";
import {Dices} from "./dices";
import {Players} from "./players";

export class GameController {
  private spikes: Spike[];
  private checkers: Checker[] = [];
  private dices;
  private gamePlayers: Players;

  private backgroundImgUrl = 'assets/images/backgammon.jpg';

  private spikesPositions = [
    {x: 583, y: 42}, {x: 541, y: 42}, {x: 497, y: 42}, {x: 455, y: 42}, {x: 413, y: 42}, {x: 374, y: 42},
    {x: 272, y: 42}, {x: 229, y: 42}, {x: 183, y: 42}, {x: 141, y: 42}, {x: 101, y: 42}, {x: 56, y: 42},

    {x: 62, y: 495}, {x: 104, y: 495}, {x: 145, y: 495}, {x: 188, y: 495}, {x: 228, y: 495}, {x: 272, y: 495},
    {x: 375, y: 495}, {x: 417, y: 495}, {x: 457, y: 495}, {x: 497, y: 495}, {x: 539, y: 495}, {x: 583, y: 495},
  ];

  private checkersInitData = {
    ['0']: {type: Players.playersMap.black, num: 2},
    ['4']: {type: Players.playersMap.white, num: 5},
    ['7']: {type: Players.playersMap.white, num: 3},
    ['11']: {type: Players.playersMap.black, num: 5},
    ['12']: {type: Players.playersMap.white, num: 5},
    ['16']: {type: Players.playersMap.black, num: 3},
    ['18']: {type: Players.playersMap.black, num: 5},
    ['23']: {type: Players.playersMap.white, num: 2},
  };

  constructor() {
    this.init();
    StateManager.onSelectChecker(this.selectCheckerHandler);
  }

  public init() {
    StateManager.onSelectedCheckerDrop(this.selectedCheckerDropHandler);
    StateManager.onRedraw(this.redrawHandler);
    this.drawBackground().subscribe(() => {
      this.initSpikes();
      this.initCheckers();
      this.dices = new Dices();
      this.gamePlayers = new Players();
    });
  }

  private initSpikes() {
    let spike, direction;
    this.spikes = [];

    this.spikes['-1'] = {
      [Players.playersNamesMap[Players.playersMap.white]]: [],
      [Players.playersNamesMap[Players.playersMap.black]]: [],
      getNextCheckerPosition: playerType => playerType === Players.playersMap.black ? {x: 325, y: 235} : {
        x: 325,
        y: 385
      }
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

  public drawBackground() {
    return Observable.create((observer) => {
      const background = new Image();
      background.src = this.backgroundImgUrl;
      background.onload = () => {
        Canvas.context.drawImage(background, 0, 0);
        observer.next();
        observer.complete();
      };
    });
  }

  public redrawHandler = () => {
    this.drawBackground().subscribe(() => {
      this.checkers.forEach(checker => checker.drawChecker());
      this.spikes.forEach(spikes => spikes.drawSpike());
      this.dices.drawDices();
      this.gamePlayers.drawPlayer();
    });
  };

  public selectedCheckerDropHandler = ({x, y, checker}) => {
    let diceResult, relevantSpikes = [], spikeCheckers, currentCheckerPosition;

    if (checker.currentSpike > -1) {
      const checkerIndex = this.spikes[checker.currentSpike].checkers.indexOf(checker);
      if (checkerIndex < this.spikes[checker.currentSpike].checkers.length) {
        this.alignCheckersInSpike(checkerIndex, checker);
      }
    }

    if (this.dices && this.dices.dices && this.dices.dices.length > 0) {
      diceResult = this.dices.dices;
    }
    diceResult.forEach(diceResult => relevantSpikes.push(this.spikes[checker.currentSpike + diceResult]));

    relevantSpikes.forEach(spike => spike.setShowValidMove(false));

    for (let i = 0; i < relevantSpikes.length; i++) {
      if (relevantSpikes[i]) {
        const targetY = relevantSpikes[i].direction === 'down' ? relevantSpikes[i].y - 10 : relevantSpikes[i].y - 150;
        spikeCheckers = relevantSpikes[i].checkers;

        if (isOverlap(x, y - 10, relevantSpikes[i].x + 10, targetY, 20, 180)) {
          const isSpikeContainChecker = spikeCheckers.indexOf(checker) > -1;

          if (!isSpikeContainChecker && (spikeCheckers.length < 2 || spikeCheckers[0].type === checker.type)) {
            this.moveChecker(checker, relevantSpikes[i], diceResult[i]);
            return;
          }
        }
      }
    }

    if (checker.currentSpike > -1) {
      this.spikes[checker.currentSpike].checkers.pop();
      currentCheckerPosition = this.spikes[checker.currentSpike].getNextCheckerPosition();
      checker.setPosition(currentCheckerPosition);
      this.spikes[checker.currentSpike].checkers.push(checker);
    } else {
      currentCheckerPosition = this.spikes['-1'].getNextCheckerPosition(checker.type);
      checker.setPosition(currentCheckerPosition);
    }

    this.redrawHandler();
  };

  private moveChecker(checker, newSpike, diceResult) {
    const newSpikeIndex = diceResult + checker.currentSpike;

    if (newSpike.checkers.length === 1 && newSpike.checkers[0].type !== checker.type) {
      this.checkerHitHandler(newSpike.checkers.pop());
    }

    const newPosition = newSpike.getNextCheckerPosition();
    newSpike.setShowValidMove(false);
    newSpike.checkers.push(checker);
    if (checker.currentSpike > -1) {
      this.spikes[checker.currentSpike].checkers.pop();
    } else {
      this.spikes['-1']['black'].pop();
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
    let spikeCheckers;
    this.dices.dices.forEach(diceResult => {
      spikeCheckers = this.spikes[checker.currentSpike + diceResult];
      if (spikeCheckers.checkers.length <= 1 || spikeCheckers.checkers[0].type === checker.type) {
        this.spikes[checker.currentSpike + diceResult].setShowValidMove(true);
      }
    });
    this.redrawHandler();
  };

  private checkerHitHandler(checker) {
    checker.setPosition(this.spikes['-1'].getNextCheckerPosition(checker.type));
    this.spikes['-1'][Players.playersNamesMap[checker.type]].push(checker);
    checker.currentSpike = -1;
  }

  private alignCheckersInSpike(indexToAlign, currentChecker) {
    const currentSpike = this.spikes[currentChecker.currentSpike];
    const checkerToAlign = currentSpike.checkers[currentSpike.checkers.length - 1];
    const nextPosition = this.spikes[currentChecker.currentSpike].getNextCheckerPosition(indexToAlign);
    checkerToAlign.setPosition(nextPosition);
    currentSpike.checkers.splice(indexToAlign, 1, checkerToAlign);
    currentSpike.checkers.push(currentChecker);
  }
}
