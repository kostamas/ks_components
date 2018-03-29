import {BackgammonStateManager} from './backgammonStateManager';
import {Players} from './players';
import {Dices} from './dices';

export class BackgammonComputer {
  private playerType;
  private checkerIndex = 29;

  constructor(playerType) {
    BackgammonStateManager.onNextPlayerState(this.onNextPlayerState);
    this.playerType = playerType;
  }

  private onNextPlayerState = () => {
    setTimeout(() => {
      const {gameState} = BackgammonStateManager;

      if (this.playerType === Players.getCurrentPlayerType()) {
        let dices = [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
        if (dices[0] === dices[1]) {
          dices = [dices[0], dices[0], dices[0], dices[0]];
        }
        BackgammonStateManager.gameState.dices = dices;
        BackgammonStateManager.gameState.currentState = this.playerType; // player type = 3, current state = 2, for showing the dices - currentState++;
        this.computerYouCanPlay();
      }
    })
  };

  private computerYouCanPlay = () => {
    setTimeout(() => {
      const move = this.getBestMove(BackgammonStateManager.gameState.dices);
      this.makeMove(move);
      if (BackgammonStateManager.gameState.dices.length > 0) {
        this.computerYouCanPlay();
      }
      BackgammonStateManager.gameState.dices.shift();
    }, 1000);
  }

  private getBestMove = (dice) => {
    const move = {checkerIndex: this.checkerIndex, nextSpikeIndex: 21};
    this.checkerIndex--;
    return move;
  }

  private makeMove = ({checkerIndex, nextSpikeIndex}) => {
    const selectedChecker = BackgammonStateManager.gameState.checkers[checkerIndex];
    selectedChecker.currentSpike = nextSpikeIndex;
    BackgammonStateManager.notifyComputerMove(BackgammonStateManager.gameState);
  }
}
