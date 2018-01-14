export interface IBackgammonDb {
  getGameById: (id: string) => any;
}

export interface IBackgammonSrvCtor {
  new(args: any): IBackgammonDb;
}
