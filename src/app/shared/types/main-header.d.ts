export interface IHeaderTab {
  id: number;
  name: string;
  icon: string;
  menus: IMenu[];
}

export interface IMenu {
  id: number;
  name: string;
  menus: IPageGroupNames[];
}

export interface IPageGroupNames {
  id: number;
  title: string;
  name: string;
  menus: IPage[];
}

export interface IPage {
  id: number;
  isFavorite: boolean;
  formCode: string;
  name: string;
  link: string;
}

export interface IMainHeaderConfig {
  calcSideBarClass?: (...args: any[]) => string;
  sideBarCustomClass?: string;
	isMainHeaderOpenHandler?: (openOverlay: boolean) => void;
}

export interface IMainHeaderConfigConstructor {
  new(...args: any[]): IMainHeaderConfig;
}

