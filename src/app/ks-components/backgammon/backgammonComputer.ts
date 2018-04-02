import {BackgammonStateManager} from './backgammonStateManager';
import {Players} from './players';
import {getSpikeDirection, isValidSpike, rollDices} from './helpers/backgammonUtils';
import {deepCopy} from '../../utils/jsUtils';

export class BackgammonComputer {
  private playerType;
  private spikeDirection;
  private gameSpikes;

  constructor(playerType, gameSpikes) {
    BackgammonStateManager.onNextPlayerState(this.onNextPlayerState);
    this.playerType = playerType;
    this.spikeDirection = getSpikeDirection(playerType, Players.playersMap);
    this.gameSpikes = gameSpikes;
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
    let nextStatesArr: any = [];
    const {gameState} = BackgammonStateManager;
    const currentSpike = this.playerType === Players.playersMap.Black ? 0 : 23;
    const allStatsTable = {};

    // todo - check if has checkers on the bar
    nextStatesArr = this.getAllPossibleMoves(gameState, nextStatesArr, currentSpike, allStatsTable);

    gameState.spikes.forEach(spike => {
      const nextState = deepCopy(gameState);
      dices.forEach(dice => {

      });
    });
    const move = {checkerIndex: 1, nextSpikeIndex: 21, dice: 2};
    // todo - find the selected checkers and update the spikes accordingly
    return move;
  }

  /** 3 recursive calls:
   *  1. (same state,next spike)
   *  2. (new state ,same spike)
   *  1. (new state, next spike)**/
  private getAllPossibleMoves(gameState, nextStatesArr, currentSpike, allStatesTable) {
    // if(allStatesTable[inCode(gameStateCode, currentSpike]){ todo - optimization
    // return
    // } else {
    // llStatesTable[inCode(gameStateCode, currentSpike)] = true
    //  }

    if (gameState.dices.length < 0) {
      nextStatesArr.push(gameState);
      return;
    }

    if (!isValidSpike(currentSpike)) {
      return;
    }


    const nextSpikeToCheck = this.spikeDirection + currentSpike;
    let dice;
    for (let i = 0; i < gameState.dices; i++) {
      const newState1 = deepCopy(gameState);
      const newState2 = deepCopy(gameState);

      dice = gameState.dices[i];
      this.getAllPossibleMoves(gameState, nextStatesArr, nextSpikeToCheck, allStatesTable); // 1
      const possibleSpikeToMoveIndex = nextSpikeToCheck + dice * this.spikeDirection;

      if (isValidSpike(possibleSpikeToMoveIndex)) {
        const checkersArr = this.gameSpikes[possibleSpikeToMoveIndex].checkers;
        if ((checkersArr.length <= 1 || checkersArr[0].type === this.playerType)) {
          let selectedCheckerIndex;
          for (let j = 0; j < 30; j++) { // todo - optimize - run by checker type
            if (gameState.checkers.currentSpike === currentSpike) {
              selectedCheckerIndex = j;
              break;
            }
          }

          newState1.dices.splice(gameState.dices.indexOf(dice), 1);
          newState2.dices.splice(gameState.dices.indexOf(dice), 1);
          newState1.cherckers[selectedCheckerIndex].currentSpike = possibleSpikeToMoveIndex;
          newState2.cherckers[selectedCheckerIndex].currentSpike = possibleSpikeToMoveIndex;
          this.getAllPossibleMoves(newState1, nextStatesArr, currentSpike, allStatesTable); // 2
          this.getAllPossibleMoves(newState2, nextStatesArr, nextSpikeToCheck, allStatesTable); // 3
        }
      }
    }
  }
}
