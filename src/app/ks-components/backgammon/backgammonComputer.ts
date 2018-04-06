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
    this.spikeDirection = getSpikeDirection(playerType, Players);
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
    // const move = this.getMove(BackgammonStateManager.gameState.dices);
    // setTimeout(() => this.makeMove(move), 1000);
    setTimeout(() => this.getMove(BackgammonStateManager.gameState.dices), 1000);
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

  private getMove = (dices) => {
    // todo - check if has checkers on the bar
    const allStatesTable = {gameStates: {}, recursiveStates: {}};
    const nextStatesArr: any = [];
    const {gameState} = BackgammonStateManager;
    const currentSpike = this.playerType === Players.playersMap.Black ? 0 : 23;
    const spikes = [];

    this.gameSpikes.forEach(spike => {
      const newSpike = {
        checkers: spike.checkers.map(checker => ({
          currentSpike: checker.currentSpike,
          isOffBoard: checker.isOffBoard,
          type: checker.type
        }))
      };
      spikes.push(newSpike);
    })

    this.getAllPossibleMoves(gameState, nextStatesArr, currentSpike, allStatesTable, spikes);

    const move = this.getBestMove(nextStatesArr);
    BackgammonStateManager.notifyComputerMove(move); // render dice.

    // todo - find the selected checkers and update the spikes accordingly
    return move;
  }

  /** 3 recursive calls:
   *  1. (same state,next spike)
   *  2. (new state ,same spike)
   *  1. (new state, next spike)**/
  public getAllPossibleMoves(gameState, nextStatesArr, currentSpike, allStatesTable, spikes) { // todo - make private
    const encodedGameState = this.encodeGameState(gameState);

    const stateKey = `${encodedGameState}, currentSpike: ${ currentSpike}`;
    if (allStatesTable.recursiveStates[stateKey]) {
      return;
    } else {
      allStatesTable.recursiveStates[stateKey] = true;
    }

    if (gameState.dices.length <= 0) {
      if (!allStatesTable.gameStates[encodedGameState]) {
        nextStatesArr.push(gameState);
        allStatesTable.gameStates[encodedGameState] = true;
      }
      return;
    }

    if (currentSpike > 23 || currentSpike < 0 || !isValidSpike(currentSpike)) {
      return;
    }

    const nextSpikeToCheck = this.spikeDirection + currentSpike;
    let dice;
    for (let i = 0; i < gameState.dices.length; i++) {
      const newState1 = deepCopy(gameState); // todo - copy only if there is a move.
      const newState2 = deepCopy(gameState);
      const newSpikes = deepCopy(spikes);
      dice = gameState.dices[i];
      this.getAllPossibleMoves(gameState, nextStatesArr, nextSpikeToCheck, allStatesTable, spikes); // 1

      const possibleSpikeToMoveIndex = currentSpike + dice * this.spikeDirection;

      const currSpikeCheckers = spikes[currentSpike].checkers || [];
      if (isValidSpike(possibleSpikeToMoveIndex) && currSpikeCheckers.length && currSpikeCheckers[0].type === this.playerType) {
        const checkersArr = this.gameSpikes[possibleSpikeToMoveIndex].checkers;
        if ((checkersArr.length <= 1 || checkersArr[0].type === this.playerType)) {
          let selectedCheckerIndex;
          const offsetType = this.playerType === Players.playersMap.Black ? 1 : 16;
          for (let j = offsetType; j < offsetType + 15; j++) {
            if (gameState.checkers[j].currentSpike === currentSpike) {
              selectedCheckerIndex = j;
              break;
            }
          }

          const selectedChecker = newSpikes[currentSpike].checkers.pop();
          selectedChecker.currentSpike = possibleSpikeToMoveIndex;
          newSpikes[possibleSpikeToMoveIndex].checkers.push(selectedChecker);
          newState1.dices.splice(gameState.dices.indexOf(dice), 1);
          newState2.dices.splice(gameState.dices.indexOf(dice), 1);
          newState1.checkers[selectedCheckerIndex].currentSpike = possibleSpikeToMoveIndex;
          newState2.checkers[selectedCheckerIndex].currentSpike = possibleSpikeToMoveIndex;
          this.getAllPossibleMoves(newState1, nextStatesArr, currentSpike, allStatesTable, newSpikes); // 2
          this.getAllPossibleMoves(newState2, nextStatesArr, nextSpikeToCheck, allStatesTable, newSpikes); // 3
        }
      }
    }
  }

  private encodeGameState(gameSate) {
    let encodedState = 'checkers:';
    Object.values(gameSate.checkers).forEach((checker, index) => encodedState += `${index}_${checker.currentSpike}, `);
    encodedState += ' dices:';
    gameSate.dices.forEach((dice, index) => encodedState += `${index}_${dice}, `);
    return encodedState;
  }

  private getBestMove(statesArr) {
    const nextState = statesArr[Math.floor(Math.random()* statesArr.length)];
    nextState.currentState = (nextState .currentState + 1 ) % 4;
    return nextState;
  }
}
