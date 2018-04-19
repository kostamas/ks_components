import {BACKGAMMON_CONSTANTS} from './backgammonConstants';
import {Players} from '../players';

const {playersMap} = Players;
const {NUM_OF_SPIKES} = BACKGAMMON_CONSTANTS;

let playerType;
export const getStateDiffInfo = (newState, index, _playerType) => {
  playerType = _playerType;
  const diffInfo: any = {
    exposedCheckers: {},
    eatenOpponentsCheckers: 0,
    closedSpikes: {},
    winningsCheckers: 0,
    score: 0,
    index
  };

  const spikes = {};
  calcEatenOpponentsCheckers(newState, diffInfo);

  const indexOffset = this.playerType === Players.playersMap.Black ? 1 : 16;
  for (let i = indexOffset; i < indexOffset + 15; i++) {
    if (spikes[newState.checkers[i].currentSpike]) {
      spikes[newState.checkers[i].currentSpike]++;
    } else {
      spikes[newState.checkers[i].currentSpike] = 1;
    }
    calcWinningsCheckers(diffInfo, newState.checkers[i]);
  }

  calcExposedAndClosedCheckers(spikes, diffInfo);

  calcScore(diffInfo);
  return diffInfo;
};

const calcEatenOpponentsCheckers = (newState, diffInfo) => {
  const {BLACK_BAR_INDEX, WHITE_BAR_INDEX} = BACKGAMMON_CONSTANTS;
  const opponentBarIndex = this.playerType === Players.playersMap.Black ? WHITE_BAR_INDEX : BLACK_BAR_INDEX;
  const indexOffset = this.playerType === Players.playersMap.Black ? 16 : 1;

  for (let i = indexOffset; i < indexOffset + 15; i++) {
    if (newState.checkers[i].currentSpike === opponentBarIndex) {
      diffInfo.eatenOpponentsCheckers++;
    }
  }
};

const calcWinningsCheckers = (diffInfo, checker) => {
  const {BLACK_BAR_INDEX, WHITE_BAR_INDEX} = BACKGAMMON_CONSTANTS;
  const barIndex = this.playerType === Players.playersMap.Black ? BLACK_BAR_INDEX : WHITE_BAR_INDEX;
  if (checker.currentSpike === barIndex) {
    diffInfo.winningsCheckers++;
  }
};

const calcExposedAndClosedCheckers = (spikes, diffInfo) => {
  Object.keys(spikes).forEach(index => {
    const numOfCheckers = spikes[index];
    if (numOfCheckers === 1) {
      diffInfo.exposedCheckers[index] = true;
    } else {
      diffInfo.closedSpikes[index] = true;
    }
  });
};

const calcScore = (diffInfo) => {
  const {exposedCheckers, closedSpikes} = diffInfo;
  calcExposedCheckersScore(diffInfo, exposedCheckers);
  CalcEatenOpponentsCheckersScore(diffInfo);
  CalcClosedSpikesScore(diffInfo, closedSpikes);
  CalcWinningsCheckersScore(diffInfo);

};

const calcExposedCheckersScore = (diffInfo, exposedCheckers) => {
  let score = 0;
  Object.keys(exposedCheckers).forEach((spikeIndex) => score += scoreTable.exposedChecker(spikeIndex));
  diffInfo.score += score;
}

const CalcEatenOpponentsCheckersScore = (diffInfo) => {
  const score = diffInfo.eatenOpponentsCheckers * scoreTable.eatenChecker;
  diffInfo.score += score;
}

const CalcClosedSpikesScore = (diffInfo, closedSpikes) => {
  let score = 0;
  Object.keys(closedSpikes).forEach((spikeIndex) => score += scoreTable.closedSpikes(spikeIndex));
  diffInfo.score += score;
}

const CalcWinningsCheckersScore = (diffInfo) => {
  diffInfo.score += scoreTable.winningsCheckers * diffInfo.winningsCheckers;
}

const scoreTable = {
  eatenChecker: 13,
  winningsCheckers: 24,
  exposedChecker: (spikeIndex) => {
    return playerType === playersMap.Black ? -2 * Number(spikeIndex) : -2 * (NUM_OF_SPIKES - Number(spikeIndex));
  },
  closedSpikes: (spikeIndex) => {
    return playerType === playersMap.Black ? Number(spikeIndex) : (NUM_OF_SPIKES - Number(spikeIndex));
  }
}
