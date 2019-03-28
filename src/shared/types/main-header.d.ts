interface IUser {
  img: string;
  username: string;
}

interface IHeaderTab {
  id: number;
  name: string;
  icon: string;
  menus: IMenu[];
}

interface IMenu {
  id: number;
  name: string;
  menus: IPageGroupNames[];
}

interface IPageGroupNames {
  id: number;
  title: string;
  name: string;
  menus: IPage[];
}

interface IPage {
  id: number;
  isFavorite: boolean;
  formCode: string;
  name: string;
  link: string;
}

interface IMainHeaderConfig {
  calcSideBarClass?: (...args: any[]) => string;
  sideBarCustomClass?: string;
	isMainHeaderOpenHandler?: (openOverlay: boolean) => void;
}

interface IMainHeaderConfigConstructor {
  new(...args: any[]): IMainHeaderConfig;
}

