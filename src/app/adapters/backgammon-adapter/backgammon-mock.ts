export class BackgammonMockData {
  public static db = {
    players: {
      name1: {
        gamesIds: {
          game1: {
            playerType: 'black',
            id: 'game1'
          },
          game2: {
            playerType: 'white',
            id: 'game2'
          }
        }
      }
    },

    games: {
      game1: {
        isComplete: false,
        checkers: {
          1: {currentSpike: 18, isOffBoard: false},
          2: {currentSpike: 18, isOffBoard: false},
          3: {currentSpike: 19, isOffBoard: false},
          4: {currentSpike: 21, isOffBoard: false},
          5: {currentSpike: 21, isOffBoard: false},
          6: {currentSpike: 21, isOffBoard: false},
          7: {currentSpike: 21, isOffBoard: false},
          8: {currentSpike: 21, isOffBoard: false},
          9: {currentSpike: 21, isOffBoard: false},
          10: {currentSpike: 22, isOffBoard: false},
          11: {currentSpike: 23, isOffBoard: false},
          12: {currentSpike: 23, isOffBoard: false},
          13: {currentSpike: 23, isOffBoard: false},
          14: {currentSpike: 23, isOffBoard: false},
          15: {currentSpike: 23, isOffBoard: false},

          16: {currentSpike: 1, isOffBoard: false},
          17: {currentSpike: 2, isOffBoard: false},
          18: {currentSpike: 2, isOffBoard: false},
          19: {currentSpike: 2, isOffBoard: false},
          20: {currentSpike: 3, isOffBoard: false},
          21: {currentSpike: 4, isOffBoard: false},
          22: {currentSpike: 4, isOffBoard: false},
          23: {currentSpike: 4, isOffBoard: false},
          24: {currentSpike: 5, isOffBoard: false},
          25: {currentSpike: 5, isOffBoard: false},
          26: {currentSpike: 5, isOffBoard: false},
          27: {currentSpike: 5, isOffBoard: false},
          28: {currentSpike: 5, isOffBoard: false},
          29: {currentSpike: 5, isOffBoard: false},
          30: {currentSpike: 5, isOffBoard: false}
        },
        dices: {},
        currentState: 0
      }
    }
  }
}


