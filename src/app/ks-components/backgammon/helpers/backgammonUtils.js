"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOverlap = function (x, y, targetX, targetY, width, height) {
    return x >= targetX && x <= targetX + width && y > targetY && y <= targetY + height;
};
exports.distance = function (x1, x2, y1, y2) { return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)); };
exports.isValidSpike = function (spikeNum) { return spikeNum > -1 && spikeNum < 24; };
exports.getSpikeDirection = function (playerType, PlayersEnum) { return playerType === PlayersEnum.playersMap.Black ? 1 : -1; };
