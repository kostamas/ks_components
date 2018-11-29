interface IUser {
  img: string;
  username: string;
}

interface IHeaderTab {
  name: string;
  icon: 'string';
  items: IMenu[];
}

interface IMenu {
  name: string;
  items: ISubMenu[];
}

interface ISubMenu {
  title: string;
  items: ISubMenuLink[];
}

interface ISubMenuLink {
  name: string;
  link: string;
}

