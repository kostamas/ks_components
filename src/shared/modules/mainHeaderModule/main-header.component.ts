import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DatePipe} from '@angular/common';
import {MenusService} from './menus.service';
import {OverlayService} from '../../services/overlay.service';
import {filter, tap} from 'rxjs/operators';
import {UserDetails} from './user-details';
import {FavoritesService} from './favorites.service';
import {WrapperConnectorService} from '../../../services/wrapper-connector.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  public mainHeaderViewTypes: any = {expanded: 'expanded', collapsed: 'collapsed', collapsedIcons: 'collapsedIcons'};
  public mainHeaderView: string = this.mainHeaderViewTypes.expanded;
  public displayUserMenu: boolean = false;
  public headerTabs: IHeaderTab[];
  public favoritePages: IMenuLink[];
  public selectedHeaderTabElement: any;
  public selectedHeaderTab: IHeaderTab;
  public isAuthenticated: boolean = false;
  public isMenuItemOpen: boolean = false;
  public viewPointBreakLevel1: number = 0;
  public viewPointBreakLevel2: number = 0;
  public lockHeaderResize: boolean = false;
  public userDetails: UserDetails = new UserDetails();
  public unsubscribeArr: any[] = [];

  private viewPointBreakOffset: number = 25;

  @ViewChild('currentDate') currentDate: any;
  @ViewChild('currentDateMobile') currentDateMobile: any;

  constructor(public auth: AuthService, private zone: NgZone, private datePipe: DatePipe,
              private menusService: MenusService, private overlayService: OverlayService, private cdRef: ChangeDetectorRef,
              private favoritesService: FavoritesService, private wrapperConnectorService: WrapperConnectorService) {
  }

  ngOnInit(): void {
    const {auth, wrapperConnectorService, menusService, overlayService, unsubscribeArr} = this;

    unsubscribeArr.push((wrapperConnectorService.officeName$.subscribe(officeName => this.userDetails.officeNumber = officeName)));
    unsubscribeArr.push((wrapperConnectorService.divisionName$.subscribe(divisionName => this.userDetails.division = divisionName)));
    unsubscribeArr.push((wrapperConnectorService.server$.subscribe(server => this.userDetails.ip = server)));
    unsubscribeArr.push((menusService.closeMenu$.subscribe(this.closeMenu)));
    unsubscribeArr.push((menusService.pageClick$.subscribe(this.closeMenu)));
    unsubscribeArr.push((overlayService.overlayClick$.subscribe(this.overlayClickHandler)));
    unsubscribeArr.push((auth.isAuthenticated$.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)));
    unsubscribeArr.push(auth.isAuthenticated$
      .pipe(
        filter(isAuthenticated => !!isAuthenticated),
        tap((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated)
      )
      .subscribe(() => this.auth.getUserDetails(ud => this.userDetails = ud)));

    this.initMenus();
  }

  ngAfterViewInit(): void {
    this.resizeMainHeader();
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        if (this.currentDate) {
          this.currentDate.nativeElement.innerHTML = this.datePipe.transform(Date.now(), 'dd-LL-yyyy hh:mm:ss');
        }
        if (this.currentDateMobile) {
          this.currentDateMobile.nativeElement.innerHTML = this.datePipe.transform(Date.now(), 'dd-LL-yyyy hh:mm:ss');
        }
      }, 1000);
    });
    this.cdRef.detectChanges();
  }

  initMenus(): void {
    this.menusService.getMenus(headerTabs => {
      this.headerTabs = headerTabs;
      this.headerTabs = this.addSearchSimulatorLInk(this.headerTabs);
      this.mainHeaderView = this.mainHeaderViewTypes.expanded;
      this.favoritesService.favoritesList.subscribe(result => {
          if (result != null) {
            this.mapFavoritePages(result);
          }
          this.menusService.menuLoaded$.next(true);
        }
      );
      this.favoritesService.getFavorites();
      setTimeout(this.calcViewPortBreak.bind(this));
      this.buildPagePaths(headerTabs);
    });
  }

  overlayClickHandler = () => {
    this.closeMenu();
    this.displayUserMenu = false;
    setTimeout(() => {
      this.favoritesService.getFavorites();
    }, 500);
    this.closeMenuAndUserDetails();
  }

  buildPagePaths(headerTabs: IHeaderTab[]): void {
    const pagesPaths = {};
    headerTabs.forEach(level1 => {
      level1.menus.forEach(level2 => {
        level2.menus.forEach(level3 => {
          level3.menus.forEach(page => {
            pagesPaths[page.id] = {
              name: page.name,
              id: page.id,
              path: [
                {id: level1.id, name: level1.name},
                {id: level2.id, name: level2.name},
                {id: level3.id, name: level3.name},
              ]
            };
          });
        });
      });
    });
    this.menusService.pagesPaths$.next(pagesPaths);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (!this.lockHeaderResize) {
      this.lockHeaderResize = true;
      setTimeout(() => {
        this.resizeMainHeader();
        this.lockHeaderResize = false;
      }, 500);
    }
  }

  onHeaderTabClick(selectedHeaderTabElement: any, selectedHeaderTab: IHeaderTab): void {
    const isMenuItemClosed = this.selectedHeaderTabElement === null || this.selectedHeaderTabElement !== selectedHeaderTabElement;
    if (isMenuItemClosed) {
      this.favoritesService.getFavorites();
      this.overlayService.isOverlayOpen$.next(true);
      this.selectedHeaderTabElement = selectedHeaderTabElement;
      this.selectedHeaderTab = selectedHeaderTab;
      this.displayUserMenu = false;
    } else {
      this.closeMenu();
    }
    this.isMenuItemOpen = isMenuItemClosed;
  }

  closeMenu = () => {
    this.selectedHeaderTabElement = null;
    this.selectedHeaderTab = null;
    this.isMenuItemOpen = false;
  };

  getIcon(iconName: string): string {
    return `assets/icons/images/${iconName}`;
  }

  openUserMenu(): boolean {
    this.displayUserMenu = !this.displayUserMenu;
    if (this.displayUserMenu) {
      this.overlayService.isOverlayOpen$.next(true);
      this.closeMenu();
    }
    return this.displayUserMenu;
  }

  closeMenuAndUserDetails = () => {
    this.closeMenu();
    this.displayUserMenu = false;
    this.overlayService.isOverlayOpen$.next(false);
  };

  placeHolderClick = () => {
    this.overlayService.overlayClick$.next();
  };

  resizeMainHeader(): void {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewportWidth < this.viewPointBreakLevel2 + this.viewPointBreakOffset) {
      this.mainHeaderView = this.mainHeaderViewTypes.collapsedIcons;
      return;
    }

    if (viewportWidth < this.viewPointBreakLevel1 + this.viewPointBreakOffset) {
      this.mainHeaderView = this.mainHeaderViewTypes.collapsed;
      return;
    }
    this.calcViewPortBreak();
  }

  calcViewPortBreak(): void {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.viewPointBreakLevel1 = this.calcLeftRightSectionsDiff();
    if (viewportWidth < this.viewPointBreakLevel1 + this.viewPointBreakOffset) {
      this.mainHeaderView = this.mainHeaderViewTypes.collapsed;
      this.cdRef.detectChanges();        // render new view and test view point break level 2
      this.viewPointBreakLevel2 = this.calcLeftRightSectionsDiff();
      if (viewportWidth < this.viewPointBreakLevel2 + this.viewPointBreakOffset) {
        this.mainHeaderView = this.mainHeaderViewTypes.collapsedIcons;
        this.viewPointBreakLevel1 = null;
      }

    } else {
      this.mainHeaderView = this.mainHeaderViewTypes.expanded;
      this.viewPointBreakLevel1 = null;
    }
  }

  calcLeftRightSectionsDiff(): number {
    const leftSection = document.getElementsByClassName('main-header-left-section')[0].getBoundingClientRect();
    const rightSection = document.getElementsByClassName('main-header-right-section')[0].getBoundingClientRect();
    return rightSection.width + leftSection.left + leftSection.width;
  }

  public mapFavoritePages(favorites: IMenuLink[]): void {
    this.favoritePages = favorites;
    const favoriteIds: number[] = this.favoritePages.map(f => f.id);
    this.headerTabs.forEach(headers => {
      headers.menus.forEach(subHeaders => {
        subHeaders.menus.forEach(subItems => {
          subItems.menus.forEach(subMenus => {
            subMenus.isFavorite = favoriteIds.includes(subMenus.id);
          });
        });
      });
    });
  }

  addSearchSimulatorLInk = (tabs: any[]) => {
    const bookingTab = {name: 'Bookings', id: 1001843};
    tabs.forEach(level1 => {
      if (level1.id === bookingTab.id) {
        level1.menus.push({
          name: 'Availability ',
          menus: [{
            name: 'Search Simulator',
            menus: [{
              name: 'Search Simulator',
              id: this.menusService.searchSimulatorId
            }]
          }]
        });
      }
    });
    return tabs;
  }

  public getUserImage() {
    return this.getIcon('icono_no-registrado1.png');
  }

  logoutClick(): void {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.unsubscribeArr.forEach(subscription => subscription.unsubscribe());
  }
}
