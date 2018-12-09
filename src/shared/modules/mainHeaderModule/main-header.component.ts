import {AfterViewInit, ChangeDetectorRef, Component, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {MenusService} from './menus.service';
import {OverlayService} from '../../../services/overlay.service';
import {filter, tap} from 'rxjs/operators';
import {UserDetails} from './user-details';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
  public mainHeaderViewTypes: any = {expanded: 'expanded', collapsed: 'collapsed', collapsedIcons: 'collapsedIcons'};
  public mainHeaderView: string = this.mainHeaderViewTypes.expanded;
  public displayUserMenu: boolean = false;
  public user: IUser;
  public headerTabs: IHeaderTab[];
  public selectedHeaderTabElement: any;
  public selectedHeaderTab: IHeaderTab;
  public isAuthenticated: boolean = false;
  public isMenuItemOpen: boolean = false;
  public viewPointBreakLevel1: number = 0;
  public viewPointBreakLevel2: number = 0;
  public lockHeaderResize: boolean = false;
  public userDetails: UserDetails = new UserDetails();

  private viewPointBreakOffset: number = 25;

  @ViewChild('currentDate') currentDate: any;
  @ViewChild('currentDateMobile') currentDateMobile: any;

  constructor(public auth: AuthService, public domSanitizer: DomSanitizer, private zone: NgZone, private datePipe: DatePipe,
              private menusService: MenusService, private overlayService: OverlayService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user);
    this.auth.isAuthenticated$.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.auth.isAuthenticated$
      .pipe(
        filter(isAuthenticated => !!isAuthenticated),
        tap((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated)
      )
      .subscribe(userDetails => this.auth.getUserDetails(ud => this.userDetails = ud));

    this.overlayService.overlayClick$.subscribe(this.closeMenuAndUserDetails);
    this.overlayService.overlayClick$.subscribe(() => {
      this.closeMenu();
      this.displayUserMenu = false;
    });
    this.menusService.getMenus(headerTabs => {
      this.headerTabs = headerTabs;
      this.mainHeaderView = this.mainHeaderViewTypes.expanded;
      setTimeout(this.calcViewPortBreak.bind(this));
    });
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
    this.isMenuItemOpen = this.selectedHeaderTabElement === null || this.selectedHeaderTabElement !== selectedHeaderTabElement;

    if (this.isMenuItemOpen) {
      this.overlayService.isOverlayOpen$.next(true);
      this.selectedHeaderTabElement = selectedHeaderTabElement;
      this.selectedHeaderTab = selectedHeaderTab;
      this.displayUserMenu = false;
    } else {
      this.closeMenu();
    }
  }

  closeMenu = () => {
    this.isMenuItemOpen = false;
    this.selectedHeaderTabElement = null;
    this.selectedHeaderTab = null;
  };

  getIcon(iconName: string): string {
    return `../../../../assets/icons/images/${iconName}`;
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
}
