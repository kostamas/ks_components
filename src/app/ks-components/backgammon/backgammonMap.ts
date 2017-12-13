import {Spike} from './spike';

export class BackgammonMap {
  private map: Spike[];
  private spikesPositions = [
    {x: 656, y: 48}, {x: 608, y: 48}, {x: 559, y: 48}, {x: 511, y: 48}, {x: 465, y: 48}, {x: 421, y: 48},
    {x: 307, y: 48}, {x: 258, y: 48}, {x: 207, y: 48}, {x: 161, y: 48}, {x: 117, y: 48}, {x: 66, y: 48},

    {x: 70, y: 561}, {x: 118, y: 561}, {x: 212, y: 561}, {x: 164, y: 561}, {x: 257, y: 561}, {x: 303, y: 561},
    {x: 424, y: 561}, {x: 470, y: 561}, {x: 514, y: 561}, {x: 560, y: 561}, {x: 606, y: 561}, {x: 655, y: 561},
  ];

  private checkers = {
    ['0']: {type: 'white-player', num: 2},
    ['5']: {type: 'black-player ', num: 5},
    ['7']: {type: 'black-player', num: 3},
    ['11']: {type: 'white-player', num: 5},
    ['12']: {type: 'black-player', num: 5},
    ['16']: {type: 'white-player', num: 3},
    ['18']: {type: 'white-player', num: 5},
    ['23']: {type: 'black-player', num: 1}
  };

  constructor() {
    this.init();
  }

  private init() {
    this.initSpikes();
    this.initCheckers();
  }

  private initSpikes() {
    let spike, direction;
    this.map = [];
    for (let i = 0; i < this.spikesPositions.length; i++) {
      direction = i < this.spikesPositions.length / 2 ? 'down' : 'up';
      spike = new Spike(this.spikesPositions[i].x, this.spikesPositions[i].y, direction);

      this.map.push(spike);
    }
  }

  private initCheckers() {
    let playerType, numOfCheckers;
    Object.keys(this.checkers).forEach(spikeIndex => {
      numOfCheckers = this.checkers[spikeIndex].num;
      playerType = this.checkers[spikeIndex].type;

      for (let i = 0; i < numOfCheckers; i++) {
        this.map[spikeIndex].addChecker(playerType);
      }
    })
  }
}
