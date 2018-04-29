import {BACKGAMMON_CONSTANTS} from './backgammonConstants';
import {Players} from '../players';
import {getSpikeDirection} from './backgammonUtils';

const {playersMap} = Players;
const {NUM_OF_SPIKES} = BACKGAMMON_CONSTANTS;

let playerType, direction;
export const getStateDiffInfo = (newState, index, _playerType) => {
  playerType = _playerType;
  direction = getSpikeDirection(playerType, Players);
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

  const spikesArray = buildSpikesFromCheckers(newState.checkers);
  calcExposedCheckersScore(spikesArray, diffInfo);

  const spikesObj = {};
  calcEatenOpponentsCheckers(newState, diffInfo);
  calcIfIsHomeRace(newState, diffInfo);

  const indexOffset = playerType === playersMap.Black ? 1 : 16;
  for (let i = indexOffset; i < indexOffset + 15; i++) {
    if (spikesObj[newState.checkers[i].currentSpike]) {
      spikesObj[newState.checkers[i].currentSpike]++;
    } else {
      spikesObj[newState.checkers[i].currentSpike] = 1;
    }
    calcWinningsCheckers(diffInfo, newState.checkers[i]);
    calcCheckersInHome(diffInfo, newState.checkers[i]);
    calcSumOfOutsideHomeCheckers(diffInfo, newState.checkers[i]);
  }

  calcExposedAndClosedCheckers(spikesObj, diffInfo);

  calcScore(diffInfo);
  return diffInfo;
};

const buildSpikesFromCheckers = (checkers) => {
  const spikes: any = new Array(24);

  Object.values(checkers).forEach((checker, index) => {
    if (!spikes[checker.currentSpike]) {
      spikes[checker.currentSpike] = {
        type: index < 15 ? playersMap.Black : playersMap.White,
        amount: 1
      };
    } else if (spikes[checker.currentSpike].type === (index < 15 ? playersMap.Black : playersMap.White)) {
      spikes[checker.currentSpike].amount++;
    }
  });

  return spikes;
};

const calcEatenOpponentsCheckers = (newState, diffInfo) => {
  const {BLACK_BAR_INDEX, WHITE_BAR_INDEX} = BACKGAMMON_CONSTANTS;
  const opponentBarIndex = playerType === playersMap.Black ? WHITE_BAR_INDEX : BLACK_BAR_INDEX;
  const indexOffset = playerType === playersMap.Black ? 16 : 1;

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
  const barIndex = playerType === playersMap.Black ? BLACK_BAR_INDEX : WHITE_BAR_INDEX;
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
  // calcExposedCheckersScore(diffInfo, exposedCheckers);
  CalcEatenOpponentsCheckersScore(diffInfo);
  CalcClosedSpikesScore(diffInfo, closedSpikes);
  CalcWinningsCheckersScore(diffInfo);
  CalcHomeRaceScore(diffInfo);
  CalcOutSideHomeCheckersScore(diffInfo);
};

// const calcExposedCheckersScore = (diffInfo, exposedCheckers) => {
//   let score = 0;
//   Object.keys(exposedCheckers).forEach((spikeIndex) => score += scoreTable.exposedChecker(spikeIndex));
//   diffInfo.score += score;
// };

const CalcEatenOpponentsCheckersScore = (diffInfo) => {
  diffInfo.score += diffInfo.eatenOpponentsCheckers * scoreTable.eatenOpponentChecker;
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

const calcExposedCheckersScore = (spikesArray, diffInfo) => {
  const opponentLastSixCheckers = {amount: 0, lastIndex: -1};
  let indexOffset = playerType === playersMap.Black ? 23 : 0;
  const numOfExposedHomeCheckers = {amount: 0, opponentCheckersThreat: 0};

  for (let i = 0; i < 6; i++) {
    const index = indexOffset - direction * i;
    opponentLastSixCheckers.amount += spikesArray[index] && spikesArray[index].type !== playerType ? 1 : 0;

    if (spikesArray[index] && spikesArray[index].type === playerType && spikesArray[index].amount === 1) {
      numOfExposedHomeCheckers.amount++;
      numOfExposedHomeCheckers.opponentCheckersThreat += opponentLastSixCheckers.amount;
    }

    if (opponentLastSixCheckers.amount === 1 && opponentLastSixCheckers.lastIndex === -1) {
      opponentLastSixCheckers.lastIndex = index;
    }
  }

  // opponent checker has been eaten at home
  if ((playerType === playersMap.White && !!spikesArray[-1]) || playerType === playersMap.Black && !!spikesArray[24]) {
    const eatenCheckers = spikesArray[-1] || spikesArray[24];
    if (numOfExposedHomeCheckers.amount < 2 && eatenCheckers.amount > 1) {
      diffInfo.score += eatenCheckers.amount * scoreTable.opponentCheckersEatenAtHome;
    } else {
      diffInfo.score -= numOfExposedHomeCheckers.amount * 100;
    }
  } else if (numOfExposedHomeCheckers.amount && numOfExposedHomeCheckers.opponentCheckersThreat) {
    // has exposed checker before opponent checker
    diffInfo.score += scoreTable.exposedChecker(indexOffset, numOfExposedHomeCheckers.opponentCheckersThreat);
  }

  indexOffset = playerType === playersMap.Black ? 19 : 6;
  for (let i = 0; i < 18; i++) {
    const index = indexOffset - direction * i;

    if (spikesArray[index] && spikesArray[index].type === playerType && spikesArray[index].amount === 1) {
      diffInfo.score += scoreTable.exposedChecker(index, opponentLastSixCheckers.amount);
    }

    if (spikesArray[index] && spikesArray[index].type !== playerType) {
      opponentLastSixCheckers.amount++;
      if(opponentLastSixCheckers.lastIndex === -1){
        opponentLastSixCheckers.lastIndex = index;
      }
    }

    if (index - 5 === opponentLastSixCheckers.lastIndex) {
      opponentLastSixCheckers.amount--;
      updateLastIndexOfLasSixCheckers(spikesArray, opponentLastSixCheckers, index);
    }
  }
};

const updateLastIndexOfLasSixCheckers = (spikesArray, opponentLastSixCheckers, currentIndex) => {
  for (let i = 4; i > 0; i--) {
    const index = currentIndex + i * direction;
    if (spikesArray[index] && spikesArray[index].type !== playerType) {
      opponentLastSixCheckers.lastIndex = index;
      return;
    }
  }
  opponentLastSixCheckers.lastIndex = -1; // no opponent checkers in the last 6 spike
}

const scoreTable = {
  eatenOpponentChecker: 50,
  winningsCheckers: 24,
  homeCheckers: 1000000,
  outsideHomeCheckers: -100,
  opponentCheckersEatenAtHome: 10,
  exposedChecker: (spikeIndex, nunOfThreateningCheckers) => {
    let score = playerType === playersMap.Black ? -2 * Number(spikeIndex) : -2 * (NUM_OF_SPIKES - Number(spikeIndex));
    score *= nunOfThreateningCheckers;
    return score;
  },
  closedSpikes: (spikeIndex) => {
    return playerType === playersMap.Black ? Number(spikeIndex) : (NUM_OF_SPIKES - Number(spikeIndex));
  }
};
