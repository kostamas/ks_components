import {Spike} from './spike';
import {Canvas} from './canvas';
import {Observable} from 'rxjs/Observable';
import {Checker} from './checker';
import {StateManager} from './stateManager';
import {isOverlap} from "./helpers/backgammonUtils";

export class GameController {
  private spikes: Spike[];
  private checkers: Checker[] = [];

  private backgroundimgUrl = 'assets/images/backgammon.jpg';

  private spikesPositions = [
    {x: 583, y: 42}, {x: 541, y: 42}, {x: 497, y: 42}, {x: 455, y: 42}, {x: 413, y: 42}, {x: 374, y: 42},
    {x: 272, y: 42}, {x: 229, y: 42}, {x: 183, y: 42}, {x: 141, y: 42}, {x: 101, y: 42}, {x: 56, y: 42},

    {x: 62, y: 495}, {x: 104, y: 495}, {x: 145, y: 495}, {x: 188, y: 495}, {x: 228, y: 495}, {x: 272, y: 495},
    {x: 375, y: 495}, {x: 417, y: 495}, {x: 457, y: 495}, {x: 497, y: 495}, {x: 539, y: 495}, {x: 583, y: 495},
  ];

  private checkersInitData = {
    ['0']: {type: 'black-player', num: 2},
    ['2']: {type: 'white-player', num: 1},
    ['4']: {type: 'white-player', num: 5},
    ['7']: {type: 'white-player', num: 3},
    ['11']: {type: 'black-player', num: 5},
    ['12']: {type: 'white-player', num: 5},
    ['16']: {type: 'black-player', num: 3},
    ['18']: {type: 'black-player', num: 5},
    ['23']: {type: 'white-player', num: 2},
  };

  constructor() {
    this.init();
  }

  public init() {
    StateManager.onSelectedCheckerDrop(this.selectedCheckerDropHandler);
    StateManager.onRedraw(this.redrawHandler);
    this.drawBackground().subscribe(() => {
      this.initSpikes();
      this.initCheckers();
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
      background.src = this.backgroundimgUrl;
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
    });
  }

  public selectedCheckerDropHandler = ({x, y, diceResult, checker}) => {
    const relevantSpikes = [
      this.spikes[checker.currentSpike + diceResult[0]],
      this.spikes[checker.currentSpike + diceResult[1]]
    ];
    let spikeCheckers;

    for (let i = 0; i < relevantSpikes.length; i++) {
      if (relevantSpikes[i]) {
        const targetY = relevantSpikes[i].direction === 'down' ? relevantSpikes[i].y - 10 : relevantSpikes[i].y - 150;
        spikeCheckers = relevantSpikes[i].checkers;

        if (isOverlap(x, y - 10, relevantSpikes[i].x + 10, targetY, 20, 180)) { // todo - duplicate (same check inside spike class)
          const isSpikeContainChecker = spikeCheckers.indexOf(checker) > -1;

          if (!isSpikeContainChecker && (spikeCheckers.length < 2 || spikeCheckers[0].type === checker.type)) {
            const spikeIndex = diceResult[i] + checker.currentSpike;
            this.moveChecker(checker, relevantSpikes[i], this.spikes[checker.currentSpike], spikeIndex);
            return;
          }
        }
      }
    }

    this.spikes[checker.currentSpike].checkers.pop();
    const currentCheckerPosition = this.spikes[checker.currentSpike].getNextCheckerPosition();
    checker.setPosition(currentCheckerPosition);
    this.spikes[checker.currentSpike].checkers.push(checker);
    this.redrawHandler();
  };

  private moveChecker(checker, newSpike, oldSpike, newSpikeIndex) {
    if (newSpike.checkers.length === 1 && newSpike.checkers[0].type !== checker.type) {
      this.checkerHitHandler(newSpike.checkers.pop());
    }

    const newPosition = newSpike.getNextCheckerPosition();
    newSpike.setShowValidMove(false);
    newSpike.checkers.push(checker);
    oldSpike.checkers.pop();

    checker.setPosition(newPosition);
    checker.currentSpike = newSpikeIndex;
    this.redrawHandler();
  }

  private checkerHitHandler(checker) {
    checker.setPosition({x: 325, y: 275});
  }
}
