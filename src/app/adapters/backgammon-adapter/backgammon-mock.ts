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
          white: {
            1: {
              x: 123,
              y: 123,
              currentSpike: 11,
              isOffBoard: false
            }
          },
          black: {
            1: {
              x: 123,
              y: 123,
              currentSpike: 11,
              isOffBoard: false
            }

          },
        },
        dices: {
          1: 3,
          2: 5,
          3: 2
        }
      }
    }
  }
}


