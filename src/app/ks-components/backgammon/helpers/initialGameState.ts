export const initialState = {
  state: {
    winningPlayer: -1,
    checkers: {
      1: {currentSpike: 0, isOffBoard: false},
      2: {currentSpike: 0, isOffBoard: false},
      3: {currentSpike: 11, isOffBoard: false},
      4: {currentSpike: 11, isOffBoard: false},
      5: {currentSpike: 11, isOffBoard: false},
      6: {currentSpike: 11, isOffBoard: false},
      7: {currentSpike: 11, isOffBoard: false},
      8: {currentSpike: 16, isOffBoard: false},
      9: {currentSpike: 16, isOffBoard: false},
      10: {currentSpike: 16, isOffBoard: false},
      11: {currentSpike: 18, isOffBoard: false},
      12: {currentSpike: 18, isOffBoard: false},
      13: {currentSpike: 18, isOffBoard: false},
      14: {currentSpike: 18, isOffBoard: false},
      15: {currentSpike: 18, isOffBoard: false},

      16: {currentSpike: 5, isOffBoard: false},
      17: {currentSpike: 5, isOffBoard: false},
      18: {currentSpike: 5, isOffBoard: false},
      19: {currentSpike: 5, isOffBoard: false},
      20: {currentSpike: 5, isOffBoard: false},
      21: {currentSpike: 7, isOffBoard: false},
      22: {currentSpike: 7, isOffBoard: false},
      23: {currentSpike: 7, isOffBoard: false},
      24: {currentSpike: 12, isOffBoard: false},
      25: {currentSpike: 12, isOffBoard: false},
      26: {currentSpike: 12, isOffBoard: false},
      27: {currentSpike: 12, isOffBoard: false},
      28: {currentSpike: 12, isOffBoard: false},
      29: {currentSpike: 23, isOffBoard: false},
      30: {currentSpike: 23, isOffBoard: false}
    },
    dices: {},
    moveSuggestion: {},
    currentState: 0
  },
  selectedChecker: {
    id: -1,
    x: -1,
    y: -1
  }
}
