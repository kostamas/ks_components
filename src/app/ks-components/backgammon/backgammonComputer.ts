import {BackgammonStateManager} from './backgammonStateManager';
import {Players} from './players';
import {Dices} from './dices';

export class BackgammonComputer {
  private playerType;
  private checkerIndex = 29;

  constructor(playerType, private dicesObject: Dices) {
    BackgammonStateManager.onNextPlayerState(this.onNextPlayerState);
    this.playerType = playerType;
  }

  private onNextPlayerState = () => {
    const {gameState} = BackgammonStateManager;

    if (this.playerType === Players.getCurrentPlayerType()) {
      setTimeout(() => {
        this.dicesObject.rollDicesHandler();
        BackgammonStateManager.gameState.currentState = this.playerType; // player type = 3, current state = 2, for showing the dices - currentState++;
        this.computerYouCanPlay();
      }, 1000);
    }
  };

  private computerYouCanPlay = () => {
    setTimeout(() => {
      const dices = this.dicesObject.dices;

      const move = this.getBestMove(dices);
      this.makeMove(move);
      if (dices.length > 0) {
        this.computerYouCanPlay();
      }
    }, 1000);
  }

  private getBestMove = (dices) => {
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
