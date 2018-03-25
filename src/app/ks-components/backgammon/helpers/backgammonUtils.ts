import {BACKGAMMON_CONSTANTS} from './backgammonConstants';
import {BackgammonStateManager} from '../backgammonStateManager';

export const isOverlap = (x, y, targetX, targetY, width, height) => {
  return x >= targetX && x <= targetX + width && y > targetY && y <= targetY + height;
}

export const distance = (x1, x2, y1, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

export const isValidSpike = (spikeNum) => spikeNum > -1 && spikeNum < 24;

export const getSpikeDirection = (playerType, PlayersEnum) => playerType === PlayersEnum.playersMap.Black ? 1 : -1;

export const isOnline = () => BackgammonStateManager.gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE;

