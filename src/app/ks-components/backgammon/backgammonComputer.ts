import {BackgammonStateManager} from './backgammonStateManager';
import {Players} from './players';

export class BackgammonComputer {
  private playerType;

  constructor(playerType) {
    BackgammonStateManager.onNextPlayerState(this.onNextPlayerState);
    this.playerType = playerType;
  }

  private onNextPlayerState = () => {
    const {gameState} = BackgammonStateManager;
    if (this.playerType === Players.getCurrentPlayerType()) {
      debugger;
    }
  }
}
