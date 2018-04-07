import {BACKGAMMON_CONSTANTS} from './backgammonConstants';
import {BackgammonStateManager} from '../backgammonStateManager';

export const isOverlap = (x, y, targetX, targetY, width, height) => {
  return x >= targetX && x <= targetX + width && y > targetY && y <= targetY + height;
}

export const distance = (x1, x2, y1, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

export const isValidSpike = (spikeNum) => spikeNum > -1 && spikeNum < 24;

export const getSpikeDirection = (playerType, PlayersEnum) => playerType === PlayersEnum.playersMap.Black ? 1 : -1;

export const isOnline = () => BackgammonStateManager.gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE; // todo - remove to BackgammonStateManager

export const isVSComputer = () => BackgammonStateManager.gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER;  // todo - remove to BackgammonStateManager

export const isLocal = () => BackgammonStateManager.gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL; // todo - remove to BackgammonStateManager

export const rollDices = () => {
  let dices = [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
  if (dices[0] === dices[1]) {
    dices = [dices[0], dices[0], dices[0], dices[0]];
  }
  return dices;
}

export const countWinningCheckers = (checkers, checkerType, playersMap) => {
  let winningCheckersCounter = 0;
  const winningIndex = checkerType === playersMap.Black ? 18 : 5;

  checkers.filter(checker => checker.type === checkerType)
    .forEach(checker => {
      if (checker.type === playersMap.Black) {
        winningCheckersCounter += checker.currentSpike >= winningIndex || checker.isOffBoard ? 1 : 0;
      } else {
        winningCheckersCounter += checker.currentSpike <= winningIndex || checker.isOffBoard ? 1 : 0;
      }
    });
  return winningCheckersCounter;
}

export const checkIfOffBoardState = (checkers, checkerType, playersMap) => {
  return countWinningCheckers(checkers, checkerType, playersMap) === BACKGAMMON_CONSTANTS.NUM_OF_CHECKERS / 2;
}

export const getHighestCheckerSpikeNumber = (checker, playersMap, spikes) => {
  const homeSpikesDirection = checker.type === playersMap.White ?
    {runningSpike: 5, direction: -1} : {runningSpike: 18, direction: 1};  // todo - use getSpikeDirection

  for (let i = 0; i < 6; i++) {
    const checkersArr = spikes[homeSpikesDirection.runningSpike + i * homeSpikesDirection.direction].checkers;
    if (checkersArr.length > 0 && checker.type === checkersArr[0].type) {
      return 6 - i;
    }
  }
}

