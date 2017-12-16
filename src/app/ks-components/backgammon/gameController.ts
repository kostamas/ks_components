import {Spike} from './spike';
import {Canvas} from './canvas';
import {Observable} from 'rxjs/Observable';
import {Checker} from './checker';
import {StateManager} from './stateManager';

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
    ['5']: {type: 'white-player', num: 5},
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
        const checker = new Checker(position.x, position.y, playerType);
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
    });
  }
}
