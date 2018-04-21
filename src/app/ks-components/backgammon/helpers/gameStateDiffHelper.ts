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
    isHomeRace: false,
    numOfCheckersInHome: 0,
    sumOfOutsideHomeCheckers: 0,
    score: 0,
    index
  };

  const spikes = {};
  calcEatenOpponentsCheckers(newState, diffInfo);
  calcIfIsHomeRace(newState, diffInfo);

  const indexOffset = this.playerType === Players.playersMap.Black ? 1 : 16;
  for (let i = indexOffset; i < indexOffset + 15; i++) {
    if (spikes[newState.checkers[i].currentSpike]) {
      spikes[newState.checkers[i].currentSpike]++;
    } else {
      spikes[newState.checkers[i].currentSpike] = 1;
    }
    calcWinningsCheckers(diffInfo, newState.checkers[i]);
    calcCheckersInHome(diffInfo, newState.checkers[i]);
    calcSumOfOutsideHomeCheckers(diffInfo, newState.checkers[i]);
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

const calcIfIsHomeRace = (newState, diffInfo) => {
  let minBlackSpike = 24, minWhiteSpike = -1;

  for (let i = 1; i <= 15; i++) {
    if (newState.checkers[i].currentSpike < minBlackSpike) {
      minBlackSpike = newState.checkers[i].currentSpike;
    }
  }

  for (let i = 16; i <= 30; i++) {
    if (newState.checkers[i].currentSpike > minWhiteSpike) {
      minWhiteSpike = newState.checkers[i].currentSpike;
    }
  }

  diffInfo.isHomeRace = minBlackSpike > minWhiteSpike;
};

const calcWinningsCheckers = (diffInfo, checker) => {
  const {BLACK_BAR_INDEX, WHITE_BAR_INDEX} = BACKGAMMON_CONSTANTS;
  const barIndex = this.playerType === Players.playersMap.Black ? BLACK_BAR_INDEX : WHITE_BAR_INDEX;
  if (checker.currentSpike === barIndex) {
    diffInfo.winningsCheckers++;
  }
};

const calcCheckersInHome = (diffInfo, checker) => {
  if (playerType === playersMap.Black && checker.currentSpike >= 18 && checker.currentSpike <= 23) {
    diffInfo.numOfCheckersInHome++;
  }

  if (playerType === playersMap.White && checker.currentSpike <= 5 && checker.currentSpike >= 0) {
    diffInfo.numOfCheckersInHome++;
  }
};

const calcSumOfOutsideHomeCheckers = (diffInfo, checker) => {
  if (checker.currentSpike > 6 && checker.currentSpike < 18) {
    if (playerType === playersMap.Black) {
      diffInfo.sumOfOutsideHomeCheckers += NUM_OF_SPIKES - checker.currentSpike;
    } else {
      diffInfo.sumOfOutsideHomeCheckers += checker.currentSpike;
    }
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


/********************      Scoring Area            ***********************/

const calcScore = (diffInfo) => {
  const {exposedCheckers, closedSpikes} = diffInfo;
  calcExposedCheckersScore(diffInfo, exposedCheckers);
  CalcEatenOpponentsCheckersScore(diffInfo);
  CalcClosedSpikesScore(diffInfo, closedSpikes);
  CalcWinningsCheckersScore(diffInfo);
  CalcHomeRaceScore(diffInfo);
  CalcOutSideHomeCheckersScore(diffInfo);
};

const calcExposedCheckersScore = (diffInfo, exposedCheckers) => {
  let score = 0;
  Object.keys(exposedCheckers).forEach((spikeIndex) => score += scoreTable.exposedChecker(spikeIndex));
  diffInfo.score += score;
};

const CalcEatenOpponentsCheckersScore = (diffInfo) => {
  diffInfo.score += diffInfo.eatenOpponentsCheckers * scoreTable.eatenChecker;
};

const CalcClosedSpikesScore = (diffInfo, closedSpikes) => {
  let score = 0;
  Object.keys(closedSpikes).forEach((spikeIndex) => score += scoreTable.closedSpikes(spikeIndex));
  diffInfo.score += score;
};

const CalcWinningsCheckersScore = (diffInfo) => {
  diffInfo.score += scoreTable.winningsCheckers * diffInfo.winningsCheckers;
};

const CalcHomeRaceScore = (diffInfo) => {
  diffInfo.score += diffInfo.isHomeRace ? diffInfo.numOfCheckersInHome * scoreTable.homeCheckers : 0;
};

const CalcOutSideHomeCheckersScore = (diffInfo) => {
  diffInfo.score += diffInfo.isHomeRace ? scoreTable.outsideHomeCheckers * diffInfo.sumOfOutsideHomeCheckers : 0;
};

const scoreTable = {
  eatenChecker: 50,
  winningsCheckers: 24,
  homeCheckers: 1000000,
  outsideHomeCheckers: -100,
  exposedChecker: (spikeIndex) => {
    return playerType === playersMap.Black ? -2 * Number(spikeIndex) : -2 * (NUM_OF_SPIKES - Number(spikeIndex));
  },
  closedSpikes: (spikeIndex) => {
    return playerType === playersMap.Black ? Number(spikeIndex) : (NUM_OF_SPIKES - Number(spikeIndex));
  }
};
