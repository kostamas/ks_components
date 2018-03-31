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

