export class Players {
  public static playersMap = {
    none: 0,
    black: 1,
    white: 2
  }

  public static playersNamesMap = {
    [Players.playersMap.none]: 'none',
    [Players.playersMap.black]: 'black',
    [Players.playersMap.white]: 'white'
  }

  public static activePlayerIndex = 0;

  public static nextPlayer() {
    Players.activePlayerIndex++;
    Players.activePlayerIndex %= 3;
  }
}
