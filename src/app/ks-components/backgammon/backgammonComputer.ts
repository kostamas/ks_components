import {BackgammonStateManager} from './backgammonStateManager';
import {Players} from './players';
import {getSpikeDirection, rollDices} from './helpers/backgammonUtils';
import {deepCopy} from "../../utils/jsUtils";

export class BackgammonComputer {
  private playerType;

  constructor(playerType) {
    BackgammonStateManager.onNextPlayerState(this.onNextPlayerState);
    this.playerType = playerType;
  }

  private onNextPlayerState = () => {
    setTimeout(() => {
      const {gameState} = BackgammonStateManager;
      if (this.playerType === Players.getCurrentPlayerType()) {
        gameState.dices = rollDices();
        gameState.currentState = this.playerType; // player type = 3, current state = 2, for showing the dices - currentState++;
        setTimeout(() => {
          BackgammonStateManager.notifyComputerMove(gameState); // render dice.
          this.computerYouCanPlay();
        }, 1000);
      }
    });
  }

  private computerYouCanPlay = () => {
    const move = this.getBestMove(BackgammonStateManager.gameState.dices);
    setTimeout(() => this.makeMove(move), 1000);
  }


  private makeMove = ({checkerIndex, nextSpikeIndex, dice}) => {
    const {gameState} = BackgammonStateManager;
    const selectedChecker = gameState.checkers[checkerIndex];
    selectedChecker.currentSpike = nextSpikeIndex;
    gameState.dices.splice(gameState.dices.indexOf(dice), 1);

    if (gameState.dices.length === 0) {
      gameState.currentState = (gameState.currentState + 1 ) % 4;
    }
    BackgammonStateManager.notifyComputerMove(gameState);
    if (gameState.dices.length > 0) {
      this.computerYouCanPlay();
    }
  }

  private getBestMove = (dices) => {
    const spikeDirection = getSpikeDirection(this.playerType, Players);
    const nextStatesArr = [];
    const {gameState} = BackgammonStateManager;

    gameState.spikes.forEach(spike => {
      const nextState = deepCopy(gameState);
      dices.forEach(dice => {
        if(nextState.spikes[]){

        }
      });
    });
    const move = {checkerIndex: 1, nextSpikeIndex: 21, dice: 2};
    return move;
  }
}
